#!/bin/sh
echo "window.env = { API_URL: \"$API_URL\" };" > /usr/share/nginx/html/env.js
exec "$@"