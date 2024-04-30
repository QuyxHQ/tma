import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../src/Pages/Welcome";
import Claimpage from "../src/Pages/Claim";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Claimpage" element={<Claimpage />} />

        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
