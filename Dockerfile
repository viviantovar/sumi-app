FROM nginx:alpine
COPY index.html manifest.json sw.js icono.png /usr/share/nginx/html/
