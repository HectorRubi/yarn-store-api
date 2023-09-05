const joi = require('joi');

const createCustomerSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.string().required(),
  user: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().required(),
  }),
});

module.exports = {
  createCustomerSchema,
};
