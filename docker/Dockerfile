FROM alpine:3.18

LABEL authors="Auto*Mat, z. s. auto-mat@auto-mat.cz"
LABEL maintainer="Auto*Mat, z. s. auto-mat@auto-mat.cz"

RUN apk add --update --no-cache nginx nodejs yarn

# Create the directories we will need
RUN mkdir -p /tmp/nginx/quasar-spa-app /var/log/nginx /var/www/html

COPY ./docker/nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx_config/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /tmp/nginx/quasar-spa-app

# Copy our source code into the container
COPY . .

# Install Quasar framework and build app
RUN yarn global add @quasar/cli; yarn; cp ./docker/run.sh /usr/local/bin/; \
    chmod +x /usr/local/bin/run.sh;

ENTRYPOINT ["run.sh"]
