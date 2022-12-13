FROM node:alpine 

RUN mkdir -p /app

WORKDIR /app

COPY ./ ./

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g nodemon &&\
    npm install 

EXPOSE 8082

CMD ["npm", "start"]