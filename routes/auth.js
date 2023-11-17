// Require necessary packages and modules
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth.js');

// Import user controller module
const userController = require('../controllers/auth.js');

// Define routes for user signup and login
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

// Export the router to be used in the application
module.exports = router;
