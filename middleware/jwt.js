const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (result) {
      // console.log(result);
      req.user = result;
      next();
    } else {
      res.send({ success: false, message: "unauthorized user" });
    }
  });
}

module.exports = authenticate;
