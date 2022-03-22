const http = require("http");
const chalk = require("chalk");

const port = 3000;

const server = http.createServer((req, res) => {

});

server.listen(port, () => {
  console.log(chalk.green(`Server started listening on port ${port}`));
})
