// Require Sequelize package
const Sequelize = require('sequelize');

// Import the initialized Sequelize instance from database.js
const sequelize = require('../helpers/database.js');

// Define the File model representing a table in the database
const File = sequelize.define("File", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  size: Sequelize.INTEGER,
  user_ownership: Sequelize.INTEGER,
  location: Sequelize.STRING,
});

// Export the File model to be used in other parts of the application
module.exports = File;
