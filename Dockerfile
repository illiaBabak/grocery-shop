FROM node:24.11.1-alpine

WORKDIR /src

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN chmod +x ./entrypoint.sh

EXPOSE 3000

CMD ["sh", "./entrypoint.sh"]