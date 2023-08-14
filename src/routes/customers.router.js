const express = require('express');
const { validateSchema } = require('./../middlewares/validator.handler');
const { createCustomerSchema } = require('./../schemas/customer.schema');
const CustomerService = require('./../services/customer.service');

const router = express.Router();
const customerService = new CustomerService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const customers = await customerService.find();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const body = req.body;
      const data = validateSchema(createCustomerSchema, body);
      const customer = await customerService.create(data);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
