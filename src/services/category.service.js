const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class CategoryService {
  constructor() {
    this.categories = []
    this._generate()
  }

  async find() {
    return this.categories
  }

  async findOne(id) {
    const category = this.categories.find((category) => category.id === id)

    if (!category) {
      throw boom.notFound('Category not found')
    }

    return category
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
