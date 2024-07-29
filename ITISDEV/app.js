// donate.js

// Function to handle donation submission
async function submitDonation() {
    // Get values from input fields
    const numberOfTrees = document.getElementById('donation-amount').value / 50; // Example conversion from amount to number of trees
    const amount = document.getElementById('donation-amount').value;

    // Prepare data to send to server
    const donationData = { numberOfTrees, amount };

    try {
        // Send data to server
        const response = await fetch('http://localhost:3000/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationData),
        });

        // Check if the request was successful
        if (response.ok) {
            alert('Donation successful!');
        } else {
            alert('Failed to process donation.');
        }
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        alert('An error occurred.');
    }
}

// Update the function for tree number selection
function selectTreeNumber(number) {
    const input = document.getElementById('donation-amount');
    if (number === 'other') {
        input.value = '';
        input.focus();
    } else {
        input.value = number * 50;
    }
    document.getElementById('total-amount').textContent = input.value + '.00';
}

// Update the function for planting trees
function plantTrees() {
    submitDonation(); // Call the function to handle donation submission
}
