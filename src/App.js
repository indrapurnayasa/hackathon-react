// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import TrendPage from "./pages/TrendPage";
import ShippingPage from "./pages/ShippingPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // Function to handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplashScreen(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Render SplashScreen INSIDE Router context */}
        {showSplashScreen ? (
          <SplashScreen onContinue={handleSplashComplete} />
        ) : (
          <Routes>
            {/* Dashboard routes with layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<AIAssistantPage />} />
              <Route path="ai-assistant" element={<AIAssistantPage />} />
              <Route path="trend" element={<TrendPage />} />
              <Route path="shipping" element={<ShippingPage />} />
            </Route>

            {/* Root redirect to dashboard */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<AIAssistantPage />} />
            </Route>
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
