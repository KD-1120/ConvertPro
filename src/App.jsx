import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "./App.css"; // Ensure this file exists

// Import Components
import NavBar from "./Components/Navbar.jsx"; // Check exact file name
import Home from "./Pages/Home.jsx";
import History from "./Pages/History.jsx";
import Conversions from "./Pages/Conversions.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  const navigationItems = [
    { label: "Home", url: "/" },
    { label: "Conversions", url: "/conversions" },
    { label: "History", url: "/history" },
  ];

  // Handle Upgrade Click
  const handleUpgradeClick = () => {
    console.log("Upgrade clicked", "info");
  };

  return (
    <BrowserRouter>
      <Container style={{ marginTop: "20px", width: "100vw" }}>
        <NavBar
          logoText="ConvertPro"
          navItems={navigationItems}
          onUpgradeClick={handleUpgradeClick}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/conversions" element={<Conversions/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
