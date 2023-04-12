const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'unsafe-url');
    next();
  });
// const corsOptions = {
//     origin: 'http://127.0.0.1:5500'
//   };

// app.use(cors(corsOptions));
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server);



io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
