const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Authentication Middleware
const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token);
    return { user };
  },
});

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
























// const express = require("express");
// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const uploadRoutes = require("./routes/upload"); // Import upload route
// require("dotenv").config();

// const typeDefs = require("./schema/typeDefs");
// const resolvers = require("./schema/resolvers");

// const app = express();
// app.use(cors());
// app.use(express.json());

// //  Serve uploaded images as static files
// app.use("/uploads", express.static("uploads"));

// // File upload route
// app.use("/upload", uploadRoutes);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
  
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(" MongoDB Connection Error:", err));

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//       const token = req.headers.authorization || "";
//       if (!token) return { user: null };
  
//       try {
//         const user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         return { user };
//       } catch (err) {
//         console.error("Invalid token:", err);
//         return { user: null };
//       }
//     },
//   });

// async function startServer() {
//   await server.start();
  
//   app.use(
//     "/graphql",
//     cors(),
//     express.json(),
//     expressMiddleware(server)
//   );

//   const PORT = process.env.PORT || 5050;
//   app.listen(PORT, () => {
//     console.log(` Server running on http://localhost:${PORT}/graphql`);
//   });
// }

// startServer();