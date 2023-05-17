FROM alpine:3.18

LABEL authors="Auto*Mat, z. s. auto-mat@auto-mat.cz"
LABEL maintainer="Auto*Mat, z. s. auto-mat@auto-mat.cz"

ENV APP_PATH=/ride-to-work-by-bike
RUN apk add --update --no-cache nodejs yarn
# Create the directories we will need
RUN mkdir $APP_PATH
WORKDIR $APP_PATH
