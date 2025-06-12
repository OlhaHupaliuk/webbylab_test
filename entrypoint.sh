#!/bin/sh
if [ -z "$API_URL" ]; then
  echo "Error: API_URL is not set"
  exit 1
fi

echo "window.env = { API_URL: \"${API_URL}\" };" > /usr/share/nginx/html/env.js
cat /usr/share/nginx/html/env.js
exec nginx -g "daemon off;"
