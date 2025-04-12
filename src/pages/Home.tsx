import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Click <Link to="/canvas">Here</Link> to view my portfolio!</h1>
    
  </div>
);

export default Home;