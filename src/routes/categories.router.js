const express = require('express')
const CategoryService = require('./../services/category.service')

const router = express.Router()
const categoryService = new CategoryService()

router.route('/')
.get(
  async (req, res, next) => {
    try {
      const users = await categoryService.find()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
)
.post(
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = {...body}
      res.status(201).json({
        message: 'created',
        data: user,
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
      const user = {id}
      res.json(user)
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
      const user = {id, body}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)
.delete(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = {id}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
