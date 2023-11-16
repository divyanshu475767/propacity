const Sequelize = require("sequelize");

const sequelize = new Sequelize("file_manager", "postgres", "ak475767", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
