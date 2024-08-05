// Author: DENISE OCTAVIANO

const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const donationRoutes = require("./donation.routes");
const router = express.Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/donate", donationRoutes);

module.exports = router;
