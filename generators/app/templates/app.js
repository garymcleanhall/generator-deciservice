'use strict';

const
  config = require('./config'),
  express = require('express')

const api = express()

api.use(require('./routes/root'))
<% if (includeHealthcheck) { %>
api.use(require('./routes/healthcheck'))
<% } %>

let server = null

function start() {
  return new Promise((resolve, reject) => {
    server = api.listen(config.service.port, () => {
      console.log(`Templates listening on ${config.service.port}`)
      resolve()
    })

    server.on('error', error => {
      reject(error)
    })
  })
}

function stop() {
  server.close()
}

module.exports = {
  start,
  stop
}