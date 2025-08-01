import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layout/DashboardLayout";
import AIAssistantPage from "./pages/AIAssistantPage";
import ShippingPage from "./pages/ShippingPage";
import TrendPage from "./pages/TrendPage";
import IntegratedLandingPage from "./components/IntegratedLandingPage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginRequiredModal from "./components/LoginRequiredModal";
import "./styles/AdvancedSplashScreen.css";
import PropTypes from "prop-types";

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setShowModal(true);
      setIsAuthenticated(false);
    } else {
      setShowModal(false);
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/dashboard/trend", { replace: true });
  };
  const handleLogin = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  if (!isAuthenticated) {
    return (
      <>
        {children}
        {/* Full-screen blur overlay */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            zIndex: 9998,
            pointerEvents: "auto",
          }}
        />
        {showModal && (
          <LoginRequiredModal
            onLogin={handleLogin}
            onClose={handleCloseModal}
          />
        )}
      </>
    );
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntegratedLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<IntegratedLandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            path="ai-assistant"
            element={
              <RequireAuth>
                <AIAssistantPage />
              </RequireAuth>
            }
          />
          <Route
            path="shipping"
            element={
              <RequireAuth>
                <ShippingPage />
              </RequireAuth>
            }
          />
          <Route path="trend" element={<TrendPage />} />
          <Route index element={<AIAssistantPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
