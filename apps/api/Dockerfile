# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json tsconfig.json ./

# Copy all workspace package.json files
COPY packages/prisma/package.json ./packages/prisma/
COPY packages/types/package.json ./packages/types/
COPY apps/api/package.json ./apps/api/

# Install all dependencies (including dev dependencies for build)
RUN npm ci || npm install

# Copy all source code
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Generate Prisma client
WORKDIR /app/packages/prisma
RUN npx prisma generate

# Build the API
WORKDIR /app/apps/api
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json ./

# Copy workspace package.json files
COPY packages/prisma/package.json ./packages/prisma/
COPY packages/types/package.json ./packages/types/
COPY apps/api/package.json ./apps/api/

# Install production dependencies
RUN npm ci --omit=dev || npm install --production

# Copy built application and packages
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/prisma ./packages/prisma
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/types/package.json ./packages/types/

# Generate Prisma client in production
WORKDIR /app/packages/prisma
RUN npx prisma generate

# Set working directory to API
WORKDIR /app/apps/api

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/main.js"]
