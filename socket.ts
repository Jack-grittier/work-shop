// const { Server } = require('http');
// const { Server: IOServer } = require('socket.io');

// const httpServer = new Server();
// const io = new IOServer(httpServer, {
//   // You may need to set CORS options here if your Next.js app
//   // is served from a different port or domain
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
  // console.log('a user connected');

  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });

  // Additional Socket.io logic here
// });

// const PORT = process.env.SOCKET_PORT || 3001;
// httpServer.listen(PORT, () => console.log(`Socket.io server running on port ${PORT}`));