'use strict';

const
  fs = require('fs'),
  path = require('path')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(item => {
    if(item != 'index.js') {
      const route = `./${path.basename(item, '.js')}`
      app.use(require(route))
    }
  })
}