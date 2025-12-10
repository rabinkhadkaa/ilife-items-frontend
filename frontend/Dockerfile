# Step 1: Build React App
FROM node:22-alpine AS build
WORKDIR /app

# Pass VITE_API_URL as build-arg
ARG BUILD_MODE=prod
ARG CACHE_INVALIDATOR=1

ENV BUILD_MODE=$BUILD_MODE

RUN echo "BUILD_MODE = $BUILD_MODE"
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build --mode $BUILD_MODE

# Step 2: Serve using Nginx
# Step 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# 🔥 Add custom SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
