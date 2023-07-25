# use latest version of nodejs
FROM node:lts-alpine as build-stage

# install aurelia-cli to build the app & http-server to serve static contents
RUN npm i -g http-server
RUN npm i -g aurelia-cli

# set working directory to app
# henceforth all commands will run inside this folder
WORKDIR /app

# copy package.json related files first and install all required dependencies
COPY package*.json ./
RUN npm install

# copy the rest of files and folders & install dependencies
COPY . ./
RUN npm run build

EXPOSE 8080

# use http-server to serve contents
# CMD ["http-server", "dist", "-c-1"]

CMD ["au", "run", "--watch","--host", "0.0.0.0", "--port", "8080"]
