const express = require("express");

const accountsRouter = require("../accountsRouter")

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({message: "the server is running"})
})

server.use("/api/accounts", accountsRouter)
module.exports = server;
