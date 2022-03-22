const http = require("http");
const chalk = require("chalk");

const port = 3000;

const server = http.createServer((req, res) => {
  console.log("server");
  res.end("hello from server");
});

server.listen(port, () => {
  console.log(chalk.green(`Server started listening on port ${port}`));
});
