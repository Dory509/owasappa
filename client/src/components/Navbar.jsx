import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // ✅ Control menu state

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <strong>OWASAPA</strong>
          </Link>

          {/* ✅ Correct mobile menu toggle */}
          <button
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        <div id="navbarMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/login">Login</Link>
            <Link className="navbar-item" to="/register">Register</Link>
            <Link className="navbar-item" to="/create">Create Post</Link> {/* ✅ Added "Create Post" */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;