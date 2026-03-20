# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm install

# ---------- Stage 2: Development (for nx serve) ----------
FROM node:20-alpine AS builder
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
# Source code is ready, nx serve will compile on demand

# ---------- Stage 3: Production ----------
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=builder /workspace/dist/apps/auth-service ./dist
CMD ["node", "dist/main.js"]
