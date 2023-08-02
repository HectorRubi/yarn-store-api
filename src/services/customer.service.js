const { models } = require('./../libs/sequelize');

class Customer {
  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }
}

module.exports = Customer;
