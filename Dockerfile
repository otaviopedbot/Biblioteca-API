FROM node:18.17.1

WORKDIR /usr/app

COPY package*.json ./

COPY . .

EXPOSE 3000

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./start.sh"]