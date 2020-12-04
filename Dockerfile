FROM node:12

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

COPY . .
RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]
