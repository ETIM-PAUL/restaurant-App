
FROM node:14

WORKDIR /

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
