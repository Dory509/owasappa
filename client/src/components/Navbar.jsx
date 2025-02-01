import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <strong>OWASAPA</strong>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
            onClick={() => {
              document.querySelector(".navbar-burger").classList.toggle("is-active");
              document.querySelector("#navbarMenu").classList.toggle("is-active");
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item" href="/login">Login</a>
            <a className="navbar-item" href="/register">Register</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;