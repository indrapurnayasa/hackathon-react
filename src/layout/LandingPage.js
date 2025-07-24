import React, { useEffect, useState } from "react";
import GlobeMap from "./GlobeMap";
import { useNavigate } from "react-router-dom";

// Import image files for features carousel
// NOTE: Replace these with your actual PNG/JPG images
// Place your images in src/assets/ folder with these names:
// - conversational-ai-1.png, conversational-ai-2.png, conversational-ai-3.png, conversational-ai-4.png, conversational-ai-5.png
// - smart-shipping-1.png, smart-shipping-2.png, smart-shipping-3.png, smart-shipping-4.png, smart-shipping-5.png
// - market-trends-1.png, market-trends-2.png, market-trends-3.png, market-trends-4.png, market-trends-5.png
import Fitur1 from '../assets/Fitur1.gif'; // Replace with conversational-ai-1.png
import Fitur2 from '../assets/Fitur2.gif'; // Replace with smart-shipping-1.png
import Fitur3 from '../assets/Fitur3.gif'; // Replace with market-trends-1.png

// Background Images for Sections
// NOTE: Add these background images to src/assets/images/ folder:
// - ai-background.jpg (for Conversational AI section)
// - shipping-background.jpg (for Smart Shipping section) 
// - analytics-background.jpg (for Market Trends section)
// You can use high-quality images from Unsplash or similar sources:
// - AI/Technology themed image for conversational-ai
// - Ship/Ocean/Port themed image for smart-shipping
// - Charts/Analytics/Business themed image for market-trends

const sections = [
  { id: "hero", name: "About", shortName: "About" },
  { id: "conversational-ai", name: "Conversational AI", shortName: "AI Chat" },
  { id: "smart-shipping", name: "Smart Shipping", shortName: "Shipping" },
  { id: "market-trends", name: "Market Analytics", shortName: "Analytics" },
];

