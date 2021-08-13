const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log(socket);
  socket.emit("room id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
