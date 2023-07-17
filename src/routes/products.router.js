const express = require('express')
const ProductService = require('../services/product.service')

const router = express.Router()
const productService = new ProductService()

router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productService.findOne(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const newProduct = await productService.create(body)
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

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body

    const product = await productService.update(id, body)
    res.status(200).json({
      message: 'updated',
      data: product,
      id,
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const product = await productService.delete(id)
  res.json({
    message: 'deleted',
    body: product,
    id,
  })
})

module.exports = router
