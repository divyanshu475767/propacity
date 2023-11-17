// Require necessary packages and modules
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth.js');
const folderController = require('../controllers/folder.js');

// Define route for creating a folder
router.post('/createFolder', authentication.authenticate, folderController.createFolder);

// Export the router to be used in the application
module.exports = router;
