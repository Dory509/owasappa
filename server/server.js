const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

//  Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (without deprecated options)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

// Setup Apollo Server with Authentication Context
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        let user = null;

        if (token) {
          try {
            user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
          } catch (err) {
            console.warn("⚠️ Invalid Token:", err.message);
          }
        }
        
        return { user };
      },
    })
  );

  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}/graphql`);
  });
}

startServer();