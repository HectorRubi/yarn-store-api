const express = require('express')
const ProductService = require('../services/product.service')

const router = express.Router()
const productService = new ProductService()

router.route('/')
.get(async (req, res, next) => {
  try {
    const products = await productService.find()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
.post(async (req, res, next) => {
  try {
    const body = req.body
    const newProduct = await productService.create(body)
    res.status(201).json({
      message: 'created',
      data: newProduct
    })
  } catch (error) {
    next(error)
  }
})

router.route('/:id')
.get(async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productService.findOne(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
.patch(async (req, res, next) => {
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
.delete(async (req, res) => {
  const { id } = req.params
  const product = await productService.delete(id)
  res.json({
    message: 'deleted',
    body: product,
    id,
  })
})

module.exports = router
