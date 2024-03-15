FROM node:20-alpine
WORKDIR /opt/app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build gateway
CMD ["node", "./dist/apps/gateway/main.js"]