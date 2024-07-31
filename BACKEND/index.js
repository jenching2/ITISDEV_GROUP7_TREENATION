const express = require("express");

const db = require("./src/db/connection");
const routes = require("./src/routes");

const app = express();

const port = process.env.PORT ?? "5000";

db();
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`App started on http://localhost:${port}`);
});
