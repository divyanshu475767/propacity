// Require Sequelize package
const Sequelize = require('sequelize');

// Import the initialized Sequelize instance from database.js
const sequelize = require('../helpers/database.js');

// Define the Subfolder model representing a table in the database
const Subfolder = sequelize.define("Subfolder", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
});

// Export the Subfolder model for use in other parts of the application
module.exports = Subfolder;
