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
  const newProduct = productService.create(body)
  res.status(201).json({
    message: 'created',
    data: newProduct
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  res.status(200).json({
    message: 'updated',
    data: body,
    id,
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  const product = productService.update(id, body)
  res.status(200).json({
    message: 'updated',
    data: product,
    id,
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const product = productService.delete(id)
  res.json({
    message: 'deleted',
    body: product,
    id,
  })
})

module.exports = router
