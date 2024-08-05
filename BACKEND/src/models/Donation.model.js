//

const mongoose = require("mongoose");

// Donation Schema
const donationSchema = new mongoose.Schema({
  numberOfTrees: Number,
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
