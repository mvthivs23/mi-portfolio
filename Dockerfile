# Etapa de construcción
FROM node:14 as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Etapa de producción
FROM nginx:latest as production-stage
COPY --from=build-stage /app/mi-portfolio /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
