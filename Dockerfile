# syntax=docker/dockerfile:1

############################
# Stage 1: deps
############################
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Instala dependências exatamente como no lockfile
RUN npm ci --include=dev

############################
# Stage 2: build
############################
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Compila o projeto (gera dist/)
RUN npm run build

############################
# Stage 3: runner (produção)
############################
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# **Importante**: o ECS task definition está mapeando a porta 8080
ENV PORT=8080

# Só dependências de produção para imagem final
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copia os artefatos compilados
COPY --from=build /app/dist ./dist

# Se tiver arquivos estáticos/config, copie aqui:
# COPY --from=build /app/public ./public
# COPY ./.env.production ./.env.production

EXPOSE 8080

# Sobe o app (Nest/Node)
CMD ["node", "dist/main.js"]
