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

<% if (operations.list) { %>router
  .route('/<%= namePlural %>')
  .get((request, response) => {
    response
      .status(HttpStatus.OK)
      .send([
        <%= name %>,
        <%= name %>,
        <%= name %>
      ])
  })<% } %>

<% if (operations.read) { %>router
  .route('/<%= namePlural %>/:id')
  .get((request, response) => {
    response
      .status(HttpStatus.OK)
      .send(<%= name %>)
  })<% } %>

<% if (operations.create) { %>router
  .route('/<%= namePlural %>')
  .post((request, response) => {
    response
      .status(HttpStatus.CREATED)
      .send(<%= name %>)
  })<% } %>

<% if (operations.update) { %>router
  .route('/<%= namePlural %>/:id')
  .put((request, response) => {
    response
      .status(HttpStatus.OK)
      .send(<%= name %>)
  })<% } %>

<% if (operations.delete) { %>router
  .route('/<%= namePlural %>/:id')
  .delete((request, response) => {
    response
      .status(HttpStatus.NO_CONTENT)
      .send()
  })<% } %>

module.exports = router