const {
  models: { Customer },
} = require('./../libs/sequelize');

class CustomerService {
  async find() {
    const customers = await Customer.findAll({
      include: ['user'],
    });
    return customers;
  }

  async create(data) {
    const customer = await Customer.create(data);
    return customer;
  }
}

module.exports = CustomerService;
