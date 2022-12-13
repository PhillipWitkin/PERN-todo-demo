FROM node:alpine 

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g nodemon &&\
    npm install &&\
    npm install --save-dev sequelize-cli  

EXPOSE 8082

CMD ["npm", "start"]