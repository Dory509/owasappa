import React from "react";

const Login = () => {
  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2 has-text-black">Login to OWASAPA</h1>
          <p className="subtitle has-text-grey">Please log in to continue.</p>

          <div className="box" style={{ maxWidth: "400px", margin: "auto" }}>
            <form>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" placeholder="Enter your email" required />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" placeholder="Enter your password" required />
                </div>
              </div>

              <div className="field">
                <button className="button is-primary is-fullwidth">Login</button>
              </div>
            </form>
          </div>

          <p className="has-text-grey">
            Don't have an account? <a href="/register">Sign up here</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;