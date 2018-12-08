FROM node:lts

ENV src_dir /src

RUN /usr/local/bin/npm install -g nodemon

WORKDIR ${src_dir}

VOLUME ${src_dir}

EXPOSE 3000 9229

CMD ["/usr/local/bin/nodemon", "--inspect=0.0.0.0:9229", "bin/www"]
