const http = require("http");
const port = process.env.PORT || 5000;
host = "0.0.0.0";
const express = require("express");
const app = require("./app");
const server = http.createServer(app);
server.listen(port, host, function () {
    console.log("Server Started");
})