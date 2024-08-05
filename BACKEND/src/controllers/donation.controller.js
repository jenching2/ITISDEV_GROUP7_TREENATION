const DonationModel = require("../models/Donation.model");

module.exports = {
  addDontation: async (req, res) => {
    try {
      const { numberOfTrees, amount } = req.body;

      if (!numberOfTrees || !amount) {
        return res.status(400).send("Number of trees and amount are required.");
      }

      const donation = new DonationModel({ numberOfTrees, amount });
      await donation.save();
      res.status(201).send("Donation successful!");
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
};
