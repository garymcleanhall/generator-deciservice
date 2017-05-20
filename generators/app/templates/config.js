
const env = process.env.NODE_ENV || 'local'

let config = require(`./config/config.${env}.json`)

module.exports = config