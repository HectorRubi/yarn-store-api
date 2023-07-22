const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// const getConnection = require('./../libs/postgres');
// const pool = require('./../libs/postgres.pool');
const { models } = require('./../libs/sequelize');

class UserServie {
  constructor() {
    this.users = [];
    this._generate();
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw boom.notFound('User not found');
    }

    if (!user.isActive) {
      throw boom.conflict('User is inactive');
    }

    return user;
  }

  async create(data) {
    const { name, gender, email, profile, password } = data;
    const newProduct = {
      id: faker.string.uuid(),
      name,
      gender,
      email,
      profile,
      password,
      isActive: true,
    };
    this.users.push(newProduct);
    return newProduct;
  }

  async update(id, body) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw boom.notFound('User not found');
    }

    const user = this.users[userIndex];

    if (!user.isActive) {
      throw boom.conflict('User is inactive');
    }

    this.users[userIndex] = {
      ...user,
      ...body,
    };

    return this.users[userIndex];
  }

  async delete(id) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw boom.notFound('User not found');
    }

    const user = this.users[userIndex];

    if (!user.isActive) {
      throw boom.conflict('User is inactive');
    }

    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser;
  }

  _generate(size = 100) {
    const limit = size;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        gender: faker.person.sex(),
        email: faker.internet.email(),
        profile: faker.image.avatar(),
        password: faker.internet.password({ length: 30 }),
        isActive: faker.datatype.boolean(),
      });
    }
  }
}

module.exports = UserServie;
