#!/bin/sh
set -e

echo "Ensuring Todo table exists (safe for shared Neon DB — does not drop other tables)..."
npx prisma db execute --file prisma/create-todo-table.sql --schema prisma/schema.prisma

echo "Starting API on port ${PORT:-4000}..."
exec node src/index.js
