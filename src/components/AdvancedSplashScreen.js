import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const AdvancedSplashScreen = ({ onFinish }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (loadingProgress >= 100) {
      // Start exit animation after 500ms
      setTimeout(() => {
        setIsExiting(true);
        // Call onFinish after exit animation completes
        setTimeout(onFinish, 2000); // Increased duration for smoother transition
      }, 500);
    }
  }, [loadingProgress, onFinish]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 2,
              ease: "easeInOut",
            },
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background */}
          <motion.div
            className="animated-background"
            exit={{
              opacity: 0,
              transition: {
                duration: 2,
                ease: "easeInOut",
              },
            }}
          >
            <div className="background-layer layer-1"></div>
            <div className="background-layer layer-2"></div>
            <div className="background-layer layer-3"></div>
          </motion.div>

          {/* Main Content Container */}
          <div className="splash-content">
            {/* Logo dan Percentage Container */}
            <motion.div
              className="logo-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 0.9,
                opacity: 0,
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="buffering-logo">
                <div className="logo-circle">
                  <div className="logo-inner">
                    <div className="percentage-inside">{loadingProgress}%</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* P1ONEERS Label - Hanya P1ONEERS */}
            <motion.div
              className="pioneers-label"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 20,
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="pioneers-badge">
                <span className="pioneers-text">P1ONEERS</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AdvancedSplashScreen.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default AdvancedSplashScreen;
