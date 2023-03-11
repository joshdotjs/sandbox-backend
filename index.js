console.log("HELLO");
require("dotenv").config();
require("colors");
const server = require("./api/server");

// ==================================================

server.get("/status", (req, res) => {
  res.send("[GET] /status");
});

// ==================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `*** server is running on: http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`
      .america
  );
});
