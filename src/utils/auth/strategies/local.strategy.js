const { Strategy } = require('passport-local');
const AuthService = require('./../../../services/auth.service');

const ERROR = false;
const authService = new AuthService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await authService.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, ERROR);
    }
  },
);

module.exports = LocalStrategy;
