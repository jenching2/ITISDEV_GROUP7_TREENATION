const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.name}` });
});

module.exports = router;
