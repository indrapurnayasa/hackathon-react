// // src/App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DashboardLayout from "./layout/DashboardLayout";
// import TrendPage from "./pages/TrendPage";
// import ShippingPage from "./pages/ShippingPage";
// import AIAssistantPage from "./pages/AIAssistantPage";
// import SplashScreen from "./components/SplashScreen";
// import "./App.css";

// function App() {
//   const [showSplashScreen, setShowSplashScreen] = useState(true);

//   // Function to handle splash screen completion
//   const handleSplashComplete = () => {
//     setShowSplashScreen(false);
//   };

//   return (
//     <Router>
//       <div className="App">
//         {/* Render SplashScreen INSIDE Router context */}
//         {showSplashScreen ? (
//           <SplashScreen onContinue={handleSplashComplete} />
//         ) : (
//           <Routes>
//             {/* Dashboard routes with layout */}
//             <Route path="/dashboard" element={<DashboardLayout />}>
//               <Route index element={<AIAssistantPage />} />
//               <Route path="ai-assistant" element={<AIAssistantPage />} />
//               <Route path="trend" element={<TrendPage />} />
//               <Route path="shipping" element={<ShippingPage />} />
//             </Route>

//             {/* Root redirect to dashboard */}
//             <Route path="/" element={<DashboardLayout />}>
//               <Route index element={<AIAssistantPage />} />
//             </Route>
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import TrendPage from "./pages/TrendPage";
import ShippingPage from "./pages/ShippingPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import SplashScreen from "./components/SplashScreen";
import PersonalizationModal from "./components/PersonalizationModal";
import "./App.css";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);

  // Function to handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplashScreen(false);
    // Auto-show personalization modal after splash screen
    setTimeout(() => {
      setShowPersonalizationModal(true);
    }, 500);
  };

  // Function to handle personalization modal close
  const handleModalClose = () => {
    setShowPersonalizationModal(false);
  };

  return (
    <Router>
      {/* Render SplashScreen INSIDE Router context */}
      {showSplashScreen ? (
        <SplashScreen onContinue={handleSplashComplete} />
      ) : (
        <>
          <Routes>
            {/* Dashboard routes with layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="ai-assistant" element={<AIAssistantPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="trend" element={<TrendPage />} />
            </Route>
            {/* Root redirect to dashboard */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<AIAssistantPage />} />
            </Route>
          </Routes>
          
          {/* Personalization Modal */}
          <PersonalizationModal
            isOpen={showPersonalizationModal}
            onClose={handleModalClose}
          />
        </>
      )}
    </Router>
  );
}

export default App;
