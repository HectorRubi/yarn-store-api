const { faker } = require('@faker-js/faker')

class UserServie {
  constructor() {
    this.users = []
    this._generate()
  }

  async find() {
    return this.users
  }

  findOne() {}
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
      })
    }
  }
}

module.exports = UserServie
