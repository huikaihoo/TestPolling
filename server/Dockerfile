FROM mhart/alpine-node

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

ARG SERVER_PORT
EXPOSE ${SERVER_PORT}

CMD [ "npm", "start" ]
