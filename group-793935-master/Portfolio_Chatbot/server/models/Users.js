const Sequelize = require('sequelize');
// const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("Users", {
        id:{
            type:Sequelize.INTEGER(),
            allowNull:false,
            autoIncrement: true,
            primaryKey: true
        },
        name:Sequelize.STRING(),
        admin:{
            type:Sequelize.TINYINT(),
            defaultValue:false
        },
        username:{
            type:Sequelize.STRING(),
            allowNull:false
        } ,
        email:{

            type: Sequelize.STRING(),
            unique: true,
            validate: {
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
        },
        password:{
            type:Sequelize.STRING(),
            allowNull: false
          }, 
    });
  
    return User;
  }