const Sequelize = require('sequelize');

const sequelize = require('../helpers/database.js');

const File = sequelize.define("File",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING, 
      size: Sequelize.INTEGER,
      user_ownership: Sequelize.INTEGER,
      location:Sequelize.STRING,
})



module.exports = File;