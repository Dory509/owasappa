const express = require("express");
const Story = require("../models/Story");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Create a new story (Protected Route)
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const newStory = new Story({
      title,
      content,
      imageUrl,
      author: req.user.id,
    });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().populate("author", "username email");
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single story by ID
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("author", "username email");
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a story (Protected Route)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (story.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await story.deleteOne();
    res.json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;