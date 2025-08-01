import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Globe from "react-globe.gl";
import LandingPage from "../layout/LandingPage";

const GEOJSON_URL = "/countries.geojson";

const IntegratedLandingPage = () => {
  // Check if user has seen splash screen before
  const hasSeenSplash = localStorage.getItem("hasSeenSplash");
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Globe states
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [dimensions] = useState({ width: 200, height: 200 });
  const [isGlobeLoading, setIsGlobeLoading] = useState(true);
  const [globeError, setGlobeError] = useState(null);

  // Function to reset splash screen (for testing purposes)
  const resetSplashScreen = () => {
    localStorage.removeItem("hasSeenSplash");
    setShowSplash(true);
    setLoadingProgress(0);
  };

  useEffect(() => {
    // Only show splash screen if user hasn't seen it before
    if (!hasSeenSplash) {
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
    }
  }, [hasSeenSplash]);

  useEffect(() => {
    if (loadingProgress >= 100) {
      // Start exit animation immediately after 100%
      // Call onFinish after exit animation completes
      setTimeout(() => {
        setShowSplash(false);
        // Mark that user has seen splash screen
        localStorage.setItem("hasSeenSplash", "true");
      }, 800); // Reduced duration for faster fadeout
    }
  }, [loadingProgress]);

  // Load GeoJSON data for globe
  useEffect(() => {
    let isMounted = true;

    const loadGeoData = async () => {
      try {
        setIsGlobeLoading(true);
        setGlobeError(null);

        const response = await fetch(GEOJSON_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (!data || !Array.isArray(data.features)) {
          throw new Error("Invalid GeoJSON structure");
        }

        if (isMounted) {
          setCountries(data);
          setIsGlobeLoading(false);
        }
      } catch (error) {
        console.error("Error loading GeoJSON data:", error);
        if (isMounted) {
          setGlobeError(error.message);
          setIsGlobeLoading(false);
          setCountries({ features: [] });
        }
      }
    };

    loadGeoData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Setup globe controls - Static view without zoom animation
  useEffect(() => {
    if (!isGlobeLoading && globeEl.current && countries.features.length > 0) {
      const globe = globeEl.current;

      if (globe.controls) {
        // Disable all controls for static globe
        globe.controls().enableZoom = false;
        globe.controls().enablePan = false;
        globe.controls().enableRotate = false;
        globe.controls().autoRotate = false; // Disable auto rotation
        globe.controls().dampingFactor = 0.1;
        globe.controls().rotateSpeed = 0.6;
      }

      // Set static view to Indonesia without transition animation
      globe.pointOfView(
        {
          lat: -0.7893,
          lng: 113.9213,
          altitude: 1.5,
        },
        0 // No transition animation
      );
    }
  }, [isGlobeLoading, countries.features.length]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            className="splash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
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
                  duration: 0.8,
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
                    duration: 0.8,
                    ease: "easeInOut",
                  },
                }}
                transition={{ duration: 0.8 }}
              >
                <div className="buffering-logo">
                  {/* Globe dengan glow effect */}
                  <div className="globe-container">
                    {!isGlobeLoading && !globeError && (
                      <>
                        <Globe
                          ref={globeEl}
                          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                          backgroundColor="rgba(0,0,0,0)"
                          width={dimensions.width}
                          height={dimensions.height}
                          polygonsData={countries.features.filter(
                            (d) => d?.properties?.ISO_A2 !== "AQ"
                          )}
                          polygonCapColor="rgba(255, 255, 255, 0.3)"
                          polygonSideColor="rgba(255, 255, 255, 0.2)"
                          polygonStrokeColor="#ffffff"
                          polygonAltitude={0.01}
                          atmosphereColor="rgba(200,200,255,0.2)"
                          atmosphereAltitude={0.1}
                          polygonsTransitionDuration={200}
                          enablePointerInteraction={false}
                          rendererConfig={{
                            antialias: true,
                            alpha: true,
                            preserveDrawingBuffer: true,
                          }}
                        />
                        {/* Dark overlay untuk globe */}
                        <div className="globe-dark-overlay"></div>
                      </>
                    )}
                  </div>

                  {/* Percentage di depan globe dengan glow */}
                  <div className="percentage-container">
                    <div className="percentage-inside">{loadingProgress}%</div>
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
                    duration: 0.8,
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

      {/* Landing Page */}
      {!showSplash && <LandingPage />}
    </>
  );
};

export default IntegratedLandingPage;
