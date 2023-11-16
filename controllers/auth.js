// Importing the user model and bcrypt for password hashing
const user = require("../models/userInfo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  const token = jwt.sign({ userId: id }, "myToken");
  return token;
}


// Function to handle user signup
exports.signUp = (req, res, next) => {
  console.log(req.body); // Logging the request body
  // Checking if a user with the provided email already exists
  user
    .findAll({ where: { email: req.body.email } })
    .then((result) => {
      // If user exists, return a conflict status
      if (result.length > 0) {
        res
          .status(409)
          .json({ success: false, message: "User already exists" });
      } else {
        // Hashing the password before storing it in the database
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res
              .status(500)
              .json({ success: false, message: "Error hashing password" });
          } else {
            // Creating a new user with hashed password
            user
              .create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                isPremium: false,
              })
              .then((data) => {
                res
                  .status(201)
                  .json({
                    success: true,
                    message: "User created successfully",
                  });
              })
              .catch((error) => {
                console.log(error);
                res
                  .status(500)
                  .json({ success: false, message: "Error creating user" });
              });
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({ success: false, message: "Error finding user" });
    });
};

// Function to handle user login
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Finding the user by email
  user
    .findOne({ where: { email: email } })
    .then((user) => {
      // Comparing the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);

          res
            .status(500)
            .json({ success: false, message: "Error comparing password" });
        }
        // If passwords match, successful login
        if (result) {
          const id = user.id;
          const token = generateAccessToken(id);
          res.json({ success: true, message: "Welcome"  , token: token });
        } else {
          // If passwords don't match, return an error status
          res
            .status(500)
            .json({ success: false, message: "Password is incorrect" });
        }
      });
    })
    .catch((err) => {
      console.log(err);

      // If user doesn't exist, prompt to register
      res
        .status(500)
        .json({
          success: false,
          message: "User does not exist, please register",
        });
    });
};
