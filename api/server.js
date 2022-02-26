const express = require("express")

const carsRoute = require("./cars/cars-router")

const server = express()

server.use(express.json());

server.use("/api/cars", carsRoute)

server.get("/", (req, res) => {
    res.status(200).json({api: 'up'})
})


module.exports = server
