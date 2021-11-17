const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const usersAuthRouter = require('./users/auth-router')
const eventRouter = require('./events/events-router')
const guestRouter = require('./guests/guests-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', usersAuthRouter)
server.use('/api/events', eventRouter)
server.use('/api/guests', guestRouter)

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = server
