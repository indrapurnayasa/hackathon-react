import React, { useState, useEffect, useRef } from "react";
import GlobeMap from "./GlobeMap";

const ExportCo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Intersection Observer untuk animasi scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id) => (ref) => {
    sectionRefs.current[id] = ref;
  };

  const isVisible = (sectionId) => visibleSections.has(sectionId);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        backgroundColor: "#f8f8f8",
      }}
    >
      {/* Header - Fixed dengan style zseventyfour */}
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
            backgroundColor: "#ffffff", // Solid white background
            boxShadow: "0 10px 25px rgba(44,44,44,0.1)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 50,
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
              backgroundColor: "#ffffff", // Tambahan untuk memastikan header menu solid
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
              backgroundColor: "#ffffff", // Pastikan nav area juga solid
              height: "calc(100% - 97px)", // Sesuaikan height untuk mengisi penuh
              boxSizing: "border-box",
            }}
          >
            {["Home", "About", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#2c2c2c",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: "0.005em",
                  transition: "color 0.3s ease",
                  backgroundColor: "transparent", // Pastikan link tidak ada background
                }}
                onClick={toggleMenu}
                onMouseEnter={(e) => {
                  e.target.style.color = "#666666";
                  e.target.style.backgroundColor = "#f8f8f8"; // Subtle hover background
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#2c2c2c";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section - Style zseventyfour dengan globe */}
      <section
        id="hero"
        ref={setSectionRef("hero")}
        className="hero-unified"
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "#f8f8f8",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "60px",
          opacity: isVisible("hero") ? 1 : 0,
          transform: isVisible("hero") ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Content Container dengan style zseventyfour */}
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("hero") ? "0" : "-50px"
            })`,
            zIndex: 10,
            maxWidth: "600px",
            width: "45%",
            opacity: isVisible("hero") ? 1 : 0,
            transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
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
              transform: isVisible("hero")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("hero") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
              transform: isVisible("hero")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("hero") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
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
              transform: isVisible("hero")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("hero") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
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
              transform: isVisible("hero")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("hero") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s",
            }}
          >
            <button
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                background: "#2c2c2c",
                color: "#f8f8f8",
                border: "2px solid #2c2c2c",
                borderRadius: "0",
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
                borderRadius: "0",
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

        {/* Globe Container */}
        <div
          style={{
            position: "absolute",
            right: "-25%",
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 5,
            transform: `translateX(${isVisible("hero") ? "0" : "50px"})`,
            opacity: isVisible("hero") ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
          }}
        >
          <GlobeMap />
        </div>
      </section>

      {/* SECTION 1: Export Statistics - Style zseventyfour */}
      <section
        id="statistics"
        ref={setSectionRef("statistics")}
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "#f8f8f8",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isVisible("statistics") ? 1 : 0,
          transform: isVisible("statistics")
            ? "translateY(0)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Content Side - 45% width seperti hero */}
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("statistics") ? "0" : "-50px"
            })`,
            zIndex: 10,
            maxWidth: "600px",
            width: "45%",
            opacity: isVisible("statistics") ? 1 : 0,
            transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
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
              transform: isVisible("statistics")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("statistics") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
              transform: isVisible("statistics")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("statistics") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
            }}
          >
            Comprehensive overview of Indonesia's export achievements and market
            penetration across global markets with sustainable growth patterns.
          </p>

          {/* Statistics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              transform: isVisible("statistics")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("statistics") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
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
                color: "#2c2c2c",
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
                  transform: isVisible("statistics")
                    ? "translateY(0)"
                    : "translateY(20px)",
                  opacity: isVisible("statistics") ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
                    1 + index * 0.1
                  }s`,
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "400",
                    color: item.color || "#2c2c2c",
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

        {/* Visual Side - 55% width */}
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("statistics") ? "0" : "50px"
            })`,
            width: "55%",
            height: "60%",
            opacity: isVisible("statistics") ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
            }}
          >
            Export Performance Chart
          </div>
        </div>
      </section>

      {/* SECTION 2: Key Export Commodities - Style zseventyfour */}
      <section
        id="commodities"
        ref={setSectionRef("commodities")}
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "#f8f8f8",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isVisible("commodities") ? 1 : 0,
          transform: isVisible("commodities")
            ? "translateY(0)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Visual Side - 55% width di kiri */}
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("commodities") ? "0" : "-50px"
            })`,
            width: "55%",
            height: "60%",
            opacity: isVisible("commodities") ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
            }}
          >
            Export Commodities Visualization
          </div>
        </div>

        {/* Content Side - 45% width di kanan */}
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("commodities") ? "0" : "50px"
            })`,
            zIndex: 10,
            maxWidth: "600px",
            width: "45%",
            opacity: isVisible("commodities") ? 1 : 0,
            transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
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
              transform: isVisible("commodities")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("commodities") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
              transform: isVisible("commodities")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("commodities") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
            }}
          >
            Indonesia's top performing export products driving economic growth
            and international trade partnerships worldwide.
          </p>

          {/* Commodities List */}
          <div
            style={{
              transform: isVisible("commodities")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("commodities") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
            }}
          >
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
                  transform: isVisible("commodities")
                    ? "translateY(0)"
                    : "translateY(20px)",
                  opacity: isVisible("commodities") ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
                    1 + index * 0.1
                  }s`,
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

      {/* SECTION 3: Export Procedures - Style zseventyfour */}
      <section
        id="procedures"
        ref={setSectionRef("procedures")}
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "#f8f8f8",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isVisible("procedures") ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Content Side - 45% width di kiri */}
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("procedures") ? "0" : "-50px"
            })`,
            zIndex: 10,
            maxWidth: "600px",
            width: "45%",
            opacity: isVisible("procedures") ? 1 : 0,
            transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
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
              transform: isVisible("procedures")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("procedures") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
              transform: isVisible("procedures")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("procedures") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
            }}
          >
            Comprehensive export facilitation services designed to simplify
            international trade procedures and accelerate market entry.
          </p>

          {/* Process Steps */}
          <div
            style={{
              transform: isVisible("procedures")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("procedures") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
            }}
          >
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
                  transform: isVisible("procedures")
                    ? "translateY(0)"
                    : "translateY(20px)",
                  opacity: isVisible("procedures") ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
                    1 + index * 0.1
                  }s`,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "transparent",
                    color: "#2c2c2c",
                    border: "2px solid #2c2c2c",
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
              borderRadius: "0",
              padding: "14px 28px",
              fontSize: "16px",
              fontWeight: "400",
              cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.005em",
              transform: isVisible("procedures")
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isVisible("procedures") ? 1 : 0,
              transitionDelay: "1.4s",
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

        {/* Visual Side - 55% width di kanan */}
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: `translateY(-50%) translateX(${
              isVisible("procedures") ? "0" : "50px"
            })`,
            width: "55%",
            height: "60%",
            opacity: isVisible("procedures") ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
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
            }}
          >
            Export Process Flow Diagram
          </div>
        </div>
      </section>

      {/* SECTION 4: Contact - Style zseventyfour */}
      <section
        id="contact"
        ref={setSectionRef("contact")}
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "#2c2c2c",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isVisible("contact") ? 1 : 0,
          transform: isVisible("contact")
            ? "translateY(0)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            transform: isVisible("contact")
              ? "translateY(0)"
              : "translateY(30px)",
            opacity: isVisible("contact") ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
          }}
        >
          <h2
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: "400",
              fontSize: "clamp(28px, 3vw, 36px)",
              color: "#f8f8f8",
              margin: "0 0 24px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Start Your Export Journey
          </h2>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: "400",
              fontSize: "18px",
              color: "#cccccc",
              margin: "0 0 40px 0",
              lineHeight: "1.6",
            }}
          >
            Partner with ExportCo to expand your business globally. Our expert
            team provides comprehensive support for all your international trade
            needs.
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
              justifyContent: "center",
              flexWrap: "wrap",
              transform: isVisible("contact")
                ? "translateY(0)"
                : "translateY(30px)",
              opacity: isVisible("contact") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
            }}
          >
            <button
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                background: "#f8f8f8",
                color: "#2c2c2c",
                border: "2px solid #f8f8f8",
                borderRadius: "0",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.005em",
                minWidth: "180px",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#f8f8f8";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f8f8f8";
                e.target.style.color = "#2c2c2c";
              }}
            >
              Get Started Today
            </button>

            <button
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                background: "transparent",
                color: "#f8f8f8",
                border: "2px solid #f8f8f8",
                borderRadius: "0",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.005em",
                minWidth: "180px",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f8f8f8";
                e.target.style.color = "#2c2c2c";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#f8f8f8";
              }}
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExportCo;
