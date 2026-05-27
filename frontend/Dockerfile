FROM node:22-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json* ./
# Install all deps (including devDependencies) — required for next build / tailwind
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ARG WEB_PORT
ARG WEB_HOSTNAME
ARG NODE_ENV

ENV PORT=$WEB_PORT
ENV HOSTNAME=$WEB_HOSTNAME
ENV NODE_ENV=$NODE_ENV

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE $WEB_PORT

CMD ["node", "server.js"]
