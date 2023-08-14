const { models } = require('./../libs/sequelize');

class Customer {
  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  async create(data) {
    const customer = await models.Customer.create(data);
    return customer;
  }
}

module.exports = Customer;
