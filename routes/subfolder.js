const express = require('express');
const router = express.Router();
const authentication  = require('../middlewares/auth.js')
const subfolderController = require('../controllers/subfolder.js')






router.post('/createSubfolder',authentication.authenticate,subfolderController.createSubfolder);



module.exports = router;