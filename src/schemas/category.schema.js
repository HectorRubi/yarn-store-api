const joi = require('joi')

const name = joi.string().min(1).max(50).trim().prefs({ convert: true })

const createCategorySchema = joi.object({
  name: name.required()
})

const updateCategorySchema = joi.object({
  name
}).min(1)

const idCategorySchema = joi.object({
  id: joi.string().uuid().required()
})

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  idCategorySchema,
}
