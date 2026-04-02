FROM node:24.11.1-alpine

WORKDIR /src

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN chmod +x ./entrypoint.dev.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.dev.sh"]