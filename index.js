const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('<h1>Nueva ruta</h1>')
})

app.get('/products', (req, res) => {
  res.json({
    name: 'Producto 1',
    price: 1000
  })
})

app.listen(port, () => {
  console.log('Listening on http:localhost:' + port);
})
