# Step 1: Build React App
FROM node:22-alpine AS build
WORKDIR /app

# Pass VITE_API_URL as build-arg
ARG CACHE_INVALIDATOR=1
ARG BUILD_MODE=prod
ARG VITE_API_URL
ENV BUILD_MODE=$BUILD_MODE
ENV VITE_API_URL=$VITE_API_URL

RUN echo "Building in mode: $BUILD_MODE with VITE_API_URL: $VITE_API_URL"
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build:${BUILD_MODE}   # VITE_API_URL will now be used in the build

# Step 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
