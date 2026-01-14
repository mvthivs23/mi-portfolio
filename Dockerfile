# Etapa de construcción
FROM node:14 as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Etapa de producción
FROM nginx:1.29.4-trixie as production-stage
COPY --from=build-stage /app/dist/venta_app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
