console.log("HELLO");
const server = require("./api/server");

const PORT = process.env.PORT || 5000;

// ==================================================

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
