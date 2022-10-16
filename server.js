const app = require('./src/app');
const http = require('http');
const chalk = require('chalk');
const connect = require('./db');

const server = http.createServer(app);
const SERVER_PORT = 8081;

server.listen(SERVER_PORT, () => {
    console.info(chalk.bgWhite.black.bold(`Connecting to Server on port ${SERVER_PORT}`));
    console.info(chalk.bgWhite.black.bold(`API templted by Jitul Teron`));
    connect();
});
