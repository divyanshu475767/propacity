const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.js");
const folderRoutes = require("./routes/folder.js");
const subfolderRoutes = require("./routes/subfolder.js");
const fileRoutes = require("./routes/file.js");



const Sequelize = require("./helpers/database.js");

const user = require("./models/userInfo.js");
const folder = require("./models/folder.js");
const subfolder = require("./models/subfolder.js");
const file = require("./models/file.js");




app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(folderRoutes);
app.use(subfolderRoutes);
app.use(fileRoutes);


user.hasMany(folder);
folder.belongsTo(user);

folder.hasMany(subfolder);
subfolder.belongsTo(folder);


folder.hasMany(file);
file.belongsTo(folder);

subfolder.hasMany(file);
file.belongsTo(subfolder);



Sequelize.sync().then(() => {
  
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});