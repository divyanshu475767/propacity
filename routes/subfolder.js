// Require necessary packages and modules
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth.js');
const subfolderController = require('../controllers/subfolder.js');

// Define route for creating a subfolder
router.post('/createSubfolder', authentication.authenticate, subfolderController.createSubfolder);

// Export the router to be used in the application
module.exports = router;
