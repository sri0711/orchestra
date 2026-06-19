# Stage 1: build the React app
FROM node:lts AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:1.26.4

COPY --from=builder /app/build /usr/share/nginx/html

# Remove the default nginx.conf and replace it with a simple config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
