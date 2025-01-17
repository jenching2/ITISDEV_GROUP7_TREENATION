const express = require("express");
const cors = require("cors");

const db = require("./src/db/connection");
const routes = require("./src/routes");

const app = express();

const port = process.env.PORT ?? "5000";

// Connect to Mongoose
db();

// Use express JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect routes
app.use("/api", routes);

// Start the application
app.listen(port, () => {
  console.log(`App started on http://localhost:${port}`);
});
