const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Projects = sequelize.define("Projects", {
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
        used_language:Sequelize.STRING(),
        description:{
            type:Sequelize.TEXT(),
            allowNull:false,
        },
    });
  
    return Projects;
  }