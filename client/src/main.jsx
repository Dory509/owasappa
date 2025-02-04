import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost"; // ✅ Import CreatePost
import Navbar from "./components/Navbar"; 
import "bulma/css/bulma.min.css";

const client = new ApolloClient({
  uri: "http://localhost:5050/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} /> {/* ✅ Add Create Post Route */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);