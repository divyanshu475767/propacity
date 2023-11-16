const Sequelize = require('sequelize');

const sequelize = require('../helpers/database.js');

const Folder = sequelize.define("Folder",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,    
})



module.exports = Folder;