const Folder = require("../models/folder.js");

exports.createFolder = (req, res, next) => {
  const userId = req.userId;
  const folder_name = req.body.name;

  // Finding if a folder with the same name exists for the user
  Folder.findOne({ where: { name: folder_name, UserinfoId: userId } })
    .then((result) => {
      if (result) {
        // If folder with the same name exists for the user, send 409 Conflict status
        res
          .status(409)
          .send({
            success: false,
            message: "Folder already exists for this user",
          });
      } else {
        // If the folder doesn't exist, create a new one
        Folder.create({ name: folder_name, UserinfoId: userId })
          .then((result) => {
            // Send 201 Created status for successful folder creation
            res
              .status(201)
              .send({ success: true, message: "Folder created successfully" , folder_id:result.id });
          })
          .catch((err) => {
            // Handle any errors that occur during folder creation
            console.error("Error creating folder:", err);
            // Send 500 Internal Server Error status for server-side errors
            res
              .status(500)
              .send({ success: false, message: "Failed to create folder" });
          });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during folder search
      console.error("Error finding folder:", err);
      // Send 500 Internal Server Error status for server-side errors
      res
        .status(500)
        .send({ success: false, message: "Failed to create folder" });
    });
};
