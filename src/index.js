const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler')

// Create Server
const app = express()
const port = 3000

// Add middleware to allow express recieve data in JSON format
app.use(express.json())
const whitelist = [
  'http://localhost:8080',
  'https://myapp.com',
]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || origin) {
      callback(null, true)
    } else {
      callback(new Error('Access Denied'))
    }
  }
}
app.use(cors(options))

// Home page Doc
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

// Routes
routerApi(app);

// Middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

// Running Server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on http:localhost:' + port);
})
