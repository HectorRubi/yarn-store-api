const express = require('express');
const UserService = require('./../services/user.service');
const {
  validatorHandler,
  validateSchema,
} = require('./../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  idUserSchema,
} = require('./../schemas/user.schema');

const router = express.Router();
const userService = new UserService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await userService.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const body = req.body;
      const value = validateSchema(createUserSchema, body);
      const newProduct = await userService.create(value);
      res.status(201).json({
        message: 'created',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(validatorHandler(idUserSchema, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .patch(
    validatorHandler(idUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const user = await userService.update(id, body);
        res.json({
          message: 'updated',
          data: user,
        });
      } catch (error) {
        next(error);
      }
    },
  )
  .delete(validatorHandler(idUserSchema, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.delete(id);
      res.json({
        message: 'deleted',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
