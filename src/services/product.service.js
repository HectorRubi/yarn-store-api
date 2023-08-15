const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// const pool = require('./../libs/postgres.pool');
const {
  models: { Product },
} = require('./../libs/sequelize');

class ProductService {
  constructor() {
    this.products = [];
    this._generate();
  }

  async find({ offset, limit }) {
    const options = {
      include: ['category'],
      limit,
      offset,
    };
    const products = await Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await Product.findByPk(id, {
      include: ['category'],
    });

    if (!product) {
      throw boom.notFound('Product not found');
    }

    return product;
  }

  async create(data) {
    const newProduct = Product.create(data);
    return newProduct;
  }

  async update(id, body) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index];

    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }

    this.products[index] = {
      ...product,
      ...body,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    if (this.products[index].isBlock) {
      throw boom.conflict('Product is blocked');
    }

    const deletedProduct = this.products.splice(index, 1);

    return deletedProduct;
  }

  _generate(size = 100) {
    const limit = size;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
}

module.exports = ProductService;
