FROM node:22-alpine

WORKDIR /app

ARG API_PORT

ENV PORT=$API_PORT

RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY src ./src/
COPY docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

EXPOSE $API_PORT

ENTRYPOINT ["./docker-entrypoint.sh"]
