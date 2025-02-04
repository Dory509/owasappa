const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

const resolvers = {
  Query: {
    users: async () => await User.find(),
    posts: async () => await Post.find().populate("author"),
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Incorrect password");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    },
    createPost: async (_, { title, content, imageUrl }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const post = new Post({ title, content, imageUrl, author: context.user.id });
      await post.save();

      return post;
    },
  },
};

module.exports = resolvers;