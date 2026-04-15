let io;

module.exports = {
  init: (httpServer) => {
    const { Server } = require("socket.io");
    io = new Server(httpServer, {
      cors: {
        origin: "*", // Adjust for production security if needed
        methods: ["GET", "POST", "PUT", "DELETE"]
      }
    });

    io.on("connection", (socket) => {
      console.log(`📡 New Client Connected: ${socket.id}`);
      socket.on("disconnect", () => {
        console.log(`🔌 Client Disconnected: ${socket.id}`);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
  // Convenience method for broadcasting invalidation events
  broadcast: (event, data = {}) => {
    if (io) {
      console.log(`🚀 Broadcasting Event: ${event}`);
      io.emit(event, data);
    }
  }
};
