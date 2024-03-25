require('dotenv-safe').config()
const jwt = require('jsonwebtoken')
var http = require('http')
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
const helmet = require('helmet')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const clientesServiceProxy = httpProxy('http://localhost:5000')

// routes
app.get('/clientes', function (req, res, next) {
  clientesServiceProxy(req, res, next)
})

// config
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// server
var server = http.createServer(app)
server.listen(3000)
console.log(`Server listening on port 3000!`)
