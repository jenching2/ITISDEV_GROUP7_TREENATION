const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017/itisdev';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the donation schema
const donationSchema = new mongoose.Schema({
    numberOfTrees: {
        type: Number,
        required: true,
        min: 1
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    date: { type: Date, default: Date.now }
});

// Create the donation model
const Donation = mongoose.model('Donation', donationSchema);

// Route to create a new donation
app.post('/donations', async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201).send(donation);
    } catch (err) {
        res.status(400).send({ error: 'Failed to create donation', details: err.message });
    }
});

// Route to update existing donations (add a new field)
app.patch('/donations', async (req, res) => {
    try {
        const result = await Donation.updateMany(
            {},
            { $set: { newField: "defaultValue" } }
        );
        res.send(result);
    } catch (err) {
        res.status(400).send({ error: 'Failed to update donations', details: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

