FROM node:12.18.1
ENV NODE_ENV=dev

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --dev

COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]