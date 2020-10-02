const express = require('express')
const server = express()
const router = require('../projects/projects-router')

server.use(express.json())
server.use('/api/projects', router)

module.exports = server