const boom = require('@hapi/boom');

// const getConnection = require('./../libs/postgres');
// const pool = require('./../libs/postgres.pool');
const { models } = require('./../libs/sequelize');

class UserServie {
  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await this._findUserById(id);
    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, body) {
    const user = await this._findUserById(id);
    const updatedUser = await user.update(body);
    return updatedUser;
  }

  async delete(id) {
    const user = await this._findUserById(id);
    await user.destroy();
    return user;
  }

  async _findUserById(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
}

module.exports = UserServie;
