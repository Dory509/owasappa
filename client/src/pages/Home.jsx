import React from "react";
import Navbar from "../components/Navbar";  

const Home = () => {
  return (
    <>
      <Navbar />  {/* ✅ Add Navbar here */}
      <section className="hero is-fullheight has-background-primary-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-black">Welcome to OWASAPA</h1>
            <h2 className="subtitle is-3 has-text-black">
              Oops! I Wrote Another Story and Posted a Picture Again!
            </h2>
            <img
              src="/owasapa-logo.png"
              alt="OWASAPA Logo"
              style={{
                width: "350px",
                height: "auto",
                marginTop: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              }}
            />
            <p className="is-size-5 mt-4 has-text-black">
              Share your stories & pictures in a fun and creative way!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;