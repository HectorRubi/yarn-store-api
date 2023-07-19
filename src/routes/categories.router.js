const express = require('express')
const CategoryService = require('./../services/category.service')
const { validateSchema, validatorHandler } = require('./../middlewares/validator.handler')
const {
  createCategorySchema,
  updateCategorySchema,
  idCategorySchema,
} = require('./../schemas/category.schema')

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
      const value = validateSchema(createCategorySchema, body)
      const category = await categoryService.create(value)
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
  validatorHandler(idCategorySchema, 'params'),
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
  validatorHandler(idCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const value = validateSchema(updateCategorySchema, body)
      const category = await categoryService.update(id, value)
      res.json({
        message: 'updated',
        data: category,
      })
    } catch (error) {
      next(error)
    }
  }
)
.delete(
  validatorHandler(idCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await categoryService.delete(id)
      res.json({
        message: 'deleted',
        data: category,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
