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
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

function verifyJWT(req, res, next) {
  next();
}

// proxies

const clientesServiceProxy = httpProxy('http://localhost:5002')
const clientesPostServiceProxy = httpProxy('http://localhost:5002')

const gerentesGetServiceProxy = httpProxy('http://localhost:5003')
const gerentesPostServiceProxy = httpProxy('http://localhost:5003')
const gerentesPutServiceProxy = httpProxy('http://localhost:5003')

const contasServiceProxy = httpProxy('http://localhost:5004');
const contasPostServiceProxy = httpProxy('http://localhost:5004');

// routes

// clientes
app.get('/clientes', function (req, res, next) {
  clientesServiceProxy(req, res, next)
})

app.post('/clientes', function (req, res, next) {
  clientesPostServiceProxy(req, res, next)
})

// gerentes

app.post('/gerentes', verifyJWT, (req, res, next) => {
  gerentesPostServiceProxy(req, res, next);
});

app.put('/gerentes/:id', verifyJWT, (req, res, next) => {
  gerentesPutServiceProxy(req, res, next);
});

app.get('/gerentes/:id', verifyJWT, (req, res, next) => {
  gerentesGetServiceProxy(req, res, next);
});

app.get('/gerentes', verifyJWT, (req, res, next) => {
  gerentesGetServiceProxy(req, res, next);
});

app.get('/gerentes/email/:email', verifyJWT, (req, res, next) => {
  gerentesGetServiceProxy(req, res, next);
});

app.delete('/gerentes/:id', verifyJWT, (req, res, next) => {
  gerentesGetServiceProxy(req, res, next);
});

// contas

app.post('/contas', verifyJWT, function (req, res, next) {
  contasPostServiceProxy(req, res, next);
});

// TEMP: fake get contas
app.get('/contas', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.get('/contas/gerente/:id', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.get('/contas/gerente/:id/top', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.get('/contas/gerente/:id/cliente/:cpf', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.post('/contas/:numero/aprovada', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.post('/contas/:numero/reprovada', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.get('/contas/cliente/:id', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.post('/contas/:numero/deposito', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.post('/contas/:numero/saque', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.post('/contas/:numero/transferencia', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

app.get('/contas/:numero/extrato', verifyJWT, function (req, res, next) {
  contasServiceProxy(req, res, next);
});

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
