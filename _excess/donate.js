const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/tree-donation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

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

// Routes
app.post("/api/donate", async (req, res) => {
  try {
    const { numberOfTrees, amount } = req.body;

    if (!numberOfTrees || !amount) {
      return res.status(400).send("Number of trees and amount are required.");
    }

    const donation = new Donation({ numberOfTrees, amount });
    await donation.save();
    res.status(201).send("Donation successful!");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Function to handle the donation logic
function selectTreeNumber(number) {
  const input = document.getElementById("donation-amount");
  if (number === "other") {
    input.value = "";
    input.focus();
    input.addEventListener("input", updateTotalAmount);
  } else {
    input.removeEventListener("input", updateTotalAmount);
    input.value = number * 50;
    updateTotalAmount();
  }
}

function updateTotalAmount() {
  const input = document.getElementById("donation-amount");
  const totalAmount = document.getElementById("total-amount");
  const numberOfTrees = input.value / 50;
  totalAmount.textContent = input.value + ".00 PHP";
}

async function plantTrees() {
  const numberOfTrees = document.getElementById("donation-amount").value / 50;
  const amount = document.getElementById("donation-amount").value;

  const response = await fetch("http://localhost:3000/api/donate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numberOfTrees, amount }),
  });

  if (response.ok) {
    alert("Thank you for your donation!");
  } else {
    alert("Failed to process donation.");
  }
}
