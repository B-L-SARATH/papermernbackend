const express = require("express");
const router = express.Router();
const papermodel = require("../models/Paper");
const authenticate = require("../middleware/jwt");

//get all papers

router.get("/getpapers", authenticate, async (req, res) => {
  const email = req.user.user.email; //we are setting the req.user data while verifying jwt
  let data = await papermodel.find({ email });
  if (data) {
    res.send(data);
  }
});
//add a paper to the database
router.get("/getpaper/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  let data = await papermodel.findById(id);
  if (data) {
    res.send(data);
  }
});
router.post("/addpaper", authenticate, async (req, res) => {
  let data = req.body;
  try {
    await papermodel.create(data);

    res.send({ success: true, message: "paper added  successfully" });
  } catch (err) {
    res.send({ success: false, message: "something went wrong" });

    console.log(err.message);
  }
});

//update the paper using db

router.put("/updatepaper/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const email = req.body.email;
  const year = req.body.year;
  const publisher = req.body.publisher;
  try {
    const paper = await papermodel.findByIdAndUpdate(
      id,
      { $set: { title, author, email, year, publisher } },
      { new: true }
    );
    if (paper) {
      res.send({ success: true, message: "paper updated successfully" });
    } else {
      res.send({ success: false, message: "user not found" });
    }
  } catch (err) {
    res.send({ success: false, message: "something went wrong" });
  }
});

//delete paper

router.delete("/deletepaper/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await papermodel.findByIdAndDelete(id);
    if (result) {
      res.send({ success: true, message: "paper delted successfully" });
    } else {
      res.send({ success: false, message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

module.exports = router;
