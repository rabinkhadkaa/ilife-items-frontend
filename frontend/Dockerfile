# Step 1: Build React App
FROM node:22-alpine AS build
WORKDIR /app
ARG BUILD_MODE=dev
ENV BUILD_MODE=${BUILD_MODE}

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:${BUILD_MODE}

# Step 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
