FROM node:16
WORKDIR /home/shower/frontend
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "ShowerMonitoring.js"]
