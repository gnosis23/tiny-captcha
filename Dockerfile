FROM node:lts-alpine

COPY package*.json ./
  
WORKDIR '/var/www/app'

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

ENV JWT_SECRET_KEY 'DEFAULT_SECRET_KEY'

CMD ["npm", "start"]
