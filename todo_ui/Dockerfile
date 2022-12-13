FROM node:alpine 

RUN mkdir -p /app

WORKDIR /app

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]