#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push

echo "Starting API on port ${PORT:-4000}..."
exec node src/index.js
