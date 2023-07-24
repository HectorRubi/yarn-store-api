const joi = require('joi');

const id = joi.string();
const name = joi.string().min(1).max(30);
// const gender = joi
//   .string()
//   .lowercase()
//   .pattern(/^(male|female)$/)
//   .prefs({ convert: true });
const email = joi.string().email();
// const profile = joi.string().uri();
const password = joi.string().min(8);
// const isActive = joi.boolean();

const createUserSchema = joi.object({
  name: name.required(),
  // gender: gender.required(),
  email: email.required(),
  // profile: profile.required(),
  password: password.required(),
});

const updateUserSchema = joi
  .object({
    name,
    // gender,
    email,
    // profile,
    password,
    // isActive,
  })
  .min(1);

const idUserSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  idUserSchema,
};
