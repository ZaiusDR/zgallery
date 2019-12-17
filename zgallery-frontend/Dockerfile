FROM node:lts

ENV app_path /opt/zgallery-frontend

RUN mkdir -p ${app_path}

ADD . ${app_path}

EXPOSE 5000

WORKDIR ${app_path}

#RUN npm i

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
