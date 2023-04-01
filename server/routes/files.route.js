const express = require("express");
const File = require("../controllers/files.controller");

const router = express.Router();

// Route for get all files or search files if q is provided
router.get("/", (req, res) => {
  const { q } = req.query;
  const files = File.getFiles();
  if (q) {
    // Search files
    const filteredFiles = File.searchNodesForPrefix(q);
    res.json(filteredFiles);
  } else {
    // Get all files
    res.json(files);
  }
});

module.exports = router;
