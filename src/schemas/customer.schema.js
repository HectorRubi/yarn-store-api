const joi = require('joi');

const createCustomerSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.string().required(),
  userId: joi.number().required(),
});

module.exports = {
  createCustomerSchema,
};
