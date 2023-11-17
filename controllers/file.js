// Require necessary packages and files
require("dotenv").config();
const File = require("../models/file.js");
const AWS = require("aws-sdk");

// Function to upload file to AWS S3
function uploadToS3(
  data,
  filename,
  filesize,
  ownership,
  folderid,
  subfolderid
) {
  // Fetch environment variables
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  // Create an instance of AWS S3
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  // Set parameters for S3 upload
  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  // Upload file to S3 bucket
  s3bucket.upload(params, (err, response) => {
    if (err) {
      console.log("something went wrong", err);
    } else {
      let fileCreation;
      // Check if subfolder ID exists, create file with appropriate folder/subfolder IDs
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
        // If no subfolder ID, create file with null subfolder ID
        fileCreation = File.create({
          name: filename,
          size: filesize,
          user_ownership: ownership,
          location: response.Location,
          FolderId: folderid,
          subfolderid: null,
        });
      }

      // Create the file entry in the database
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

// Controller function to handle file upload
exports.uploadFile = (req, res, next) => {
  // Extract file details from request body
  const file_name = req.body.file.name;
  const file_size = req.body.file.size;
  const ownership = req.userId;
  const folder_id = req.body.folderId;
  const subfolder_id = req.body.subfolderId;

  // Call function to upload file to S3
  uploadToS3(
    req.body.file,
    file_name,
    file_size,
    ownership,
    folder_id,
    subfolder_id
  );
};

// Controller function to rename a file
exports.renameFile = async (req, res, next) => {
  // Extract file details from request body
  const file_id = req.body.file_id;
  const updated_name = req.body.updated_name;

  try {
    // Find the file by its ID
    const file = await File.findByPk(file_id);

    // Update the file name
    file.name = updated_name;

    // Save the updated file name
    await file.save();
    return res
      .status(200)
      .json({ message: "File name updated successfully", file: file });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update file" });
  }
};

// Controller function to delete a file
exports.deleteFile = async (req, res, next) => {
  // Extract file ID from request body
  const file_id = req.body.file_id;

  try {
    // Find the file to delete by its ID
    const file = await File.findByPk(file_id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete the file
    await file.destroy();

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete file" });
  }
};

// Controller function to move a file to a different folder/subfolder
exports.moveFile = async (req, res, next) => {
  // Extract file ID from request body
  const file_id = req.body.file_id;

  try {
    // Find the file by its ID
    const file = await File.findByPk(file_id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Check for subfolder ID and update file's folder/subfolder IDs accordingly
    if (req.body.subfolderId) {
      file.subfolderId = req.body.subfolderId;
      file.FolderId = req.body.folderId;
    } else {
      file.FolderId = req.body.folderId;
      file.subfolderId = null;
    }

    // Save the updated file details
    await file.save();
    return res.status(200).json({ message: "File moved successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to move file" });
  }
};
