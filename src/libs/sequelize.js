const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const DIALECT = config.dbDialect;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${DIALECT}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const sequelize = new Sequelize(URI, { dialect: DIALECT, logging: true });

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;
