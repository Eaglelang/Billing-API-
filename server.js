//endpoints for requiring express, cors queryParser and bodyParser
const port = 5000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server;

route.js
const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // rotas da API
  const billingCycleService = require('../api/billingCycle/billingCycleService')
  billingCycleService.register(router, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)
}


//defining billing. 
const _ = require('lodash')
const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

BillingCycle.route('count', function(req, res, next) {
  BillingCycle.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = BillingCycle