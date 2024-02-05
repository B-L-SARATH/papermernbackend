const express = require("express");
const router = express.Router();
const usermodel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await usermodel.findOne({ email });
    if (user) {
      res.send({ success: false, message: "user already existed" });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const userdata = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };

      const newuser = await usermodel.create(userdata);
      if (newuser) {
        res.send({ success: true, message: "user created successfully" });
      } else {
        res.send({ success: false, message: "user not created" });
      }
    }
  } catch (err) {
    res.send("some thing went wrong ");
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await usermodel.findOne({ email });
    if (!user) {
      res.send({ success: false, message: "user not found" });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: 6000,
          });
          res.send({
            success: true,
            message: "user login successfully",
            token,
            email,
          });
        } else {
          res.send({ success: false, message: "invalid credentials" });
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.send("something went wrong");
  }
});
module.exports = router;
