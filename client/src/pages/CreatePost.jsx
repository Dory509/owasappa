import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/postMutations";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a post!");
      navigate("/login");
      return;
    }
  
    try {
      await createPost({
        variables: {
          title: formData.title,
          content: formData.content,
          image: formData.image || "",
        },
      });
  
      alert("Post created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post. Please try again!");
    }
  };
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Create a Post</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="content" placeholder="Write your story here..." onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL (optional)" onChange={handleChange} />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;