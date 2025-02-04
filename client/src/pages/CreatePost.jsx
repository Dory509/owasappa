import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/postMutations";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ variables: formData });
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="box has-background-white p-6"
            style={{
              maxWidth: "600px",
              margin: "auto",
              borderRadius: "12px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
            }}>
            
            {/* Header */}
            <h1 className="title has-text-centered" style={{ color: "#222", fontWeight: "bold" }}>
               Create a New Post
            </h1>

            {error && <p className="has-text-danger">{error.message}</p>}

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="field">
                <label className="label" style={{ color: "#444", fontSize: "1rem" }}>
                  Title
                </label>
                <div className="control">
                  <input
                    className="input is-rounded"
                    name="title"
                    type="text"
                    placeholder="Enter post title"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#ccc",
                      color: "#333",
                      fontSize: "1rem"
                    }}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Content */}
              <div className="field">
                <label className="label" style={{ color: "#444", fontSize: "1rem" }}>
                  Content
                </label>
                <div className="control">
                  <textarea
                    className="textarea is-rounded"
                    name="content"
                    placeholder="Write your story here..."
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#ccc",
                      color: "#333",
                      fontSize: "1rem"
                    }}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="field">
                <label className="label" style={{ color: "#444", fontSize: "1rem" }}>
                  Image URL (Optional)
                </label>
                <div className="control">
                  <input
                    className="input is-rounded"
                    name="image"
                    type="text"
                    placeholder="Paste an image URL (optional)"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#ccc",
                      color: "#333",
                      fontSize: "1rem"
                    }}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="field has-text-centered">
                <button
                  className="button is-primary is-rounded"
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition: "0.3s",
                    backgroundColor: "#3273dc",
                    borderColor: "#3273dc"
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#276cda")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#3273dc")}
                >
                  {loading ? "Posting..." : " Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;