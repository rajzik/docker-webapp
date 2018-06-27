################
## Vision web ##
################

FROM node:10

WORKDIR /usr/src/app

# Use yarn instead
RUN npm install -g yarn

COPY package*.json ./

# Installing dependecies
RUN yarn

# Copy code
# Except files from .dockerignore
COPY . .

EXPOSE 3000

ENTRYPOINT [ "yarn" ]

