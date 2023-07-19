const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
}

function validateSchema(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    throw boom.badRequest(error);
  }

  return value;
}

module.exports = { validatorHandler, validateSchema };
