FROM node:carbon

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_ENV production

ADD dist /home/node/app/dist
ADD package.json /home/node/app/package.json
ENV JWT_SECRET ashdfjhasdlkjfhalksdjhflak

RUN chown -R node:node /home/node/app 

USER node
WORKDIR /home/node/app
RUN npm install --save

EXPOSE 3000

#CMD node dist/server.js
CMD npm run watch
