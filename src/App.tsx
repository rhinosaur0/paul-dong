import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CanvasNavigator from "./pages/Canvas";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/canvas" element={<CanvasNavigator />} />
  </Routes>
);

export default App;