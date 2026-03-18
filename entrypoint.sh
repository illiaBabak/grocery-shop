#!/bin/sh

echo "⏳ Waiting for database..."

# wait for postgres to start
sleep 5

echo "🚀 Running migrations..."
pnpm prisma migrate deploy

echo "⚙️ Generating Prisma client..."
pnpm prisma generate

echo "🔥 Starting Next.js..."
pnpm dev