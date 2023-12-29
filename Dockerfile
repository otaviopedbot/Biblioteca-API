FROM node:18.17.1

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]