const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with better error handling
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
}

// Initialize Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
}

// Start the server
(async () => {
  await connectDB();
  await startServer();
})();