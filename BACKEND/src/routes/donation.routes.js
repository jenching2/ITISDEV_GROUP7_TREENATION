const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const donationController = require("../controllers/donation.controller");
const router = express.Router();

router.post("/", authenticate, donationController.addDontation);

module.exports = router;
