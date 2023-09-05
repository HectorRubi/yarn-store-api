const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');

function passportInit() {
  passport.use(LocalStrategy);
}

module.exports = passportInit;
