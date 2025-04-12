import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Welcome to the React Flow Canvas</h1>
    <Link to="/canvas">Go to Canvas</Link>
  </div>
);

export default Home;