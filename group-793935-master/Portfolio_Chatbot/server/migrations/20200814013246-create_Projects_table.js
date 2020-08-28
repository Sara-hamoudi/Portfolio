'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Projects", { 
      id:{
        type:Sequelize.INTEGER(),
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
      type:Sequelize.STRING(),
      allowNull:false,
    },
    date:{
      type:Sequelize.DATE(),
      //allowNull:false,
    },
    used_Language:Sequelize.STRING(),
    description:{
      type:Sequelize.TEXT(),
      allowNull:false,
    },
    userId: Sequelize.INTEGER(),
    createdAT: Sequelize.DATE(),
    updatedAt: Sequelize.DATE(),
    })
},

  down: async (queryInterface, Sequelize) => {
    return  queryInterface.dropTable("Projects")
  }
};

