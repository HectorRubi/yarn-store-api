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

  async create(data) {
    const { name } = data
    const newCategory = {
      id: faker.string.uuid(),
      name,
    }
    this.categories.push(newCategory)
    return newCategory
  }

  async update(id, data) {
    const categoryIndex = this.categories.findIndex((category) => category.id === id)

    if (categoryIndex === -1) {
      throw boom.notFound('Category not found')
    }

    const category = this.categories[categoryIndex]
    this.categories[categoryIndex] = {
      ...category,
      ...data,
    }

    return this.categories[categoryIndex]
  }

  async delete(id) {
    const categoryIndex = this.categories.findIndex((category) => category.id === id)

    if (categoryIndex === -1) {
      throw boom.notFound('Category not found')
    }

    const deletedCategory = this.categories.splice(categoryIndex, 1)

    return deletedCategory
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
