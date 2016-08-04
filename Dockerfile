FROM node:5.12-slim

MAINTAINER "renyantech@renyanmail.com"

RUN mkdir /home/renyan
ENV HOME=/home/renyan
USER root
COPY . $HOME/map
WORKDIR $HOME/map
RUN ["/bin/bash", "-c", "npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc --silent install"]
ENTRYPOINT ["node", "./bin/www"]
