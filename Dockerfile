FROM node:alpine
ENV PORT=5000

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE ${PORT}

CMD [ "npm","run","dev" ]