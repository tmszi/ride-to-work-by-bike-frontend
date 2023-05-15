#!/bin/sh

quasar build && cp -R dist/spa/* /var/www/html && chown nginx:nginx /var/www/html
# Start nginx and keep the process from backgrounding and the container from quitting
nginx -g "daemon off;"
