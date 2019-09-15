const hostname = "192.168.1.7";
const port = 3000;

const server = require("./controller.js");

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`);
});
