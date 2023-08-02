const express = require('express');
const CustomerService = require('./../services/customer.service');

const router = express.Router();
const customerService = new CustomerService();

router.route('/').get(async (req, res, next) => {
  try {
    const customers = await customerService.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
