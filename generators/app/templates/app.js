'use strict';

const
  config = require('./config'),
  express = require('express')

const api = express()

require('./routes')(api)

let server = null

function start() {
  return new Promise((resolve, reject) => {
    server = api.listen(config.service.port, () => {
      console.log(`<%= appName %> listening on ${config.service.port}`)
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

/// Note: A subgenerator will append more routes to this file