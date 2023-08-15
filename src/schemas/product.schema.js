const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const description = joi.string().min(10);
const image = joi.string().uri();
const categoryId = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

const idProductSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  idProductSchema,
};
