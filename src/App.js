import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layout/DashboardLayout';
import AIAssistantPage from './pages/AIAssistantPage';
import ShippingPage from './pages/ShippingPage';
import TrendPage from './pages/TrendPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="trend" element={<TrendPage />} />
          <Route index element={<AIAssistantPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
