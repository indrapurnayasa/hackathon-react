// src/components/SplashScreen.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SplashScreen = ({ onContinue }) => {
  const [percentage, setPercentage] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start percentage animation
    const percentageInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(percentageInterval);
          // Show welcome text after percentage reaches 100%
          setTimeout(() => {
            setShowWelcome(true);
            // Start fade out after welcome text shows
            setTimeout(() => {
              setFadeOut(true);
              // Navigate to landing page after fade out
              setTimeout(() => {
                onContinue();
              }, 1000);
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Update every 30ms for smooth animation

    return () => clearInterval(percentageInterval);
  }, [onContinue]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily:
          "'Product Sans', 'Google Sans Text', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div className="text-center">
        {!showWelcome ? (
          // Percentage Animation
          <div className="animate-pulse">
            <div
              className="text-8xl font-bold text-white mb-4"
              style={{
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 700,
              }}
            >
              {percentage}%
            </div>
            <div
              className="text-xl text-white opacity-80"
              style={{
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400,
              }}
            >
              Loading...
            </div>
          </div>
        ) : (
          // Welcome Text Animation
          <div className="animate-fade-in">
            <div
              className="text-6xl font-bold text-white mb-4"
              style={{
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Welcome To ExportIn
            </div>
            <div
              className="text-lg text-white opacity-80"
              style={{
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400,
              }}
            >
              Your Export Management Platform
            </div>
          </div>
        )}
      </div>

      {/* Add custom CSS for animations */}
      <style>{`
         @keyframes fade-in {
           from {
             opacity: 0;
             transform: translateY(20px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         .animate-fade-in {
           animation: fade-in 0.8s ease-out;
         }
       `}</style>
    </div>
  );
};

SplashScreen.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

export default SplashScreen;
