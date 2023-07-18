const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class UserServie {
  constructor() {
    this.users = []
    this._generate()
  }

  async find() {
    return this.users
  }

  async findOne(id) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw boom.notFound('User not found')
    }

    if (!user.isActive) {
      throw boom.conflict('User is inactive')
    }

    return user
  }

  async create(data) {
    const { name, gender, email, profile, password } = data
    const newProduct = {
      id: faker.string.uuid(),
      name,
      gender,
      email,
      profile,
      password,
    }
    this.users.push(newProduct)
    return newProduct
  }
  update() {}
  delete() {}

  _generate(size = 100) {
    const limit = size
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        gender: faker.person.sex(),
        email: faker.internet.email(),
        profile: faker.image.avatar(),
        password: faker.internet.password({ length: 30 }),
        isActive: faker.datatype.boolean(),
      })
    }
  }
}

module.exports = UserServie