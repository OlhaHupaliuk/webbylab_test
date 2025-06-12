FROM node:20 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

# Copy env injection script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
