# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG NAME
ENV VITE_NAME=$NAME
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ../ssl/certificate.crt /etc/nginx/ssl/certificate.crt
COPY ../ssl/private.key /etc/nginx/ssl/private.key
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
