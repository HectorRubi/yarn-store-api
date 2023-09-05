const bcrypt = require('bcrypt');
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
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const customer = await Customer.create(newData, {
      include: ['user'],
    });
    delete customer.dataValues.user.dataValues.password;
    return customer;
  }
}

module.exports = CustomerService;
