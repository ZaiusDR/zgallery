FROM node:lts

ENV app_path /opt/zgallery-backend

RUN mkdir -p ${app_path}

ADD . ${app_path}

EXPOSE 3000

WORKDIR ${app_path}

RUN npm i

CMD ["/usr/local/bin/npm", "start"]
