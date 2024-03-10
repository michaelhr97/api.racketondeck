const { Sequelize } = require('sequelize');
const config = require('../config').get('sequelize');

const db = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
