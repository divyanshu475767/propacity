const express = require('express');
const router = express.Router();
const authentication  = require('../middlewares/auth.js')


const userController = require('../controllers/auth.js');




router.post('/signup' ,userController.signUp);
router.post('/login' ,userController.login);



module.exports = router;