const { config } = require('./../config/config');

const DIALECT = config.dbDialect;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${DIALECT}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: DIALECT,
  },
  production: {
    url: URI,
    dialect: DIALECT,
  },
};
