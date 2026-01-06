#!/bin/sh
set -e

echo "🔄 Running database migrations..."
cd /app/packages/prisma
npx prisma migrate deploy

echo "🌱 Seeding database with initial data..."
npm run seed || echo "⚠️  Seeding skipped (may already exist)"

echo "✅ Database initialization complete!"
