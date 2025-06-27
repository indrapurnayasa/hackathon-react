import React, { useState, useEffect, useRef } from "react";
import GlobeMap from "./GlobeMap";

const ExportCo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sections = [
    { id: "hero", name: "About", shortName: "About" },
    { id: "statistics", name: "Performance", shortName: "Stats" },
    { id: "commodities", name: "Commodities", shortName: "Products" },
    { id: "procedures", name: "Procedures", shortName: "Process" },
    { id: "contact", name: "Teams", shortName: "Teams" },
  ];

  const [fadeStates, setFadeStates] = useState(
    sections.map((_, index) => (index === 0 ? 1 : 0))
  );
  const containerRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Enhanced smooth animation dengan timing yang diperbaiki
  const scrollToSection = (index) => {
    if (isTransitioning || index < 0 || index >= sections.length) return;

    setIsTransitioning(true);

    // Fade out current section
    setFadeStates((prev) =>
      prev.map((_, i) => (i === currentSection ? 0 : prev[i]))
    );

    setTimeout(() => {
      setCurrentSection(index);

      if (containerRef.current) {
        const targetX = index * window.innerWidth;
        const startX = containerRef.current.scrollLeft;
        const distance = targetX - startX;
        const duration = 600; // Kecepatan animasi bisa diatur di sini
        const startTime = performance.now();

        const easeInOutCubic = (t) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          containerRef.current.scrollLeft = startX + distance * easedProgress;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            setTimeout(() => {
              setFadeStates((prev) =>
                prev.map((_, i) => (i === index ? 1 : 0))
              );
              setTimeout(() => {
                setIsTransitioning(false);
              }, 300);
            }, 150);
          }
        };

        requestAnimationFrame(animateScroll);
      } else {
        setIsTransitioning(false);
      }
    }, 200);
  };

  // Initialize fade states
  useEffect(() => {
    setFadeStates(sections.map((_, index) => (index === 0 ? 1 : 0)));
  }, []);

  // Navigation dengan keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowLeft" && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        backgroundColor: "#f8f8f8",
        overflow: "hidden",
      }}
    >
      {/* Header - Fixed */}
      <header
        style={{
          height: "60px",
          width: "100%",
          margin: 0,
          padding: "0 24px",
          boxSizing: "border-box",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(248, 248, 248, 0.95)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px" }}>
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                fill="#2c2c2c"
              />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: "400",
              letterSpacing: "0.01em",
              fontSize: "20px",
              color: "#2c2c2c",
              margin: 0,
              padding: 0,
            }}
          >
            ExportCo
          </h1>
        </div>

        <button
          onClick={toggleMenu}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            margin: 0,
            padding: 0,
            zIndex: 50,
            position: "relative",
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "#2c2c2c",
              transition: "all 0.3s ease-in-out",
              transform: isMenuOpen ? "rotate(45deg) translateY(6px)" : "none",
            }}
          ></span>
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "#2c2c2c",
              transition: "all 0.3s ease-in-out",
              marginTop: "4px",
              opacity: isMenuOpen ? 0 : 1,
            }}
          ></span>
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "#2c2c2c",
              transition: "all 0.3s ease-in-out",
              marginTop: "4px",
              transform: isMenuOpen
                ? "rotate(-45deg) translateY(-6px)"
                : "none",
            }}
          ></span>
        </button>

        {/* Menu dengan background solid putih */}
        {isMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(44, 44, 44, 0.8)",
              zIndex: 40,
            }}
            onClick={toggleMenu}
          ></div>
        )}

        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100%",
            width: "320px",
            backgroundColor: "#ffffff",
            boxShadow: "0 10px 25px rgba(44,44,44,0.1)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 1000,
            opacity: 1,
            backdropFilter: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px",
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
            }}
          >
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "18px",
                color: "#2c2c2c",
                margin: 0,
              }}
            >
              Menu
            </h2>
            <button
              onClick={toggleMenu}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666666",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg
                style={{ width: "24px", height: "24px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              gap: "4px",
              backgroundColor: "#ffffff",
              height: "calc(100% - 97px)",
              boxSizing: "border-box",
            }}
          >
            {sections.map((section, index) => (
              <a
                key={section.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(index);
                  toggleMenu();
                }}
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: currentSection === index ? "#2c2c2c" : "#666666",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: "0.005em",
                  transition: "color 0.3s ease",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#2c2c2c";
                  e.target.style.backgroundColor = "#f8f8f8";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color =
                    currentSection === index ? "#2c2c2c" : "#666666";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                {section.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Horizontal Sections Container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "60px",
          boxSizing: "border-box",
        }}
        className="horizontal-container"
      >
        {/* Hero Section */}
        <section
          style={{
            minWidth: "100vw",
            height: "calc(100vh - 60px)",
            margin: 0,
            padding: 0,
            backgroundColor: "#f8f8f8",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            flexShrink: 0,
            opacity: fadeStates[0],
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              maxWidth: "600px",
              width: "45%",
            }}
          >
            <h1
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "#2c2c2c",
                margin: "0 0 32px 0",
                padding: 0,
              }}
            >
              About ExportCo
            </h1>

            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                letterSpacing: "0.01em",
                lineHeight: "1.6",
                fontSize: "clamp(16px, 2vw, 18px)",
                color: "#666666",
                margin: "0 0 24px 0",
                padding: 0,
              }}
            >
              A compound of the abbreviation of the term "Experimental Atelier"
              and the year in which its members officially formed a collective,
              EXAT 51 was a prolific and pioneering group of Croatian architects
              and artists.
            </p>

            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                letterSpacing: "0.01em",
                lineHeight: "1.6",
                fontSize: "clamp(14px, 1.8vw, 16px)",
                color: "#999999",
                margin: "0 0 32px 0",
                padding: 0,
              }}
            >
              Ivan Picelj, a world-renowned Croatian artist and designer, was
              among its most prominent members.
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexDirection: window.innerWidth >= 640 ? "row" : "column",
                margin: 0,
                padding: 0,
              }}
            >
              <button
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  background: "#2c2c2c",
                  color: "#f8f8f8",
                  border: "2px solid #2c2c2c",
                  borderRadius: "25px", // CHANGED: Round shape
                  padding: "14px 28px",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.005em",
                  minWidth: "160px",
                  margin: 0,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f8f8f8";
                  e.target.style.color = "#2c2c2c";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#2c2c2c";
                  e.target.style.color = "#f8f8f8";
                }}
              >
                Get Started
              </button>

              <button
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  background: "transparent",
                  color: "#2c2c2c",
                  border: "2px solid #2c2c2c",
                  borderRadius: "25px", // CHANGED: Round shape
                  padding: "14px 28px",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.005em",
                  minWidth: "160px",
                  margin: 0,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#2c2c2c";
                  e.target.style.color = "#f8f8f8";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#2c2c2c";
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "-25%",
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 5,
            }}
          >
            <GlobeMap />
          </div>
        </section>

        {/* Statistics Section */}
        <section
          style={{
            minWidth: "100vw",
            height: "calc(100vh - 60px)",
            margin: 0,
            padding: 0,
            backgroundColor: "#f8f8f8",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            flexShrink: 0,
            overflow: "hidden",
            opacity: fadeStates[1],
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#f8f8f8",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              maxWidth: "600px",
              width: "45%",
            }}
          >
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "clamp(28px, 3vw, 36px)",
                color: "#2c2c2c",
                margin: "0 0 32px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Export Performance
            </h2>

            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "18px",
                color: "#666666",
                margin: "0 0 40px 0",
                lineHeight: "1.6",
              }}
            >
              Comprehensive overview of Indonesia's export achievements and
              market penetration across global markets with sustainable growth
              patterns.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              {[
                {
                  value: "$231.5B",
                  title: "Total Export Value",
                  desc: "Annual performance 2024",
                },
                {
                  value: "180+",
                  title: "Countries Reached",
                  desc: "Global market penetration",
                },
                {
                  value: "+12.8%",
                  title: "Annual Growth",
                  desc: "Year-over-year increase",
                },
                {
                  value: "24/7",
                  title: "Support Available",
                  desc: "Customer service",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "transparent",
                    padding: "0",
                    textAlign: "left",
                    borderLeft: "2px solid #2c2c2c",
                    paddingLeft: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "400",
                      color: "#2c2c2c",
                      marginBottom: "8px",
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    }}
                  >
                    {item.value}
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#2c2c2c",
                      margin: "0 0 4px 0",
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#999999",
                      margin: 0,
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "60%",
              height: "70%",
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#e8e8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#666666",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                boxShadow: "-10px 0 20px rgba(0,0,0,0.1)",
              }}
            >
              Export Performance Chart
            </div>
          </div>
        </section>

        {/* Commodities Section */}
        <section
          style={{
            minWidth: "100vw",
            height: "calc(100vh - 60px)",
            margin: 0,
            padding: 0,
            backgroundColor: "#f8f8f8",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            flexShrink: 0,
            overflow: "hidden",
            opacity: fadeStates[2],
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#f8f8f8",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "60%",
              height: "70%",
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#e8e8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#666666",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                boxShadow: "10px 0 20px rgba(0,0,0,0.1)",
              }}
            >
              Export Commodities Visualization
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              maxWidth: "600px",
              width: "45%",
            }}
          >
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "clamp(28px, 3vw, 36px)",
                color: "#2c2c2c",
                margin: "0 0 32px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Leading Export Commodities
            </h2>

            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "18px",
                color: "#666666",
                margin: "0 0 40px 0",
                lineHeight: "1.6",
              }}
            >
              Indonesia's top performing export products driving economic growth
              and international trade partnerships worldwide.
            </p>

            <div>
              {[
                {
                  title: "Palm Oil & Derivatives",
                  value: "$18.4B",
                  markets: "India, China, EU, Pakistan",
                },
                {
                  title: "Coal & Energy",
                  value: "$33.2B",
                  markets: "China, India, Japan, South Korea",
                },
                {
                  title: "Textiles & Garments",
                  value: "$15.3B",
                  markets: "USA, EU, Japan, Australia",
                },
                {
                  title: "Electronics & Components",
                  value: "$12.7B",
                  markets: "Singapore, USA, China, Malaysia",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: index < 3 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        color: "#2c2c2c",
                        margin: 0,
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      }}
                    >
                      {item.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#2c2c2c",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#999999",
                      margin: 0,
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    }}
                  >
                    Key markets: {item.markets}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Procedures Section */}
        <section
          style={{
            minWidth: "100vw",
            height: "calc(100vh - 60px)",
            margin: 0,
            padding: 0,
            backgroundColor: "#f8f8f8",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            flexShrink: 0,
            overflow: "hidden",
            opacity: fadeStates[3],
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#f8f8f8",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              maxWidth: "600px",
              width: "45%",
            }}
          >
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "clamp(28px, 3vw, 36px)",
                color: "#2c2c2c",
                margin: "0 0 32px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Streamlined Export Procedures
            </h2>

            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                fontSize: "18px",
                color: "#666666",
                margin: "0 0 40px 0",
                lineHeight: "1.6",
              }}
            >
              Comprehensive export facilitation services designed to simplify
              international trade procedures and accelerate market entry.
            </p>

            <div>
              {[
                {
                  step: "01",
                  title: "Export Documentation",
                  desc: "Complete handling of export permits, certificates of origin, and compliance documentation",
                },
                {
                  step: "02",
                  title: "Logistics Coordination",
                  desc: "End-to-end logistics management from port handling to international shipping",
                },
                {
                  step: "03",
                  title: "Market Intelligence",
                  desc: "Real-time market data and trade opportunity identification across global markets",
                },
                {
                  step: "04",
                  title: "Quality Assurance",
                  desc: "Product inspection and certification to meet international standards",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "transparent",
                      color: "#2c2c2c",
                      border: "2px solid #2c2c2c",
                      borderRadius: "16px", // CHANGED: Round shape for step numbers
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "400",
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#2c2c2c",
                        margin: "0 0 8px 0",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666666",
                        margin: 0,
                        lineHeight: "1.5",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                background: "#2c2c2c",
                color: "#f8f8f8",
                border: "2px solid #2c2c2c",
                borderRadius: "25px", // CHANGED: Round shape
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.005em",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f8f8f8";
                e.target.style.color = "#2c2c2c";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#2c2c2c";
                e.target.style.color = "#f8f8f8";
              }}
            >
              Learn More About Our Services
            </button>
          </div>

          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "60%",
              height: "70%",
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#e8e8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#666666",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                boxShadow: "-10px 0 20px rgba(0,0,0,0.1)",
              }}
            >
              Export Process Flow Diagram
            </div>
          </div>
        </section>

        {/* Teams Section - Enhanced dengan responsive layout dan partner list */}
        <section
          style={{
            minWidth: "100vw",
            height: "calc(100vh - 60px)",
            margin: 0,
            padding: 0,
            backgroundColor: "#2c2c2c",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            flexShrink: 0,
            overflow: "hidden",
            opacity: fadeStates[4],
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div style={{ maxWidth: "1400px", width: "100%", padding: "0 40px" }}>
            <div style={{ marginBottom: "60px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#4a90e2",
                  margin: "0 0 20px 0",
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                THE TEAM
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "80px",
                }}
              >
                {/* Description Text - Kiri */}
                <div style={{ flex: 1, maxWidth: "400px", marginTop: "40px" }}>
                  <p
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      lineHeight: "1.3",
                      color: "#ffffff",
                      margin: 0,
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: "400",
                    }}
                  >
                    We are{" "}
                    <span style={{ color: "#ff6b47" }}>
                      a fully remote team
                    </span>{" "}
                    of professionals with{" "}
                    <span style={{ color: "#ff6b47" }}>
                      extensive experience
                    </span>{" "}
                    working for{" "}
                    <span style={{ color: "#ff6b47" }}>
                      top export companies
                    </span>{" "}
                    building{" "}
                    <span style={{ color: "#ffffff" }}>
                      disruptive products
                    </span>
                  </p>
                </div>

                {/* Team Grid - Tengah dengan layout 2x2 responsive */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(180px, 200px))",
                    gridTemplateRows: "repeat(2, auto)",
                    gap: "25px 35px",
                    alignItems: "start",
                    justifyContent: "center",
                  }}
                >
                  {/* Team Member 1 - Atas Kiri */}
                  <div>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "5/6",
                        backgroundColor: "#4a4a4a",
                        marginBottom: "15px",
                        backgroundImage:
                          "url('/images/teams/versa-wijaya.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px", // CHANGED: Round corners for team photos
                      }}
                    />
                    <h4
                      style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        fontWeight: "600",
                        color: "#ffffff",
                        margin: "0 0 6px 0",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                        wordWrap: "break-word",
                      }}
                    >
                      VERSA WIJAYA
                    </h4>
                    <p
                      style={{
                        fontSize: "clamp(11px, 1.2vw, 13px)",
                        color: "#cccccc",
                        margin: 0,
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                      }}
                    >
                      BOSSY, PENYURUH
                    </p>
                  </div>

                  {/* Team Member 2 - Atas Kanan */}
                  <div>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "5/6",
                        backgroundColor: "#4a4a4a",
                        marginBottom: "15px",
                        backgroundImage:
                          "url('/images/teams/reihan-ananda.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px", // CHANGED: Round corners for team photos
                      }}
                    />
                    <h4
                      style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        fontWeight: "600",
                        color: "#ffffff",
                        margin: "0 0 6px 0",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                        wordWrap: "break-word",
                      }}
                    >
                      REIHAN ANANDA
                    </h4>
                    <p
                      style={{
                        fontSize: "clamp(11px, 1.2vw, 13px)",
                        color: "#cccccc",
                        margin: 0,
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                      }}
                    >
                      ALL ROLES
                    </p>
                  </div>

                  {/* Team Member 3 - Bawah Kiri */}
                  <div>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "5/6",
                        backgroundColor: "#4a4a4a",
                        marginBottom: "15px",
                        backgroundImage:
                          "url('/images/teams/ngurah-indra.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px", // CHANGED: Round corners for team photos
                      }}
                    />
                    <h4
                      style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        fontWeight: "600",
                        color: "#ffffff",
                        margin: "0 0 6px 0",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                        wordWrap: "break-word",
                      }}
                    >
                      NGURAH INDRA
                    </h4>
                    <p
                      style={{
                        fontSize: "clamp(11px, 1.2vw, 13px)",
                        color: "#cccccc",
                        margin: 0,
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                      }}
                    >
                      ALL ROLES
                    </p>
                  </div>

                  {/* Team Member 4 - Bawah Kanan */}
                  <div>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "5/6",
                        backgroundColor: "#4a4a4a",
                        marginBottom: "15px",
                        backgroundImage:
                          "url('/images/teams/faizal-nurrahman.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px", // CHANGED: Round corners for team photos
                      }}
                    />
                    <h4
                      style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        fontWeight: "600",
                        color: "#ffffff",
                        margin: "0 0 6px 0",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                        wordWrap: "break-word",
                      }}
                    >
                      FAIZAL NURRAHMAN
                    </h4>
                    <p
                      style={{
                        fontSize: "clamp(11px, 1.2vw, 13px)",
                        color: "#cccccc",
                        margin: 0,
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: "1.2",
                      }}
                    >
                      ALL ROLES
                    </p>
                  </div>
                </div>

                {/* Partner List - Kanan (3 partner vertikal) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    alignItems: "center",
                    marginTop: "40px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#cccccc",
                      margin: "0 0 20px 0",
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    PARTNERS
                  </h4>

                  {/* Partner 1 */}
                  <div
                    style={{
                      width: "120px",
                      height: "60px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px", // CHANGED: Round corners for partner containers
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <img
                      src="/images/partners/partner1-logo.png"
                      alt="Partner 1"
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Partner 2 */}
                  <div
                    style={{
                      width: "120px",
                      height: "60px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px", // CHANGED: Round corners for partner containers
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <img
                      src="/images/partners/partner2-logo.png"
                      alt="Partner 2"
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Partner 3 */}
                  <div
                    style={{
                      width: "120px",
                      height: "60px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px", // CHANGED: Round corners for partner containers
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <img
                      src="/images/partners/partner3-logo.png"
                      alt="Partner 3"
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "12px 20px",
            borderRadius: "50px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <button
            onClick={() => scrollToSection(currentSection - 1)}
            disabled={currentSection === 0}
            style={{
              width: "44px",
              height: "44px",
              border: "none",
              backgroundColor:
                currentSection === 0 ? "rgba(44, 44, 44, 0.1)" : "#2c2c2c",
              borderRadius: "50%",
              cursor: currentSection === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: currentSection === 0 ? 0.3 : 1,
              transition: "all 0.3s ease",
              color: currentSection === 0 ? "#999" : "white",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            style={{
              backgroundColor: "#2c2c2c",
              color: "white",
              border: "none",
              borderRadius: "25px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              cursor: "default",
              minWidth: "80px",
            }}
          >
            {sections[currentSection].shortName}
          </button>

          <button
            onClick={() => scrollToSection(currentSection + 1)}
            disabled={currentSection === sections.length - 1}
            style={{
              width: "44px",
              height: "44px",
              border: "none",
              backgroundColor:
                currentSection === sections.length - 1
                  ? "rgba(44, 44, 44, 0.1)"
                  : "#2c2c2c",
              borderRadius: "50%",
              cursor:
                currentSection === sections.length - 1
                  ? "not-allowed"
                  : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: currentSection === sections.length - 1 ? 0.3 : 1,
              transition: "all 0.3s ease",
              color: currentSection === sections.length - 1 ? "#999" : "white",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}
        >
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  currentSection === index
                    ? "#2c2c2c"
                    : "rgba(44, 44, 44, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: currentSection === index ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to ${section.name}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .horizontal-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ExportCo;
