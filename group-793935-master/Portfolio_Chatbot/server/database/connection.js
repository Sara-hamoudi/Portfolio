const Sequelize = require('sequelize');

const sequelize = new Sequelize("portfolio", 'root', '', {host: '127.0.0.1', dialect: "mysql", socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock', operatorsAliases: false})

module.exports= sequelize;
global.sequelize = sequelize;