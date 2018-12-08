# ZGallery

This is the ZaiusDr Photo Gallery project. It's just a POC to practice a little
bit with TDD, Node.js and a bit of Front-End development with Javascript. :D

BTW it will act as showcase for my pictures!

## Hacking

### Build docker image

`docker build -t zgallery .`

### Install Node Modules

If you don't want to install node package manager locally:

`docker run --rm -v "$PWD":/src zgallery npm install`

### Run container

`docker run --rm --name zgallery -d -v "$PWD":/src -p 3000:3000 -p 9229:9229 zgallery`

* Connect to ZGallery app from http://localhost:3000
* Inspector port 9229

## Testing

First connect to the container with:

`docker exec -it zgallery bash`

And run:

`npm test`
