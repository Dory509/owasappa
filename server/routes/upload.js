const express = require("express");
const upload = require("../middleware/upload"); // Import upload middleware
const router = express.Router();

// Handle image upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded!" });

  // Generate image URL
  const imageUrl = `http://localhost:5050/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;