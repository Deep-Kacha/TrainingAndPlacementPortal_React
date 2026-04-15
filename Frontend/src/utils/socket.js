import { io } from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:5000", {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected to Backend (Real-Time Active)");
});

socket.on("disconnect", () => {
  console.log("🔴 Socket Disconnected from Backend");
});

export default socket;
