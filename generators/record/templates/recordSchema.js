'use strict'

const 
  mongoose = require('mongoose')

const <%= name %>Schema = mongoose.Schema({
  name: String,
  timestamp: { type: Date, default: Date.now }
})

module.exports = (connection) => {
  let <%= nameCapitalized %> = connection.model('<%= nameCapitalized %>', <%= name %>Schema)
  return <%= nameCapitalized %>
}