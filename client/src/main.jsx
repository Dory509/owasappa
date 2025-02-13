import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PublishPost from "./pages/PublishPost";
import Navbar from "./components/Navbar";

// Import Bulma
import "bulma/css/bulma.min.css";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/publish" element={<PublishPost />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);