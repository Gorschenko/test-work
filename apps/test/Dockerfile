FROM node:20-alpine
WORKDIR /opt/app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build test
CMD ["node", "./dist/apps/test/main.js"]