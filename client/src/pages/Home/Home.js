import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <p>
        Welcome to Blog App, Please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Home;
