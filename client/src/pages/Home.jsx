import React from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/postMutations"; 

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <>
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

      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Latest Posts</h2>
          {loading && <p className="has-text-centered">Loading posts...</p>}
          {error && <p className="has-text-danger has-text-centered">Error loading posts!</p>}
          <div className="columns is-multiline">
            {data?.posts.map((post) => (
              <div key={post.id} className="column is-4">
                <div className="box">
                  <h3 className="title is-5">{post.title}</h3>
                  <p>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "10px" }}
                    />
                  )}
                  <p className="has-text-grey mt-2">By {post.author.username}</p>
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