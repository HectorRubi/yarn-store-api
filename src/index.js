const express = require('express')
const routerApi = require('./routes')

const app = express()
const port = 3000

// Add middleware to allow express recieve data in JSON format
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

routerApi(app);

app.listen(port, () => {
  console.log('Listening on http:localhost:' + port);
})
