FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "accuknox.js"]
