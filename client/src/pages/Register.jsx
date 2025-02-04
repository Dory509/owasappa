import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/authMutations";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [register, { loading, error }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const { data } = await register({ variables: formData });
      console.log("Registration Success:", data);
      localStorage.setItem("token", data.register.token);
      navigate("/");
    } catch (err) {
      console.error("GraphQL Error:", err.message);
    }
  };

  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2 has-text-black">
            Join <span className="has-text-primary">OWASAPA</span>
          </h1>
          <p className="subtitle has-text-grey">
            Be part of a <span className="has-text-warning">fun</span> and <span className="has-text-warning">creative</span> community!
          </p>

          {/*  Signup Box (WHITE, not dark) */}
          <div className="box has-background-white" 
               style={{ maxWidth: "400px", margin: "auto", padding: "20px", borderRadius: "10px", 
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            {error && <p className="has-text-danger">{error.message}</p>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label has-text-dark">Username</label>
                <div className="control">
                  <input className="input" name="username" type="text" placeholder="Enter your username" onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-dark">Email</label>
                <div className="control">
                  <input className="input" name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-dark">Password</label>
                <div className="control">
                  <input className="input" name="password" type="password" placeholder="Create a password" onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <button className="button is-primary is-fullwidth" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>

          {/* Vibrant "Why Join Us" Section */}
          <div className="section">
            <h2 className="title is-4 has-text-black">✨ Why Join OWASAPA?</h2>
            <div className="columns is-multiline is-centered">
              <div className="column is-3">
                <div className="box has-background-info" 
                     style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "white", textAlign: "center" }}>
                  <strong> Connect with Storytellers</strong>
                  <p>Meet and share stories with like-minded people.</p>
                </div>
              </div>
              <div className="column is-3">
                <div className="box has-background-warning" 
                     style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "white", textAlign: "center" }}>
                  <strong>Share Your Moments</strong>
                  <p>Upload your pictures and tell your story.</p>
                </div>
              </div>
              <div className="column is-3">
                <div className="box has-background-success" 
                     style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "white", textAlign: "center" }}>
                  <strong> Get Inspired</strong>
                  <p>Explore fresh content from creative minds.</p>
                </div>
              </div>
              <div className="column is-3">
                <div className="box has-background-danger" 
                     style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "white", textAlign: "center" }}>
                  <strong> Engage with the Community</strong>
                  <p>Like, comment, and interact with amazing creators.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="has-text-grey mt-4">
            Already have an account? <a href="/login" className="has-text-primary">Log in here</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;