const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const filesRoutes = require("./routes/files.route");

const app = express();

// Middleware
// add "http://localhost:4200" to the list of allowed origins
app.use(cors({ origin: "http://localhost:4200" }));
app.use(bodyParser.json());

// Files routes
app.use("/files", filesRoutes);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
