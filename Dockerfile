FROM node:boron
LABEL maintainer="Cristtopher Quintana T. <cquintana@axxezo.com>"
LABEL system="PresenceControl"
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .
EXPOSE 8000

# change default user
USER node

# Run app
CMD [ "npm", "start" ]