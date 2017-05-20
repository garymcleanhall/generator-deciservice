
const
  express = require('express')

const rootRoute = express.Router()

rootRoute
  .route('/')
  .get((request, response) => {
    response
      .status(200)
      .send({ })
  })

module.exports = rootRoute