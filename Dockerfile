FROM node:20 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

# Копіюємо білд з попереднього етапу
COPY --from=build /app/dist /usr/share/nginx/html

# Копіюємо nginx конфіг
COPY nginx.conf /etc/nginx/nginx.conf

# Копіюємо entrypoint скрипт та робимо його виконуваним
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Встановлюємо entrypoint
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]