const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router()

router.get('/', (req, res) => {
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

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  if (id === '999') {
    res.status(404).json({
      message: 'not found',
    })
  }
  res.status(201).json({
    id,
    name: 'Producto 2',
    price: 1000
  })
})

router.post('/', (req, res) => {
  const body = req.body

  res.json({
    message: 'created',
    data: body
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  res.json({
    message: 'updated',
    data: body,
    id,
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  res.json({
    message: 'updated',
    data: body,
    id,
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    message: 'deleted',
    id,
  })
})

module.exports = router
