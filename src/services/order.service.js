const {
  models: { Order },
} = require('./../libs/sequelize');

class OrderService {
  async find() {
    return await Order.findAll();
  }

  async create(data) {
    const newOrder = await Order.create(data);
    return newOrder;
  }
}

module.exports = { OrderService };
