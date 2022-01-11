FROM node:gallium-slim AS development

WORKDIR /app

ENV NODE_ENV=development

COPY package.json yarn.lock ./

RUN yarn install


#FROM node:gallium-slim as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm install --only=production
#
#COPY . .
#
#COPY --from=development /usr/src/app/dist ./dist
#
#CMD ["node", "dist/main"]
