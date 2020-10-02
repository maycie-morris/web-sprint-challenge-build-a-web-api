const express = require('express')
const server = express()
const projectRouter = require('../projects/projects-router')
const actionRouter = require('../projects/actions-router')

server.use(logger)
server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Hello from the sprint!</h1>`)
})

function logger(req, _, next) {
    console.log(
      "Method: ", req.method + "\n",
      "URL: ", req.url + "\n", 
      "Time: ", new Date(Date.now()) + "\n",
      "Body:", req.body,
    )
    next();
  }


module.exports = server