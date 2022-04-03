FROM node:14

RUN npm i -g @nestjs/cli

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["nest", "start"]