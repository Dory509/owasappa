const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post"); // Import Post model

const router = express.Router();

//  Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return User & Token
    res.status(201).json({ message: "User registered!", token, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return User & Token
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  🔹 Create Post Route
router.post("/create-post", async (req, res) => {
  try {
    const { title, content, image, userId } = req.body;

    // Validate Request
    if (!title || !content || !userId) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create New Post
    const newPost = new Post({
      title,
      content,
      image,
      author: userId,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;