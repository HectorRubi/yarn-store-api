const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

function passportInit() {
  passport.use(LocalStrategy);
  passport.use(JwtStrategy);
}

module.exports = passportInit;
