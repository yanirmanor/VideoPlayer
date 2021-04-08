const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("add-to-list", (data) => {
    console.log("update", data);
    io.emit("sync-list", data);
  });
});

http.listen(3001, () => {
  console.log("server listening on 3001");
});
