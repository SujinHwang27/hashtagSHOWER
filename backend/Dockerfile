FROM node:16
WORKDIR /home/shower/backend
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3306
CMD ["node", "app.js"]
