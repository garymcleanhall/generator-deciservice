'use strict'

'use strict';

const
  config = require('../config'),
  mongoose = require('mongoose'),
  <%= name %>Schema = require('./<%= name %>Schema'),
  retry = require('retry')

mongoose.Promise = global.Promise

let _connected = false
let <%= nameCapitalized %> = null

function _connect() {
  if(_connected) {
    return Promise.resolve()
  } else {
    let mongoUri = config.data.<%= name %>.uri.replace('%%MONGO_PASSWORD%%', process.env.MONGO_PASSWORD)
    return new Promise((resolve, reject) => {
        let connection = mongoose
          .createConnection(mongoUri, config.data.<%= name %>.opts)
        
        connection.on('connected', () => {
          resolve(connection)
        })
        connection.on('error', reject)

      })
      .then((connection) => {
        <%= nameCapitalized %> = report(connection)
        _connected = true
        console.info('Connected to db', config.data.<%= name %>.uri)
      })
      .catch(error => {
        console.error('Could not connect to db', error)
        throw error
      })
  }
}

function _save<%= nameCapitalized %>Data(data) {
  return _connect()
    .then(() => {
      let <%= name %> = new <%= nameCapitalized %>(data)
      return <%= name %>.save()
    })
    .then(document => {
      console.info('Saved <%= name %>', { id: document._id, version: document.__v })
      return document.toObject()
    })
    .catch(error => {
      console.error('Could not save <%= name %>', error)
      throw error
    })
}

function _update<%= nameCapitalized %>Data(data) {
  return _connect()
    .then(() => {
      return <%= nameCapitalized %>.findByIdAndUpdate(data._id, data)
    })
    .catch(error => {
      console.error('Could not update <%= name %>', error)
      throw error
    })
}

function _getAll<%= nameCapitalized %>s() {
  return _connect()
    .then(() => {
      return <%= nameCapitalized %>
        .find({})
        .exec()
    })
    .then(documents => {
      console.info('Found <%= name %>s', { count: documents.length })
      return documents
    })
    .then(documents => {
      return documents.map(document => { return document.toObject() })
    })
    .catch(error => {
      console.error('Could not find <%= nameCapitalized %>s', error)
      throw error
    })
}

function _get<%= nameCapitalized %>ById(<%= name %>Id) {
  return _connect()
    .then(() => {
      return <%= nameCapitalized %>
        .findOne({ _id: <%= name %>Id })
        .exec()
    })
    .then(document => {
      return document.toObject()
    })
    .catch(error => {
      console.error('Could not find <%= name %>', error)
      throw error
    })
}

function _delete<%= nameCapitalized %>(<%= name %>Id) {
  return _connect()
    .then(() => {
      return <%= nameCapitalized %>
        .delete({ _id: <%= name %>Id })
        .exec()
    })
    catch(error => {
      console.error('Could not delete <%= name %>', error)
      throw error
    })
}

module.exports = {
  delete<%= nameCapitalized %>: _delete<%= nameCapitalized %>
  save<%= nameCapitalized %>Data: _save<%= nameCapitalized %>Data,
  update<%= nameCapitalized %>Data: _update<%= nameCapitalized %>Data,
  getAll<%= nameCapitalized %>s: _getAll<%= nameCapitalized %>s,
  get<%= nameCapitalized %>ById: _get<%= nameCapitalized %>ById
}