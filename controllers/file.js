require("dotenv").config();

const File = require("../models/file.js");
const AWS = require("aws-sdk");

function uploadToS3(
  data,
  filename,
  filesize,
  ownership,
  folderid,
  subfolderid
) {
  const BUCKET_NAME = process.env.BUCKET_NAME;

  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  s3bucket.upload(params, (err, response) => {
    if (err) {
      console.log("something went wrong", err);
    } else {
      let fileCreation;
      if (subfolderid) {
        fileCreation = File.create({
          name: filename,
          size: filesize,
          user_ownership: ownership,
          location: response.Location,
          FolderId: folderid,
          subfolderId: subfolderid,
        });
      } else {
        fileCreation = File.create({
          name: filename,
          size: filesize,
          user_ownership: ownership,
          location: response.Location,
          FolderId: folderid,
          subfolderid: null,
        });
      }

      fileCreation
        .then((res) => {
          res.status(200).json({
            fileURL: response.Location,
            success: true,
            fileId: res.id,
          });
          console.log("success");
        })
        .catch((err) => console.log(err));
    }
  });
}

exports.uploadFile = (req, res, next) => {
  const file_name = req.body.file.name;
  const file_size = req.body.file.size;
  const ownership = req.userId;
  const folder_id = req.body.folderId;
  const subfolder_id = req.body.subfolderId;

  uploadToS3(
    req.body.file,
    file_name,
    file_size,
    ownership,
    folder_id,
    subfolder_id
  );
};

exports.renameFile = async (req, res, next) => {
  const file_id = req.body.file_id;
  const updated_name = req.body.updated_name;

  try {
    const file = await File.findByPk(file_id);

    file.name = updated_name;

    await file.save();
    return res
      .status(200)
      .json({ message: "File name updated successfully", file: file });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update file" });
  }
};

exports.deleteFile = async (req, res, next) => {
  const file_id = req.body.file_id;

  try {
    // Find the file to delete by its ID
    const file = await File.findByPk(file_id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await file.destroy();

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete file" });
  }
};

exports.moveFile = async (req, res, next) => {
  const file_id = req.body.file_id;

  try {
    const file = await File.findByPk(file_id);
    if (!fileToDelete) {
      return res.status(404).json({ message: "File not found" });
    }
    if (subfolderId) {
      file.subfolderId = req.body.subfolderId;
      file.FolderId = req.body.folderId;
    } else {
      file.FolderId = req.body.folderId;
      file.subfolderId = null;
    }

    await file.save();
    return res.status(200).json({ message: "File moved successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to move file" });
  }
};
