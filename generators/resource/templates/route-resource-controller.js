'use strict';

const
  HttpStatus = require('http-status'),
  express = require('express')

const router = express.Router()

router
  .route('/<%= name %>')
  .post((request, response) => {
    response
      .status(HttpStatus.ACCEPTED)
      .send({})
  })

module.exports = router