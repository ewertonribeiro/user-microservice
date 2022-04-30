FROM node:16
ENV PORT=5000
COPY . /app
WORKDIR /app/dist
RUN npm install
RUN npm run build  
EXPOSE ${PORT}
CMD [ "node","src/server.js" ]