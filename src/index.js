const express = require('express')
const { faker } = require('@faker-js/faker')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('<h1>Nueva ruta</h1>')
})

app.get('/products', (req, res) => {
  const limit = req.query.size || 10
  const products = []
  for (let index = 0; index < limit; index++) {
    products.push({
      id: index,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.url()
    })
  }
  res.json(products)
})

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter')
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Producto 2',
    price: 1000
  })
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parametros')
  }
})

app.listen(port, () => {
  console.log('Listening on http:localhost:' + port);
})
