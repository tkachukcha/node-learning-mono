const http = require("http");
const chalk = require("chalk");

const port = 3000;

const server = http.createServer((req, res) => {
  console.log("req method", req?.method);
  console.log("req url", req?.url);
  res.end('Op');
});

server.listen(port, () => {
  console.log(chalk.green(`Server started listening on port ${port}`));
});
