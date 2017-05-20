'use strict';

const
  HttpStatus = require('http-status'),
  express = require('express')

const router = express.Router()

const <%= name %> = {
  id: 1234,
  foo: 'bar',
  baz: 'quux'
}

<% if (operations.read) { %>router
  .route('/<%= name %>')
  .get((request, response) => {
    response
      .status(HttpStatus.OK)
      .send(<%= name %>)
  })<% } %>

<% if (operations.update) { %>router
  .route('/<%= name %>')
  .put((request, response) => {
    response
      .status(HttpStatus.OK)
      .send(<%= name %>)
  })<% } %>

<% if (operations.delete) { %>router
  .route('/<%= name %>')
  .delete((request, response) => {
    response
      .status(HttpStatus.NO_CONTENT)
      .send()
  })<% } %>

module.exports = router