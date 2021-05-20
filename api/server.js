const express = require("express");

const lessonsRouter = require("../Routes/lessons-routes");
const messagesRouter = require("../Routes/messages-routes");

const server = express();

server.use(express.json());

server.use("/api/lessons", lessonsRouter);
server.use("/api/messages", messagesRouter);

server.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

module.exports = server;
