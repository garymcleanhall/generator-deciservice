
const env = process.env.NODE_ENV || 'local'

let config = require('./config/')(env)

module.exports = config