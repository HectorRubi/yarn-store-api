const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('./../libs/postgres.pool');

class ProductService {
  constructor() {
    this.products = [];
    this._generate();
    this.pool = pool;
    this.pool.on('error', () => {
      throw new Error('Error on getting data');
    });
  }

  async find() {
    const query = 'SELECT * FROM task';
    const response = await this.pool.query(query);
    return response.rows;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw boom.notFound('Product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }

    return product;
  }

  async create(data) {
    const { name, price, image } = data;
    const newProduct = {
      id: faker.string.uuid(),
      name: name,
      price: price,
      image: image,
    };
    this.products.push(newProduct);
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
