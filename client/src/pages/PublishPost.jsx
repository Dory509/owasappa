import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { PUBLISH_POST } from "../graphql/postMutations";

const PublishPost = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [publishPost] = useMutation(PUBLISH_POST);

  const handlePublish = async () => {
    try {
      await pub
      lishPost({ variables: { postId: state.postId } });
      navigate("/");
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="box has-background-white p-6" style={{ maxWidth: "600px", margin: "auto" }}>
          <h1 className="title has-text-centered">📢 Review Your Post</h1>

          <div className="box">
            <h2 className="subtitle">{state?.title}</h2>
            <p>{state?.content}</p>
            {state?.image && <img src={state.image} alt="Post" className="image mt-3" />}
          </div>

          <div className="buttons is-centered">
            <button className="button is-warning" onClick={() => navigate("/create")}>
              ✏️ Edit Post
            </button>
            <button className="button is-success" onClick={handlePublish}>
              🚀 Publish Post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublishPost;