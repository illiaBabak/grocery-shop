#!/bin/sh
set -e

echo "🚀 Running migrations..."
pnpm prisma migrate deploy

echo "🔥 Starting server..."
npx next start -H 0.0.0.0
