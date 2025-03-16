const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    posts: async () => {
      try {
        return await Post.find({ published: true }).populate("author");
      } catch (error) {
        throw new Error("Error fetching posts");
      }
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { token, user };
      } catch (error) {
        throw new Error("Error registering user");
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Incorrect password");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { token, user };
      } catch (error) {
        throw new Error("Error logging in");
      }
    },
    createPost: async (_, { title, content, image }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized"); // Prevent unauthorized users from posting
      }

      try {
        const post = new Post({
          title,
          content,
          image,
          author: context.user.id, // Assign the logged-in user as the author
          published: false, 
        });

        await post.save();
        return post;
      } catch (error) {
        throw new Error("Error creating post");
      }
    },
    publishPost: async (_, { postId }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      try {
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");
        if (post.author.toString() !== context.user.id) throw new Error("Not authorized to publish this post");

        post.published = true;
        await post.save();
        return post;
      } catch (error) {
        throw new Error("Error publishing post");
      }
    },
  },
};

module.exports = resolvers;