import { useRef, useState, useEffect, useCallback } from "react";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../utils/countryData";

// Import carousel images
import aiImage1 from "../assets/images/carousel/ai-1.jpg";
import aiImage2 from "../assets/images/carousel/ai-2.jpg";
import aiImage3 from "../assets/images/carousel/ai-3.jpg";
import shippingImage1 from "../assets/images/carousel/shipping-1.jpg";
import shippingImage2 from "../assets/images/carousel/shipping-2.jpg";
import shippingImage3 from "../assets/images/carousel/shipping-3.jpg";
import trendsImage1 from "../assets/images/carousel/trends-1.jpg";
import trendsImage2 from "../assets/images/carousel/trends-2.jpg";
import trendsImage3 from "../assets/images/carousel/trends-3.jpg";

// Import background images
import aiBg from "../assets/images/backgrounds/ai-background.jpg";
import shippingBg from "../assets/images/backgrounds/shipping-background.jpg";
import trendsBg from "../assets/images/backgrounds/trends-background.jpg";

const GEOJSON_URL = "/countries.geojson";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobeLoading, setIsGlobeLoading] = useState(true);
  const [globeError, setGlobeError] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoverD] = useState();
  // Globe states
  const globeEl = useRef();
  const containerRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  // Animated country labels state
  const [animatedLabels, setAnimatedLabels] = useState([]);
  // Loading animation states for login
  const [isLoginLoadingAnimation, setIsLoginLoadingAnimation] = useState(false);
  const [loginLoadingProgress, setLoginLoadingProgress] = useState(0);

  // Get target countries for labels (same as shipping page)
  const targetCountries = getAllCountries();

  // Generate animated country labels
  const generateCountryLabels = useCallback(() => {
    const labels = [];

    // Add Indonesia
    labels.push({
      lat: -0.7893,
      lng: 113.9213,
      flag: "🇮🇩",
      name: "Indonesia",
      delay: 0,
    });

    // Add all target countries
    targetCountries.forEach((country, index) => {
      labels.push({
        lat: country.lat,
        lng: country.lng,
        flag: country.flag,
        name: country.name,
        delay: (index + 1) * 800, // Stagger animation
      });
    });

    return labels;
  }, [targetCountries]);

  useEffect(() => {
    if (!isGlobeLoading && !globeError) {
      // Generate country labels
      const labels = generateCountryLabels();
      setAnimatedLabels(labels);
    }
  }, [isGlobeLoading, globeError, generateCountryLabels]);

  // Update dimensions untuk globe container
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  // Load GeoJSON data
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

  // Setup globe controls
  useEffect(() => {
    if (!isGlobeLoading && globeEl.current && countries.features.length > 0) {
      const globe = globeEl.current;

      if (globe.controls) {
        // Disable zoom but enable rotation
        globe.controls().enableZoom = false;
        globe.controls().enablePan = true;
        globe.controls().enableRotate = true;
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.4;
        globe.controls().dampingFactor = 0.1;
        globe.controls().rotateSpeed = 0.6;
      }

      // Set initial view to Indonesia with fixed zoom
      globe.pointOfView(
        {
          lat: -0.7893,
          lng: 113.9213,
          altitude: 1.5, // Fixed zoom level - closer view
        },
        1000 // Quick transition
      );
    }
  }, [isGlobeLoading, countries.features.length]);

  // Resize listener
  useEffect(() => {
    updateDimensions();
    const handleResize = () => {
      requestAnimationFrame(updateDimensions);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateDimensions]);

  const handlePolygonHover = useCallback((polygon, event) => {
    if (polygon) {
      const countryName =
        polygon.properties?.NAME_EN || polygon.properties?.NAME || "Unknown";
      setHoveredCountry({
        name: countryName,
      });

      // Update tooltip position using mouse coordinates
      if (event?.clientX && event?.clientY) {
        setTooltipPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    } else {
      setHoveredCountry(null);
    }

    if (globeEl.current?.controls) {
      globeEl.current.controls().autoRotateSpeed = polygon ? 0.2 : 0.5;
    }
  }, []);

  // Handle learn more button click
  const handleLearnMore = useCallback(() => {}, []);

  const handlePolygonClick = useCallback((polygon) => {
    if (polygon?.properties) {
    }
  }, []);

  const handleGetStarted = () => {
    navigate("/dashboard/trend");
  };

  const handleLogin = () => {
    setIsLoginLoadingAnimation(true);
    setLoginLoadingProgress(0);
  };

  // Carousel states for each section
  const [aiImageIndex, setAiImageIndex] = useState(0);
  const [shippingImageIndex, setShippingImageIndex] = useState(0);
  const [trendsImageIndex, setTrendsImageIndex] = useState(0);

  // Image arrays for each section with new images
  const aiImages = [aiImage1, aiImage2, aiImage3];
  const shippingImages = [shippingImage1, shippingImage2, shippingImage3];
  const trendsImages = [trendsImage1, trendsImage2, trendsImage3];

  // Carousel state for smooth transitions
  const [aiCarouselState, setAiCarouselState] = useState("current");
  const [shippingCarouselState, setShippingCarouselState] = useState("current");
  const [trendsCarouselState, setTrendsCarouselState] = useState("current");

  // Update handleNext to include carousel animation
  const handleNext = (
    currentIndex,
    setIndex,
    totalImages,
    setCarouselState
  ) => {
    const newIndex = (currentIndex + 1) % totalImages;

    // Trigger slide animation
    setCarouselState("sliding");

    // Change image after animation starts
    setTimeout(() => {
      setIndex(newIndex);
      setCarouselState("current");
    }, 800); // Increased from 400ms to 800ms for slower animation
  };

  // Auto-advance carousel - only slide to right every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(
        aiImageIndex,
        setAiImageIndex,
        aiImages.length,
        setAiCarouselState
      );
      handleNext(
        shippingImageIndex,
        setShippingImageIndex,
        shippingImages.length,
        setShippingCarouselState
      );
      handleNext(
        trendsImageIndex,
        setTrendsImageIndex,
        trendsImages.length,
        setTrendsCarouselState
      );
    }, 3500); // Increased from 2500ms to 3500ms for longer pause between slides

    return () => clearInterval(interval);
  }, [aiImageIndex, shippingImageIndex, trendsImageIndex]);

  // Update carousel image container styles with proper carousel slide animation
  const carouselImageStyle = (carouselState) => {
    const baseStyle = {
      transform: "scale(1.05)",
      transition: "all 1.6s ease-in-out", // Increased from 0.8s to 1.6s
      opacity: 0.9,
    };

    switch (carouselState) {
      case "sliding":
        return {
          ...baseStyle,
          transform: "translateX(-100%) scale(1.05)",
          opacity: 0,
        };
      case "current":
      default:
        return baseStyle;
    }
  };

  // Loading animation effect for login
  useEffect(() => {
    if (isLoginLoadingAnimation) {
      const interval = setInterval(() => {
        setLoginLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              navigate("/login");
            }, 100);
            return 100;
          }
          return Math.min(prev + Math.random() * 15 + 5, 100);
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoginLoadingAnimation, navigate]);

  return (
    <>
      <style>
        {`
          @keyframes slideCarousel {
            0% {
              transform: translateX(0) scale(1.05);
              opacity: 0.9;
            }
            20% {
              transform: translateX(-100%) scale(1.05);
              opacity: 0;
            }
            80% {
              transform: translateX(100%) scale(1.05);
              opacity: 0;
            }
            100% {
              transform: translateX(0) scale(1.05);
              opacity: 0.9;
            }
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-white overflow-x-hidden text-gray-900 font-['Inter']">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-light text-lg">⚡</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-light">ExportIn</h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 font-light"
                >
                  Features
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </button>
              </div>

              {/* Login Button */}
              <div className="hidden md:block">
                <button
                  onClick={handleLogin}
                  className="bg-black text-white px-6 py-2 rounded-full font-light hover:bg-gray-900 transition-all"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4">
              <div className="container mx-auto px-4">
                <nav className="flex flex-col space-y-4">
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-gray-900 font-light"
                  >
                    Features
                  </a>
                  <button
                    onClick={handleLogin}
                    className="bg-black text-white px-6 py-2 rounded-full font-light hover:bg-gray-900 transition-all w-full"
                  >
                    Login
                  </button>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16 sm:pt-20">
          {/* Globe Container */}
          <div
            className="absolute right-0 w-[60%] h-full"
            ref={containerRef}
            data-globe-container
            onClick={(e) => {
              // Only trigger if not clicking a polygon (i.e., not handled by onPolygonClick)
              if (e.target.closest(".globe-clickable-polygon")) return;
            }}
            style={{ cursor: "default" }}
          >
            {!isGlobeLoading && !globeError && (
              <Globe
                ref={globeEl}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                width={dimensions.width}
                height={dimensions.height}
                polygonsData={countries.features.filter(
                  (d) => d?.properties?.ISO_A2 !== "AQ"
                )}
                polygonCapColor={(d) => {
                  return d === hoverD
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(255, 255, 255, 0.3)";
                }}
                polygonSideColor={(d) => {
                  return "rgba(255, 255, 255, 0.2)";
                }}
                polygonStrokeColor={(d) => {
                  return "#ffffff";
                }}
                polygonAltitude={(d) => {
                  return d === hoverD ? 0.02 : 0.01;
                }}
                atmosphereColor="rgba(200,200,255,0.2)"
                atmosphereAltitude={0.1}
                onPolygonHover={handlePolygonHover}
                onPolygonClick={handlePolygonClick}
                polygonsTransitionDuration={200}
                enablePointerInteraction={true}
                pointerEventsFilter={() => true}
                rendererConfig={{
                  antialias: true,
                  alpha: true,
                  preserveDrawingBuffer: true,
                }}
                // Add a class to polygons for click detection
                polygonLabel={() =>
                  "<div class=&quot;globe-clickable-polygon&quot;></div>"
                }
                htmlElementsData={animatedLabels.map((label) => ({
                  lat: label.lat,
                  lng: label.lng,
                  html: `
                    <div class="country-label-container" style="
                      transform: translate(-50%, -50%);
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      opacity: 1;
                      transform: translate(-50%, -50%) scale(1);
                    ">
                      <!-- Country Label -->
                      <div class="country-label" style="
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        background: rgba(255,255,255,0.95);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(0,0,0,0.1);
                        border-radius: 12px;
                        padding: 8px 12px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                        font-family: 'Google Sans Text', 'Product Sans', 'Roboto', sans-serif;
                        font-size: 12px;
                        font-weight: 500;
                        color: #1f2937;
                        white-space: nowrap;
                        pointer-events: none;
                        user-select: none;
                        min-width: 80px;
                        justify-content: center;
                      ">
                        <span style="font-size: 16px;">${label.flag}</span>
                        <span style="color: #1f2937; font-weight: 500;">${label.name}</span>
                      </div>
                    </div>
                  `,
                  altitude: 0.01,
                }))}
                htmlElement={(d) => {
                  const el = document.createElement("div");
                  el.innerHTML = d.html;
                  return el;
                }}
                htmlAltitude={0.01}
              />
            )}
          </div>

          {/* Content Container */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl lg:max-w-xl pointer-events-auto">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
                  Revolutionize Your Export Business
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 font-light mb-8">
                  Unlock global opportunities with AI-powered insights,
                  streamlined documentation, and real-time market analysis.
                </p>
                <div className="flex justify-start">
                  <button
                    onClick={handleGetStarted}
                    className="bg-black text-white px-8 py-3 rounded-full font-light hover:bg-gray-900 transition-all text-lg"
                  >
                    Try Now
                  </button>
                </div>
              </div>

              {/* Right Content - Empty to allow globe visibility */}
              <div className="hidden lg:block"></div>
            </div>
          </div>

          {/* Country Tooltip - Now using fixed positioning with mouse coordinates */}
          {hoveredCountry && (
            <div
              className="fixed z-[9999] bg-white text-gray-900 p-4 rounded-xl shadow-lg pointer-events-auto"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y - 10}px`,
                transform: "translate(-50%, -100%)",
                minWidth: "280px",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <h3 className={"text-lg font-medium mb-2 text-gray-900"}>
                {hoveredCountry.name}
              </h3>
              <div className="mb-3">
                <p className={"text-sm text-gray-600 mb-1"}>
                  Top Export Commodities:
                </p>
                <ul className={"list-disc list-inside"}>
                  {/* Removed commodity data as per edit hint */}
                </ul>
              </div>
              <div className={"flex items-center mb-3"}>
                <span className={"text-sm text-gray-600"}>Export Growth:</span>
                <span className={"ml-2 text-green-600 font-medium"}>
                  {/* Removed commodity data as per edit hint */}
                </span>
              </div>
              <button
                onClick={handleLearnMore}
                className="w-full bg-black text-white py-2 px-4 rounded-lg font-light hover:bg-gray-900 transition-all text-sm flex items-center justify-center space-x-2"
              >
                <span>Click for Learn More</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </section>

        {/* Features Section - With GIFs, without icons */}
        <section id="features" className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-sm sm:text-base font-medium tracking-wider text-blue-600 uppercase mb-4">
                Our Solutions
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our AI-Powered Export Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive platform that integrates intelligent automation
                with global trade expertise to deliver end-to-end export
                solutions.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Cards */}
              {/* Conversational AI */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-2 transition-all hover:shadow-xl">
                {/* GIF Background */}
                <div className="w-full h-48 relative">
                  <img
                    src={aiImage1}
                    alt="AI Assistant Feature"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Conversational AI
                  </h3>
                  <p className="text-gray-600">
                    AI-powered chat assistant that provides 24/7 export
                    guidance, document generation, and cost calculations with
                    real-time regulatory compliance.
                  </p>
                </div>
              </div>

              {/* Smart Shipping */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-2 transition-all hover:shadow-xl">
                {/* GIF Background */}
                <div className="w-full h-48 relative">
                  <img
                    src={shippingImage1}
                    alt="Smart Shipping Feature"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Smart Shipping
                  </h3>
                  <p className="text-gray-600">
                    Interactive globe-based shipping solution with real-time
                    cost estimation, route optimization, and comprehensive
                    logistics management.
                  </p>
                </div>
              </div>

              {/* Market Trend Analytics */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-2 transition-all hover:shadow-xl">
                {/* GIF Background */}
                <div className="w-full h-48 relative">
                  <img
                    src={trendsImage1}
                    alt="Market Trends Feature"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Market Trend Analytics
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive market analysis dashboard with seasonal trends
                    and country demand insights for strategic export planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversational AI Section */}
        <section
          id="conversational-ai"
          className="relative min-h-screen flex items-center"
          style={{
            backgroundImage: `url(${aiBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-white">
                <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
                  AI Assistant
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Conversational AI Assistant
                </h2>
                <p className="text-xl text-blue-300 italic mb-6">
                  "Your intelligent export companion that never sleeps,
                  delivering instant solutions around the clock."
                </p>
                <p className="text-gray-300 mb-8">
                  Experience revolutionary export operations with our AI
                  Assistant that understands your business complexity. Our
                  platform integrates cutting-edge artificial intelligence with
                  real-time export regulations database.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all"
                >
                  Try AI Assistant
                </button>
              </div>

              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/30">
                <img
                  src={aiImages[aiImageIndex]}
                  alt="AI Assistant Feature"
                  className="w-full h-full object-cover"
                  style={carouselImageStyle(aiCarouselState)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Smart Shipping Section */}
        <section
          id="smart-shipping"
          className="relative min-h-screen flex items-center"
          style={{
            backgroundImage: `url(${shippingBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/30">
                <img
                  src={shippingImages[shippingImageIndex]}
                  alt="Smart Shipping Feature"
                  className="w-full h-full object-cover"
                  style={carouselImageStyle(shippingCarouselState)}
                />
              </div>

              {/* Content */}
              <div className="text-white">
                <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
                  Smart Shipping
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Intelligent Shipping Solutions
                </h2>
                <p className="text-xl text-blue-300 italic mb-6">
                  "Navigate global shipping with precision and efficiency
                  through our smart logistics platform."
                </p>
                <p className="text-gray-300 mb-8">
                  Transform your shipping operations with real-time tracking,
                  optimized routes, and predictive analytics. Our platform
                  ensures seamless coordination across your entire supply chain.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all"
                >
                  Explore Shipping
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Trends Section */}
        <section
          id="market-trends"
          className="relative min-h-screen flex items-center"
          style={{
            backgroundImage: `url(${trendsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-white">
                <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
                  Market Trends
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Real-time Market Intelligence
                </h2>
                <p className="text-xl text-blue-300 italic mb-6">
                  "Stay ahead of market dynamics with our comprehensive trend
                  analysis and forecasting."
                </p>
                <p className="text-gray-300 mb-8">
                  Access powerful insights into global trade patterns, commodity
                  prices, and market opportunities. Make data-driven decisions
                  with our advanced analytics platform.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all"
                >
                  View Trends
                </button>
              </div>

              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/30">
                <img
                  src={trendsImages[trendsImageIndex]}
                  alt="Market Trends Feature"
                  className="w-full h-full object-cover"
                  style={carouselImageStyle(trendsCarouselState)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-black text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="flex flex-col items-center text-center">
              {/* Company Info */}
              <div className="mb-8">
                <p className="text-gray-300 max-w-md mx-auto mb-6">
                  Democratizing global trade through AI-powered solutions. Join
                  thousands of exporters who trust ExportIn.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-xl">📱</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-xl">💼</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-xl">🌐</span>
                  </a>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="w-full max-w-2xl mx-auto pt-8 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <p className="text-gray-400 text-sm">
                    © 2025 ExportIn. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Loading Animation Overlay for Login */}
        {isLoginLoadingAnimation && (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999] font-['Inter']">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-light">⚡</span>
                </div>
                <h1 className="text-4xl font-light text-gray-900">ExportIn</h1>
              </div>

              <div className="w-80 bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${loginLoadingProgress}%` }}
                />
              </div>

              <p className="text-gray-600 font-light">
                {loginLoadingProgress < 50
                  ? "Initializing..."
                  : loginLoadingProgress < 80
                  ? "Redirecting to login..."
                  : "Almost ready..."}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        html,
        body {
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
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
};

export default LandingPage;
