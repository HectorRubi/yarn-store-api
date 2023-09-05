const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { Strategy } = require('passport-local');
const UserService = require('./../../../services/user.service');

const ERROR = false;
const userService = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await userService.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), ERROR);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), ERROR);
      }

      delete user.dataValues.password;

      done(null, user);
    } catch (error) {
      done(error, ERROR);
    }
  },
);

module.exports = LocalStrategy;
