const express = require('express');
const router = express.Router();
const authentication  = require('../middlewares/auth.js')
const folderController = require('../controllers/folder.js')






router.post('/createFolder',authentication.authenticate,folderController.createFolder);



module.exports = router;