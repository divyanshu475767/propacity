const Sequelize = require('sequelize');

const sequelize = require('../helpers/database.js');

const User = sequelize.define("Userinfo",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
})



module.exports = User;