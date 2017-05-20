
const 
  express = require('express'),
  config = require('../config')

const physical = {
  middleware: require('physical-express-middleware'),<% if (resources) { %>
  mongodb: require('physical-mongodb') <% } %>
}

const healthcheckRoute = express.Router()

healthcheckRoute
  .route('/healthcheck')
  .get(physical.middleware({
    dependencies: [
      <% for (var resource in resources) { %>
      { name: '<% resource.name %>Data', checker: () => (physical.mongodb.check(config.data.<% resource.name %>.uri)) }
      <% } %>
    ]
  }))

module.exports = healthcheckRoute