FROM mhart/alpine-node

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

ARG SERVER_PORT
ARG CLIENT_PORT
EXPOSE ${CLIENT_PORT}

CMD [ "npm", "start" ]
