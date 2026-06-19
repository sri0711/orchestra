# Stage 1: build the React app
FROM node:20.19.0-slim AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN apt-get update && apt-get upgrade -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:1.26.4-alpine

# Ensure the Alpine packages are up to date
RUN apk update && apk upgrade --no-cache

COPY --from=builder /app/build /usr/share/nginx/html

# Remove the default nginx.conf and replace it with a simple config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
