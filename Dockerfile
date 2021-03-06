FROM node:10-alpine

WORKDIR /openhab-google-assistant

COPY package*.json ./
COPY functions/package*.json functions/

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start", "--" ]
