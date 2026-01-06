# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json tsconfig.json ./

# Copy all workspace package.json files
COPY packages/prisma/package.json ./packages/prisma/
COPY packages/types/package.json ./packages/types/
COPY apps/web/package.json ./apps/web/

# Install all dependencies
RUN npm ci || npm install

# Copy all source code
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/

# Generate Prisma client
WORKDIR /app/packages/prisma
RUN npx prisma generate

# Build the web app
WORKDIR /app/apps/web
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy standalone build if it exists, otherwise copy full build
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

WORKDIR /app/apps/web

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
