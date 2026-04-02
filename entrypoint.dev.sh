#!/bin/sh
set -e

echo "🚀 Running migrations..."
pnpm prisma migrate dev

echo "⚙️ Generating Prisma client..."
pnpm prisma generate

echo "🔥 Starting dev server..."
pnpm dev
