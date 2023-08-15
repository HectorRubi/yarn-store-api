const joi = require('joi');

const id = joi.number().integer();
const customerId = joi.number().integer();

const getOrderSchema = joi.object({
  id: id.required(),
});

const createOrderSchema = joi.object({
  customerId: customerId.required(),
});

module.exports = { getOrderSchema, createOrderSchema };
