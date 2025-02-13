import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/authMutations";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: formData });
      localStorage.setItem("token", data.login.token);
      navigate("/create"); 
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="box has-background-white p-6"
            style={{
              maxWidth: "400px",
              margin: "auto",
              borderRadius: "12px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
            }}>

            {/* Header */}
            <h1 className="title has-text-centered" style={{ color: "#222", fontWeight: "bold" }}>
              🔐 Login to OWASAPA
            </h1>

            {error && <p className="has-text-danger has-text-centered">Invalid credentials</p>}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input is-rounded"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input is-rounded"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <div className="field has-text-centered">
                <button
                  className="button is-primary is-rounded"
                  type="submit"
                  disabled={loading}
                  style={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold" }}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;



// import { Link } from "react-router-dom";
// import { useQuery,  useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../graphql/authMutations";

// const Home = () => {
//   const [login, { error,loading, data }] = useMutation(LOGIN_USER);






//   return (
//     <>
//       {/* Hero Section */}
//       <section className="hero is-fullheight is-primary">
//         <div className="hero-body">
//           <div className="container has-text-centered">
//             <h1 className="title is-1 has-text-white">
//               Welcome to <span className="has-text-warning">OWASAPA</span>
//             </h1>
//             <h2 className="subtitle is-3 has-text-light">
//               "Oops! I Wrote Another Story and Posted a Picture Again!"
//             </h2>
//             <img
//               src="/owasapa-logo.png"
//               alt="OWASAPA Logo"
//               className="mt-3"
//               style={{
//                 width: "350px",
//                 height: "auto",
//                 borderRadius: "10px",
//                 boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
//               }}
//             />
//             <p className="is-size-5 mt-4 has-text-white">
//               Share your stories & pictures in a fun and creative way!
//             </p>

//             {/* Login / Register Buttons */}
//             <div className="buttons mt-5">
//               <Link to="/login" className="button is-warning is-medium">
//                 Login
//               </Link>
//               <Link to="/register" className="button is-light is-medium">
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Latest Posts Section */}
//       <section className="section">
//         <div className="container">
//           <h2 className="title has-text-centered has-text-primary">
//             Latest Stories from the Community
//           </h2>
//           {loading && <p className="has-text-centered">Loading posts...</p>}
//           {error && (
//             <p className="has-text-danger has-text-centered">
//               Error loading posts!
//             </p>
//           )}
//           <div className="columns is-multiline">
//             {data?.posts.map((post) => (
//               <div key={post.id} className="column is-4">
//                 <div className="box">
//                   <h3 className="title is-5">{post.title}</h3>
//                   <p className="has-text-grey">{post.content}</p>
//                   {post.image && (
//                     <img
//                       src={post.image}
//                       alt="Post"
//                       className="mt-3"
//                       style={{
//                         maxWidth: "100%",
//                         borderRadius: "10px",
//                         boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//                       }}
//                     />
//                   )}
//                   <p className="has-text-grey mt-2">
//                     <strong>By {post.author.username}</strong>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;