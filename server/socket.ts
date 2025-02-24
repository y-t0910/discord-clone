import { Server } from "socket.io";
import http from "http";

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", (messageData) => {
      // 全クライアントに送信
      io.emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
