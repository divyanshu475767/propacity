// Require necessary packages and modules
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth.js');
const fileController = require('../controllers/file.js');
const paginate = require('../BonusTasks/Pagination.js');

// Define routes for file operations: upload, rename, move, delete, and retrieve files
router.post('/uploadFile', authentication.authenticate, fileController.uploadFile);
router.put('/renameFile', authentication.authenticate, fileController.renameFile);
router.put('/moveFile', authentication.authenticate, fileController.moveFile);
router.delete('/deleteFile', authentication.authenticate, fileController.deleteFile);
router.get('/getFiles', authentication.authenticate, paginate.getFiles);

// Export the router to be used in the application
module.exports = router;
