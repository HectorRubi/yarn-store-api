const express = require('express');
const { OrderService } = require('./../services/order.service');
const { validateSchema } = require('./../middlewares/validator.handler');
const { createOrderSchema } = require('./../schemas/order.schema');

const router = express.Router();
const orderService = new OrderService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const orders = await orderService.find();
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = validateSchema(createOrderSchema, req.body);
      const newOrder = await orderService.create(data);
      return res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
