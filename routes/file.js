const express = require('express');
const router = express.Router();
const authentication  = require('../middlewares/auth.js')
const fileController = require('../controllers/file.js')
const paginate = require('../BonusTasks/Pagination.js');





router.post('/uploadFile',authentication.authenticate,fileController.uploadFile);
router.put('/renameFile',authentication.authenticate,fileController.renameFile);
router.put('/moveFile',authentication.authenticate,fileController.moveFile);

router.delete('/deleteFile',authentication.authenticate,fileController.deleteFile);
router.get('/getFiles' , authentication.authenticate ,paginate.getFiles);
module.exports = router;