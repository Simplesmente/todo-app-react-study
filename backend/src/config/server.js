
const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

// Middlewares
server.use( bodyParser.urlencoded({ extended: true }) )
server.use(allowCors)
server.use(bodyParser.json())


server.listen(port, function(){
    console.log(`BACKED is running on port ${port}.`)
})

module.exports = server