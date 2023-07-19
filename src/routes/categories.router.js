const express = require('express')
const CategoryService = require('./../services/category.service')

const router = express.Router()
const categoryService = new CategoryService()

router.route('/')
.get(
  async (req, res, next) => {
    try {
      const categories = await categoryService.find()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }
)
.post(
  async (req, res, next) => {
    try {
      const body = req.body;
      const category = {...body}
      res.status(201).json({
        message: 'created',
        data: category,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.route('/:id')
.get(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await categoryService.findOne(id)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)
.patch(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const category = {id, body}
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)
.delete(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = {id}
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
