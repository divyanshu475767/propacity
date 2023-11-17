// Require Sequelize package
const Sequelize = require("sequelize");

// Create a Sequelize instance and connect to the PostgreSQL database
const sequelize = new Sequelize("file_manager", "postgres", "ak475767", {
  host: "localhost",
  dialect: "postgres",
});

// Export the initialized Sequelize instance for use in the application
module.exports = sequelize;
