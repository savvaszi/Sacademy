FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]
