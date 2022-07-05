FROM node:latest as development

WORKDIR /rocketgo

COPY package*.json .

COPY prisma ./prisma/

RUN npm install

COPY . ./

RUN npm run build

FROM node:latest as production

WORKDIR /rocketgo

COPY package*.json .

COPY prisma ./prisma/

RUN npm install --omit=dev

COPY --from=development /rocketgo/dist ./dist

CMD [ "node", "./dist/app.js" ]