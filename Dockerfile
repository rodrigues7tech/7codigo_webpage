FROM nginx:alpine

# Remove config padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia seu site
COPY . /usr/share/nginx/html

# Expõe porta
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]