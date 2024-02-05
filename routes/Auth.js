const express = require("express");
const authenticate = require("../middleware/jwt");
const router = express.Router();

router.get("/isauthenticated", authenticate, (req, res) => {
  res.send({ success: true, message: "user authenticated" });
});

module.exports = router;
