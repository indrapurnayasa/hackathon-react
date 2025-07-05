// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import DashboardLayout from "./layout/DashboardLayout.js";
import AIAssistantPage from "./pages/AIAssistantPage";
import ShippingPage from "./pages/ShippingPage";
import TrendPage from "./pages/TrendPage";
import CustomCursor from "./components/CustomCursor";
import "./App.css";
import "./styles/cursor.css"; // Import cursor styles

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      {/* Custom Cursor Component - Global untuk seluruh aplikasi */}
      <CustomCursor />
      
      <Router>
        {showSplash ? (
          <SplashScreen onContinue={handleSplashComplete} />
        ) : (
          <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="ai-assistant" element={<AIAssistantPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="trend" element={<TrendPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard/ai-assistant" />} />
            <Route path="*" element={<Navigate to="/dashboard/ai-assistant" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
