const http = require("http");
const express = require("express");

var app = express();

app.use(express.static('web'))

var server = http.createServer(app);
server.listen(8123);
