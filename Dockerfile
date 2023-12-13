FROM node

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null"]