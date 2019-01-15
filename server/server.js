'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.SERVER_PORT;

io.of('/timer').on('connection', (socket) => {

  socket.on('subscribe_timer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on('new_message', (name, body) => {
    const message = `${name}: ${body}`
    console.log('new message received ', message);
    //socket.broadcast.emit('broadcast_message', message);
    io.of('/timer').emit('broadcast_message', message);
  });
});

io.listen(PORT);
console.log('listening on port ', PORT);
