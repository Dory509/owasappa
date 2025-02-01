import React from "react";

const Register = () => {
  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2 has-text-black">Join OWASAPA</h1>
          <p className="subtitle has-text-grey">Create an account to start sharing your stories!</p>

          <div className="box" style={{ maxWidth: "400px", margin: "auto" }}>
            <form>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Enter your username" required />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" placeholder="Enter your email" required />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" placeholder="Create a password" required />
                </div>
              </div>

              <div className="field">
                <button className="button is-primary is-fullwidth">Sign Up</button>
              </div>
            </form>
          </div>

          <p className="has-text-grey">
            Already have an account? <a href="/login">Log in here</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;