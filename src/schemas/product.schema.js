const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const description = joi.string().min(10);
const image = joi.string().uri();
const categoryId = joi.number().integer();

const priceMin = joi.number().integer().min(10);
const priceMax = joi.number().integer().min(10);

const limit = joi.number().integer();
const offset = joi.number().integer();

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

const queryProductSchema = joi
  .object({
    limit,
    offset,
    price,
    price_min: priceMin,
    price_max: priceMax,
  })
  .with('price_min', 'price_max')
  .with('price_max', 'price_min');

module.exports = {
  createProductSchema,
  updateProductSchema,
  idProductSchema,
  queryProductSchema,
};
