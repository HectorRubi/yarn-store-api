const { models } = require('./../libs/sequelize');

class OrderService {
  async find() {
    return await models.Order.findAll();
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
}

module.exports = { OrderService };
