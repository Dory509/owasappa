import React from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/postMutations"; 

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Latest Published Stories</h2>
          {loading && <p className="has-text-centered">Loading posts...</p>}
          {error && <p className="has-text-danger has-text-centered">Error loading posts!</p>}
          <div className="columns is-multiline">
            {data?.posts
              .filter((post) => post.published)  // Only show published posts
              .map((post) => (
                <div key={post.id} className="column is-4">
                  <div className="box">
                    <h3 className="title is-5">{post.title}</h3>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" style={{ maxWidth: "100%" }} />}
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