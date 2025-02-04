import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/postMutations";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <>
      {/* Hero Section */}
      <section className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-white">
              Welcome to <span className="has-text-warning">OWASAPA</span>
            </h1>
            <h2 className="subtitle is-3 has-text-light">
              "Oops! I Wrote Another Story and Posted a Picture Again!"
            </h2>
            <img
              src="/owasapa-logo.png"
              alt="OWASAPA Logo"
              className="mt-3"
              style={{
                width: "350px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
              }}
            />
            <p className="is-size-5 mt-4 has-text-white">
              Share your stories & pictures in a fun and creative way!
            </p>

            {/* Login / Register Buttons */}
            <div className="buttons mt-5">
              <Link to="/login" className="button is-warning is-medium">
                Login
              </Link>
              <Link to="/register" className="button is-light is-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered has-text-primary">
            Latest Stories from the Community
          </h2>
          {loading && <p className="has-text-centered">Loading posts...</p>}
          {error && (
            <p className="has-text-danger has-text-centered">
              Error loading posts!
            </p>
          )}
          <div className="columns is-multiline">
            {data?.posts.map((post) => (
              <div key={post.id} className="column is-4">
                <div className="box">
                  <h3 className="title is-5">{post.title}</h3>
                  <p className="has-text-grey">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="mt-3"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}
                  <p className="has-text-grey mt-2">
                    <strong>By {post.author.username}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;