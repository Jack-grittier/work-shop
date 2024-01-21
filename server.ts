// const express = require('express');
// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();

// let io;

// nextApp.prepare().then(() => {
//   const app = express();
//   const server = createServer(app);
  
//   io = new Server(server);

//   // ... other server setup ...

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });

// // Export the Socket.io instance for use in API routes
// module.exports.io = io;