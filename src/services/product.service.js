const { faker } = require('@faker-js/faker')

class ProductService {

  constructor() {
    this.products = [];
    this._generate()
  }

  find() {
    return this.products
  }

  findOne(id) {
    return this.products.find(product => product.id === id)
  }
  create() {}
  update() {}
  delete(){}

  _generate(size = 100) {
    const limit = size
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url()
      })
    }
  }
}

module.exports = ProductService
