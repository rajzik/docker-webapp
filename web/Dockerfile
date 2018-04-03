FROM node:8

RUN mkdir /usr/src/webapp


ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /usr/src/webapp
ADD . /usr/src/webapp

# EXPOSE 3000
# EXPOSE 35729

# ENTRYPOINT ["/bin/bash", "run.sh"]
# CMD ["start"]