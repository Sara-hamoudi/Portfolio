'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', { 
      id: {
        type: Sequelize.INTEGER(),
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
    },
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
    createdAt: Sequelize.DATE(),
    updatedAt: Sequelize.DATE(),
    },{
      freezeTableName: true,
      instanceMethods: {
          generateHash(password) {
              return bcrypt.hash(password, bcrypt.genSaltSync(8));
          },
          validPassword(password) {
              return bcrypt.compare(password, this.password);
          }
      }
    }
  )
},

  down: async (queryInterface, Sequelize) => {
      queryInterface.dropTable("Users")
  }
};
