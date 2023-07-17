const express = require('express')
const ProductService = require('../services/product.service')

const router = express.Router()
const productService = new ProductService()

router.get('/', (req, res) => {
  const products = productService.find();
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = productService.findOne(id)
  res.json(product)
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
