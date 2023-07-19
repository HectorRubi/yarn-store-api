const { faker } = require('@faker-js/faker')

class CategoryService {
  constructor() {
    this.categories = []
    this._generate()
  }

  async find() {
    return this.categories
  }

  _generate(size = 10) {
    const limit = size
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.word.noun(),
      })
    }
  }
}

module.exports = CategoryService
