const Sequelize = require('sequelize');

const sequelize = require('../helpers/database.js');

const Subfolder = sequelize.define("Subfolder",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,    
})

module.exports = Subfolder;