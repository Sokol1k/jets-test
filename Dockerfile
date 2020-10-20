FROM node:latest

RUN mkdir -p /usr/src/jest-test
WORKDIR /usr/src/jest-test

COPY package*.json /usr/src/jest-test/
RUN npm install

COPY . /usr/src/jest-test