// Enhanced Carousel Component with Bullet Navigation
const ImageCarousel = ({ images, height = "400px" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div style={{ position: "relative", width: "100%", height, overflow: "hidden", borderRadius: "16px" }}>
      {/* Main Image */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 0.5s ease-in-out",
        }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(0,0,0,0.8)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(0,0,0,0.5)"}
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(0,0,0,0.8)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(0,0,0,0.5)"}
      >
        ›
      </button>

      {/* Bullet Navigation Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 10,
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "2px solid white",
              background: index === currentIndex ? "white" : "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Ship Component for Montfort-style ship section
const ShipComponent = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ocean waves effect */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to top, rgba(59, 130, 246, 0.8), rgba(30, 58, 138, 0.4))",
          borderRadius: "0 0 16px 16px",
        }}
      />
      
      {/* Ship silhouette */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "white",
          textAlign: "center",
          opacity: 0.9,
        }}
      >
        <svg
          width="200"
          height="120"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ship hull */}
          <path
            d="M20 80 L180 80 L170 100 L30 100 Z"
            fill="rgba(255, 255, 255, 0.8)"
          />
          {/* Ship deck */}
          <rect x="40" y="60" width="120" height="20" fill="rgba(255, 255, 255, 0.9)" />
          {/* Ship mast */}
          <rect x="99" y="20" width="2" height="60" fill="rgba(255, 255, 255, 0.8)" />
          {/* Containers */}
          <rect x="50" y="50" width="20" height="10" fill="rgba(239, 68, 68, 0.8)" />
          <rect x="75" y="50" width="20" height="10" fill="rgba(34, 197, 94, 0.8)" />
          <rect x="100" y="50" width="20" height="10" fill="rgba(59, 130, 246, 0.8)" />
          <rect x="125" y="50" width="20" height="10" fill="rgba(251, 191, 36, 0.8)" />
        </svg>
        
        <div style={{ marginTop: "20px", fontSize: "16px", fontWeight: "500" }}>
          Global Shipping Network
        </div>
      </div>
      
      {/* Floating animation for containers */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        svg rect:nth-child(3) { animation: float 3s ease-in-out infinite; }
        svg rect:nth-child(4) { animation: float 3s ease-in-out infinite 0.5s; }
        svg rect:nth-child(5) { animation: float 3s ease-in-out infinite 1s; }
        svg rect:nth-child(6) { animation: float 3s ease-in-out infinite 1.5s; }
      `}</style>
    </div>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Scroll and globe visibility states
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // Loading states - simplified without fade
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading animation - Handle Get Started with direct loading then buffer before LoginPage
  const handleGetStarted = () => {
    setIsLoadingAnimation(true);
    setLoadingProgress(0);
  };

  // Loading animation effect - Direct navigation without fade transition
  useEffect(() => {
    if (isLoadingAnimation) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Direct navigation without fade animation
            setTimeout(() => {
              navigate('/dashboard/trend');
            }, 100);
            return 100;
          }
          const increment = Math.random() * 15 + 5;
          return Math.min(prev + increment, 100);
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoadingAnimation, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Carousel images for each feature
  const conversationalAIImages = [Fitur1, Fitur1, Fitur1, Fitur1, Fitur1];
  const smartShippingImages = [Fitur2, Fitur2, Fitur2, Fitur2, Fitur2];
  const marketTrendsImages = [Fitur3, Fitur3, Fitur3, Fitur3, Fitur3];


  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        backgroundColor: "#ffffff",
        overflowX: "hidden",
        color: "#2c2c2c",
      }}
    >
      {/* Header - Fixed at top, stays when scrolling */}
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          height: "80px",
          width: "100%",
          margin: 0,
          padding: "0 40px",
          zIndex: 1000, // Higher than globe to stay on top
          backgroundColor: scrollY > 50 ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          letterSpacing: "-0.01em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px" }}>
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                fill="#1a1a1a"
              />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",
              letterSpacing: "-0.02em",
              fontSize: "24px",
              color: "#1a1a1a",
              margin: 0,
              padding: 0,
            }}
          >
            ExportIn
          </h1>
        </div>

        {/* Navigation Menu - Montfort Style */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: "15px",
                fontWeight: "400",
                color: "#1a1a1a",
                textDecoration: "none",
                fontFamily: '"Inter", sans-serif',
                letterSpacing: "-0.01em",
                transition: "all 0.3s ease",
                padding: "8px 0",
                borderBottom: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#2563eb";
                e.target.style.borderBottom = "2px solid #2563eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#1a1a1a";
                e.target.style.borderBottom = "2px solid transparent";
              }}
            >
              {section.name}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <div style={{ paddingTop: "0" }}>
        {/* Hero Section - First Section with Globe */}
        <section
          id="hero"
          style={{
            position: "relative",
            height: "100vh",
            width: "100%",
            margin: 0,
            padding: "80px 0 0 0", // Add top padding for fixed header
            backgroundColor: "#f8fafc",
            overflow: "hidden", // Ensure globe cannot escape section bounds
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* Globe - Contained within section 1 only */}
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "-10%",
              width: "60%", 
              height: "100%",
              zIndex: 5,
              pointerEvents: "auto",
              overflow: "hidden", // Ensure globe stays within section bounds
            }}
          >
            <GlobeMap />
          </div>

          {/* Content Container - Left side with lower z-index */}
          <div
            style={{
              position: "relative",
              zIndex: 10, // Lower z-index so globe appears above
              width: "50%",
              padding: "0 40px 0 40px",
              display: "flex",
              alignItems: "center",
              minHeight: "100vh",
              background: "linear-gradient(90deg, rgba(248, 250, 252, 0.9) 0%, rgba(248, 250, 252, 0.7) 40%, rgba(248, 250, 252, 0.2) 70%, transparent 100%)",
            }}
          >
            <div style={{ width: "100%", maxWidth: "500px" }}>
              {/* Subtitle */}
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "500",
                  letterSpacing: "0.05em",
                  fontSize: "14px",
                  color: "#2563eb",
                  margin: "0 0 24px 0",
                  textTransform: "uppercase",
                }}
              >
                AI-Powered Export Platform
              </p>

              <h1
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "700",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.1",
                  fontSize: "clamp(36px, 4vw, 56px)",
                  color: "#1a1a1a",
                  margin: "0 0 32px 0",
                  padding: 0,
                }}
              >
                ExportIn is a global export intelligence platform
              </h1>

              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "400",
                  letterSpacing: "-0.01em",
                  lineHeight: "1.7",
                  fontSize: "18px",
                  color: "#64748b",
                  margin: "0 0 40px 0",
                  padding: 0,
                }}
              >
                We democratize global trade through AI-powered solutions. Our platform integrates conversational AI, smart shipping logistics, and market trend analytics to create comprehensive export solutions for businesses worldwide.
              </p>

              {/* Buttons - Get Started only */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    background: "#1a1a1a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "50px",
                    padding: "16px 32px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onClick={handleGetStarted}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2563eb";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#1a1a1a";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              animation: "bounce 2s infinite",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontFamily: '"Inter", sans-serif',
                fontWeight: "400",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Scroll to discover
            </span>
            <div
              style={{
                width: "1px",
                height: "20px",
                background: "#64748b",
                opacity: 0.5,
              }}
            />
          </div>
        </section>

        {/* Features Overview Section - With GIFs */}
        <section id="features"
          style={{
            width: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: "120px 40px",
            backgroundColor: "#ffffff",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", width: "100%", textAlign: "center" }}>
            {/* Section Header */}
            <div style={{ marginBottom: "80px" }}>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "500",
                  letterSpacing: "0.05em",
                  fontSize: "14px",
                  color: "#2563eb",
                  margin: "0 0 16px 0",
                  textTransform: "uppercase",
                }}
              >
                Our Solutions
              </p>
              
              <h2
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "700",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  color: "#1a1a1a",
                  margin: "0 0 24px 0",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                }}
              >
                Our AI-Powered Export Solutions
              </h2>

              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "400",
                  fontSize: "18px",
                  color: "#64748b",
                  margin: "0 auto",
                  lineHeight: "1.7",
                  maxWidth: "600px",
                }}
              >
                Comprehensive platform that integrates intelligent automation with global trade expertise to deliver end-to-end export solutions.
              </p>
            </div>

            {/* Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "40px",
                alignItems: "start",
              }}
            >
              {/* Conversational AI */}
              <div
                style={{
                  padding: "0",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  textAlign: "left",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* GIF Background */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${Fitur1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "16px 16px 0 0",
                  }}
                />

                {/* Content */}
                <div style={{ padding: "32px" }}>
                  {/* Feature Icon */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#2563eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <span style={{ fontSize: "24px", color: "white" }}>🤖</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#1a1a1a",
                      margin: "0 0 16px 0",
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Conversational AI
                  </h3>
                  
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#64748b",
                      margin: 0,
                      lineHeight: "1.6",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    AI-powered chat assistant that provides 24/7 export guidance, document generation, and cost calculations with real-time regulatory compliance.
                  </p>
                </div>
              </div>

              {/* Smart Shipping */}
              <div
                style={{
                  padding: "0",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  textAlign: "left",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* GIF Background */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${Fitur2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "16px 16px 0 0",
                  }}
                />

                {/* Content */}
                <div style={{ padding: "32px" }}>
                  {/* Feature Icon */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#2563eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <span style={{ fontSize: "24px", color: "white" }}>🚢</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#1a1a1a",
                      margin: "0 0 16px 0",
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Smart Shipping
                  </h3>
                  
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#64748b",
                      margin: 0,
                      lineHeight: "1.6",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Interactive globe-based shipping solution with real-time cost estimation, route optimization, and comprehensive logistics management.
                  </p>
                </div>
              </div>

              {/* Market Trend Analytics */}
              <div
                style={{
                  padding: "0",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  textAlign: "left",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* GIF Background */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${Fitur3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "16px 16px 0 0",
                  }}
                />

                {/* Content */}
                <div style={{ padding: "32px" }}>
                  {/* Feature Icon */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#2563eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <span style={{ fontSize: "24px", color: "white" }}>📊</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#1a1a1a",
                      margin: "0 0 16px 0",
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Market Trend Analytics
                  </h3>
                  
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#64748b",
                      margin: 0,
                      lineHeight: "1.6",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Comprehensive market analysis dashboard with seasonal trends and country demand insights for strategic export planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversational AI Section - With Background Image */}
        <section id="conversational-ai"
          style={{
            width: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundImage: "url('/src/assets/images/ai-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark Overlay for Text Visibility */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 1,
            }}
          />

          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
              zIndex: 2,
            }}
          />

          <div style={{ maxWidth: "1200px", width: "100%", padding: "0 40px", position: "relative", zIndex: 10 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              {/* Content */}
              <div>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "500",
                    letterSpacing: "0.05em",
                    fontSize: "14px",
                    color: "#3b82f6",
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                  }}
                >
                  AI Assistant
                </p>

                <h2
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "700",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    color: "#ffffff",
                    margin: "0 0 24px 0",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                  }}
                >
                  Conversational AI Assistant
                </h2>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "#3b82f6",
                    margin: "0 0 24px 0",
                    lineHeight: "1.4",
                    fontStyle: "italic",
                  }}
                >
                  "Your intelligent export companion that never sleeps, delivering instant solutions around the clock."
                </p>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#e2e8f0",
                    margin: "0 0 40px 0",
                    lineHeight: "1.7",
                  }}
                >
                  Rasakan pengalaman ekspor yang revolusioner dengan AI Assistant yang memahami kompleksitas bisnis Anda. Platform ini mengintegrasikan kecerdasan buatan terdepan dengan database regulasi ekspor yang real-time.
                </p>

                <button
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    background: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "50px",
                    padding: "16px 32px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onClick={handleGetStarted}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2563eb";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#3b82f6";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Try AI Assistant
                </button>
              </div>

              {/* Carousel */}
              <div style={{ position: "relative" }}>
                <ImageCarousel images={conversationalAIImages} height="500px" />
              </div>
            </div>
          </div>
        </section>

        {/* Smart Shipping Section with Ship Component & Background Image */}
        <section id="smart-shipping"
          style={{
            width: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundImage: "url('/src/assets/images/shipping-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark Overlay for Text Visibility */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          />

          <div style={{ maxWidth: "1200px", width: "100%", padding: "0 40px", position: "relative", zIndex: 10 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              {/* Ship Component - Montfort Style */}
              <div style={{ position: "relative" }}>
                <ShipComponent />
              </div>

              {/* Content */}
              <div>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "500",
                    letterSpacing: "0.05em",
                    fontSize: "14px",
                    color: "#3b82f6",
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Smart Logistics
                </p>

                <h2
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "700",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    color: "#ffffff",
                    margin: "0 0 24px 0",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                  }}
                >
                  Smart Shipping Solutions
                </h2>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "#3b82f6",
                    margin: "0 0 24px 0",
                    lineHeight: "1.4",
                    fontStyle: "italic",
                  }}
                >
                  "Navigate global markets with precision - your interactive gateway to worldwide shipping excellence."
                </p>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#e2e8f0",
                    margin: "0 0 40px 0",
                    lineHeight: "1.7",
                  }}
                >
                  Jelajahi dunia ekspor melalui pengalaman visual yang menakjubkan dengan Smart Shipping berbasis globe interaktif. Teknologi revolusioner ini mentransformasi kompleksitas logistik global menjadi interface yang intuitif dan mudah dipahami.
                </p>

                <button
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    background: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "50px",
                    padding: "16px 32px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onClick={() => navigate('/dashboard/shipping')}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2563eb";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#3b82f6";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Explore Shipping
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Trends Section - With Background Image & Overlay */}
        <section id="market-trends"
          style={{
            width: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundImage: "url('/src/assets/images/analytics-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark Overlay for Text Visibility */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 1,
            }}
          />

          <div style={{ maxWidth: "1200px", width: "100%", padding: "0 40px", position: "relative", zIndex: 10 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              {/* Content */}
              <div>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "500",
                    letterSpacing: "0.05em",
                    fontSize: "14px",
                    color: "#3b82f6",
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Market Intelligence
                </p>

                <h2
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "700",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    color: "#ffffff",
                    margin: "0 0 24px 0",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                  }}
                >
                  Market Trend Analysis
                </h2>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "#3b82f6",
                    margin: "0 0 24px 0",
                    lineHeight: "1.4",
                    fontStyle: "italic",
                  }}
                >
                  "Unlock tomorrow's opportunities today - where data meets strategic foresight for export success."
                </p>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#e2e8f0",
                    margin: "0 0 40px 0",
                    lineHeight: "1.7",
                  }}
                >
                  Temukan kekuatan analisis prediktif melalui dashboard Market Trend Analysis yang menggabungkan kecerdasan buatan dengan big data dari sumber terpercaya. Platform ini mentransformasi data kompleks menjadi insight strategis yang actionable.
                </p>

                <button
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    background: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "50px",
                    padding: "16px 32px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onClick={() => navigate('/dashboard/trend')}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2563eb";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#3b82f6";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  View Analytics
                </button>
              </div>

              {/* Carousel */}
              <div style={{ position: "relative" }}>
                <ImageCarousel images={marketTrendsImages} height="500px" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer/Closing Section */}
        <footer
          style={{
            width: "100%",
            padding: "80px 40px 40px",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)
              `,
              zIndex: 0,
            }}
          />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Main Footer Content */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: "60px",
                marginBottom: "60px",
              }}
            >
              {/* Company Info */}
              <div>
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ width: "40px", height: "40px", backgroundColor: "#10b981", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "16px" }}>
                      <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600" }}>⚡</span>
                    </div>
                    <h2
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: "600",
                        fontSize: "24px",
                        color: "#ffffff",
                        margin: 0,
                      }}
                    >
                      ExportIn
                    </h2>
                  </div>
                  
                  <p
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "16px",
                      color: "#cbd5e1",
                      margin: "0 0 24px 0",
                      lineHeight: "1.6",
                    }}
                  >
                    Democratizing global trade through AI-powered solutions. Join thousands of exporters who trust ExportIn for their international business growth.
                  </p>

                  <div style={{ display: "flex", gap: "16px" }}>
                    <a
                      href="#"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontSize: "20px" }}>📱</span>
                    </a>
                    <a
                      href="#"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontSize: "20px" }}>💼</span>
                    </a>
                    <a
                      href="#"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontSize: "20px" }}>🌐</span>
                    </a>
                  </div>
                </div>

              {/* Platform Links */}
              <div>
                <h3
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#ffffff",
                    margin: "0 0 24px 0",
                  }}
                >
                  Platform
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { name: "AI Assistant", href: "#" },
                    { name: "Smart Shipping", href: "#" },
                    { name: "Market Analytics", href: "#" },
                    { name: "Documentation", href: "#" },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "14px",
                        color: "#cbd5e1",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Links */}
              <div>
                <h3
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#ffffff",
                    margin: "0 0 24px 0",
                  }}
                >
                  Company
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { name: "About Us", href: "#" },
                    { name: "Careers", href: "#" },
                    { name: "Press", href: "#" },
                    { name: "Partners", href: "#" },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "14px",
                        color: "#cbd5e1",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Support Links */}
              <div>
                <h3
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#ffffff",
                    margin: "0 0 24px 0",
                  }}
                >
                  Support
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { name: "Help Center", href: "#" },
                    { name: "Contact Us", href: "#" },
                    { name: "Privacy Policy", href: "#" },
                    { name: "Terms of Service", href: "#" },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "14px",
                        color: "#cbd5e1",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div
              style={{
                borderTop: "1px solid rgba(59, 130, 246, 0.2)",
                paddingTop: "40px",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <h3
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "600",
                  fontSize: "24px",
                  color: "#ffffff",
                  margin: "0 0 16px 0",
                }}
              >
                Ready to Transform Your Export Business?
              </h3>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "16px",
                  color: "#cbd5e1",
                  margin: "0 0 32px 0",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Join thousands of exporters who use ExportIn to streamline their operations and expand globally.
              </p>
              <button
                style={{
                  fontFamily: '"Inter", sans-serif',
                  background: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "50px",
                  padding: "16px 32px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "-0.01em",
                }}
                onClick={() => navigate('/dashboard/trend')}
              >
                Get Started Today
              </button>
            </div>

            {/* Bottom Copyright */}
            <div
              style={{
                borderTop: "1px solid rgba(59, 130, 246, 0.2)",
                paddingTop: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "14px",
                  color: "#64748b",
                  margin: 0,
                }}
              >
                © 2024 ExportIn. All rights reserved.
              </p>
              <div style={{ display: "flex", gap: "24px" }}>
                <a href="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: "14px", color: "#64748b", textDecoration: "none" }}>Privacy</a>
                <a href="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: "14px", color: "#64748b", textDecoration: "none" }}>Terms</a>
                <a href="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: "14px", color: "#64748b", textDecoration: "none" }}>Cookies</a>
              </div>
            </div>
          </div>
        </div>
        </footer>

        {/* Loading Animation Overlay - Properly centered */}
        {isLoadingAnimation && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0", 
              bottom: "0",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            }}
          >
            <div className="text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-light">⚡</span>
                </div>
                <h1 className="text-4xl font-light text-gray-900">ExportIn</h1>
              </div>

              {/* Loading Progress */}
              <div className="w-80 bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              
              <p className="text-gray-600 font-light">
                {loadingProgress < 50 ? 'Initializing...' : 
                 loadingProgress < 80 ? 'Loading your AI Assistant...' : 
                 'Almost ready...'}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        html, body {
          scroll-behavior: smooth;
        }
        
        /* Header - Fixed positioning */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 1000 !important;
          transform: translate3d(0, 0, 0) !important;
          contain: layout style paint !important;
        }
        
        /* Globe container - normal positioning within section 1 */
        .globe-container {
          /* No special CSS needed - use inline styles only */
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-10px,0);
          }
          70% {
            transform: translate3d(0,-5px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;