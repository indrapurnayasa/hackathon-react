// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Dashboard from "./pages/Dashboard";
import AIAssistantPage from "./pages/AIAssistantPage";
import ShippingPage from "./pages/ShippingPage";
import TrendPage from "./pages/TrendPage";
import "./App.css"; // Updated App.css

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onContinue={handleSplashComplete} />
      ) : (
        <div className="animate-fadeIn">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/ai-assistant" replace />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="ai-assistant" replace />} />
              <Route path="ai-assistant" element={<AIAssistantPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="trend" element={<TrendPage />} />
            </Route>
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
