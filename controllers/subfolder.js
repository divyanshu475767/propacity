const Subfolder = require("../models/subfolder.js");
const Folder = require("../models/folder.js");

exports.createSubfolder = (req, res, next) => {
  const userId = req.userId;
  const folderId = req.body.folderId;
  const subfolderName = req.body.name;

  Folder.findOne({ where: { id: folderId } }).then((folder) => {
    if (userId !== folder.UserinfoId) {
      return res.status(403).send({
        success: false,
        message:
          "You don't have permission to create subfolders in this folder",
      });
    } else {
      // Finding if a folder with the same name exists for the user
      Subfolder.findOne({ where: { name: subfolderName, FolderId: folderId } })
        .then((result) => {
          if (result) {
            // If subfolder with the same name exists for the user, send 409 Conflict status
            res.status(409).send({
              success: false,
              message: "subfolder already exists for this folder",
            });
          } else {
            // If the subfolder doesn't exist, create a new one
            Subfolder.create({ name: subfolderName, FolderId: folderId })
              .then((result) => {
                // Send 201 Created status for successful subfolder creation
                res.status(201).send({
                  success: true,
                  message: "subfolder created successfully",
                  subfolderId: result.id,
                  folderId: FolderId
                });
              })
              .catch((err) => {
                // Handle any errors that occur during folder creation
                console.error("Error creating subfolder:", err);
                // Send 500 Internal Server Error status for server-side errors
                res
                  .status(500)
                  .send({
                    success: false,
                    message: "Failed to create subfolder",
                  });
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
    }
  });
};
