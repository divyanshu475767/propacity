// Require Sequelize package
const Sequelize = require('sequelize');

// Import the initialized Sequelize instance from database.js
const sequelize = require('../helpers/database.js');

// Define the Userinfo model representing a table in the database
const Userinfo = sequelize.define("Userinfo", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

// Export the Userinfo model for use in other parts of the application
module.exports = Userinfo;
