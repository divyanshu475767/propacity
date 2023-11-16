// Importing necessary modules and dependencies
const jwt = require("jsonwebtoken");
const user_table = require("../models/userInfo.js");

// Middleware function for authentication
exports.authenticate = (req, res, next) => {
  // Extracting the token from the request header
  const token = req.header("Authorization");

  // Verifying the token using the secret key ("myToken" in this case)
  const user = jwt.verify(token, "myToken");

  // Extracting the user ID from the verified token
  const id = user.userId;
  console.log(id); // Logging the user ID

  // Finding the user in the user_table using the user ID
  user_table
    .findByPk(id)
    .then((found_user) => {
      console.log(found_user.id); // Logging the found user's ID

      // Assigning the user ID to the request object for further use
      req.userId = id;
      // Proceeding to the next middleware or route handler
      next();
    })
    .catch((err) => {
      // Handling errors if the user is not found
      res.status(401).json({ message: "user not found" });
    });
};
