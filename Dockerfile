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

# Define ENVs to setup at image build time
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

EXPOSE 8000

# change default user
USER node

# Run app
CMD [ "npm", "start" ]