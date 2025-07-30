import { useState, useEffect, useRef } from "react";
import {
  Globe,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
// Import vector image (jika menggunakan src/assets)
import vectorImage from "../assets/images/vector.png";
// Import country utilities
import { getCountryFlag } from "../utils/countryFlags";
import { getCountryName, capitalizeWords } from "../utils/countryNames";
import config from "../config";

export default function TrendPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("seasonal");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [seasonalCurrentPage, setSeasonalCurrentPage] = useState(0);
  const [countryCurrentPage, setCountryCurrentPage] = useState(0);
  const [seasonalTrends, setSeasonalTrends] = useState([]);
  const [countryDemands, setCountryDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryLoading, setCountryLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const countryProductsRefs = useRef({});
  const [showArrows, setShowArrows] = useState({});
  const [isGuest, setIsGuest] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSeasonalTransitioning, setIsSeasonalTransitioning] = useState(false);
  const [isCountryTransitioning, setIsCountryTransitioning] = useState(false);

  // Check if user is guest
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isGuestMode = localStorage.getItem("isGuest") === "true";
    setIsGuest(!token || isGuestMode);
  }, []);

  // Check if navigated from ShippingPage with specific tab
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(
        location.state.activeTab === "country-demand"
          ? "country"
          : location.state.activeTab
      );
    }
  }, [location.state]);

  // Handle navigation to ShippingPage with selected country
  const handleCountryClick = (countryCode) => {
    navigate("/dashboard/shipping", {
      state: { selectedCountry: countryCode, scrollToCountry: true },
    });
  };

  // Handle tab change with simple fade animation
  const handleTabChange = (tab) => {
    if (tab !== activeTab && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  };

  // Handle seasonal page change with animation
  const handleSeasonalPageChange = (newPage) => {
    if (newPage !== seasonalCurrentPage && !isSeasonalTransitioning) {
      setIsSeasonalTransitioning(true);
      setTimeout(() => {
        setSeasonalCurrentPage(newPage);
        setTimeout(() => {
          setIsSeasonalTransitioning(false);
        }, 300);
      }, 200);
    }
  };

  // Handle country page change with animation
  const handleCountryPageChange = (newPage) => {
    if (newPage !== countryCurrentPage && !isCountryTransitioning) {
      setIsCountryTransitioning(true);
      setTimeout(() => {
        setCountryCurrentPage(newPage);
        setTimeout(() => {
          setIsCountryTransitioning(false);
        }, 300);
      }, 200);
    }
  };

  // Check if arrows should be shown for a specific country
  const checkIfArrowsNeeded = (countryIndex) => {
    const container = countryProductsRefs.current[countryIndex];
    if (container) {
      const isScrollable = container.scrollWidth > container.clientWidth;
      setShowArrows((prev) => ({
        ...prev,
        [countryIndex]: isScrollable,
      }));
    }
  };

  // Scroll functions for country products
  const scrollProductsLeft = (countryIndex) => {
    if (countryProductsRefs.current[countryIndex]) {
      countryProductsRefs.current[countryIndex].scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const scrollProductsRight = (countryIndex) => {
    if (countryProductsRefs.current[countryIndex]) {
      countryProductsRefs.current[countryIndex].scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  // Fetch seasonal trends from API
  const fetchSeasonalTrends = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${config.API_BASE_URL}/api/v1/export/seasonal-trend?endDate=31-12-2024`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            data?.error ||
            "Failed to fetch seasonal trends"
        );
      }

      // Transform API data to match the expected format
      const transformedData = data.data.map((item, index) => ({
        id: `item-${index}`,
        product: extractProductName(item.comodity),
        season: item.period,
        trend: item.growthPercentage >= 0 ? "up" : "down",
        percentage: `${
          item.growthPercentage >= 0 ? "+" : ""
        }${item.growthPercentage.toFixed(1)}%`,
        countries: item.countries.map((country) => ({
          name: getCountryName(country.countryId),
          code: country.countryId,
          flag: getCountryFlag(country.countryId),
        })),
        price: item.averagePrice,
      }));

      setSeasonalTrends(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching seasonal trends:", err);
      setError(err.message || "Failed to load seasonal trends data");
      // Fallback to empty array
      setSeasonalTrends([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSeasonalTrends();
    fetchCountryDemands();
  }, []);

  // Handle window resize to recheck arrow visibility
  useEffect(() => {
    const handleResize = () => {
      // Recheck all country carousels when window resizes
      Object.keys(countryProductsRefs.current).forEach((index) => {
        checkIfArrowsNeeded(parseInt(index));
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch country demands from API
  const fetchCountryDemands = async () => {
    try {
      setCountryLoading(true);
      const response = await fetch(
        `${config.API_BASE_URL}/api/v1/export/country-demand?endDate=31-12-2024`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            data?.error ||
            "Failed to fetch country demands"
        );
      }

      // Transform API data to match the expected format - filter out products with growth <= 0 and countries with no positive growth products
      const transformedData = data.data
        .map((item) => {
          // Filter out products with growth <= 0 (negative or zero growth)
          const filteredProducts = item.products.filter(
            (product) =>
              product.growth !== null &&
              product.growth !== undefined &&
              product.growth > 0
          );

          return {
            country: capitalizeWords(getCountryName(item.countryId)),
            flag: getCountryFlag(item.countryId),
            code: item.countryId,
            topProducts: filteredProducts.map((product) => ({
              name: extractProductName(product.name),
              demand: getDemandLevel(product.growth),
              growth: `${
                product.growth >= 0 ? "+" : ""
              }${product.growth.toFixed(1)}%`,
              value: product.price || "-",
            })),
            totalValue: formatCurrency(item.currentTotalTransaction),
            growth: `${
              item.growthPercentage >= 0 ? "+" : ""
            }${item.growthPercentage.toFixed(1)}%`,
          };
        })
        .filter((country) => country.topProducts.length > 0); // Only show countries that have at least one product with positive growth

      setCountryDemands(transformedData);
      setCountryError(null);
    } catch (err) {
      console.error("Error fetching country demands:", err);
      setCountryError(err.message || "Failed to load country demands data");
      // Fallback to empty array
      setCountryDemands([]);
    } finally {
      setCountryLoading(false);
    }
  };

  // Helper function to determine demand level based on growth
  const getDemandLevel = (growth) => {
    if (growth > 100) return "Sangat Tinggi";
    if (growth >= 60) return "Tinggi";
    if (growth >= 20) return "Medium";
    return "Low";
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000000000) {
      return `Rp ${(amount / 1000000000000).toFixed(1)} Triliun`;
    } else if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)} Miliar`;
    } else if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)} Juta`;
    } else {
      return `Rp ${amount.toLocaleString()}`;
    }
  };

  // Helper function to extract product name from parentheses
  const extractProductName = (comodityName) => {
    const match = comodityName.match(/\((.*?)\)/);
    return match ? match[1] : comodityName;
  };

  // Pagination untuk seasonal trends (4 items per page, layout 2x2)
  const itemsPerSeasonalPage = 4;
  const totalSeasonalPages = Math.ceil(
    seasonalTrends.length / itemsPerSeasonalPage
  );
  const currentSeasonalItems = seasonalTrends.slice(
    seasonalCurrentPage * itemsPerSeasonalPage,
    (seasonalCurrentPage + 1) * itemsPerSeasonalPage
  );

  // Pagination untuk country demands (4 countries per page)
  const itemsPerCountryPage = 4;
  const totalCountryPages = Math.ceil(
    countryDemands.length / itemsPerCountryPage
  );
  const currentCountryItems = countryDemands.slice(
    countryCurrentPage * itemsPerCountryPage,
    (countryCurrentPage + 1) * itemsPerCountryPage
  );

  // Handle preview mode sign in
  const handlePreviewSignIn = () => {
    setIsLoadingAnimation(true);
    setLoadingProgress(0);
  };

  // Loading animation effect for preview sign in
  useEffect(() => {
    if (isLoadingAnimation) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              navigate("/login", {
                state: { from: location.pathname },
              });
            }, 100);
            return 100;
          }
          return Math.min(prev + Math.random() * 15 + 5, 100);
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoadingAnimation, navigate]);

  return (
    <div className="h-full overflow-y-auto">
      {/* Container utama dengan max-width yang dibatasi */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8">
        {/* Hero Section dengan simple fade animation */}
        <div
          className={`relative rounded-3xl overflow-hidden mb-6 sm:mb-8 w-full transition-opacity duration-300 ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
          style={{
            background: activeTab === "seasonal" ? "#A0D4CE" : "#C7DB9C",
            minHeight: "400px",
          }}
        >
          {/* Background Pattern/Texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                activeTab === "seasonal"
                  ? "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
                  : "radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)",
              backgroundSize: "50px 50px",
              opacity: 0.1,
            }}
          />

          <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex items-center">
            <div
              className={`w-full grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch ${
                activeTab === "country" ? "xl:grid-cols-2" : ""
              }`}
            >
              {/* Conditional Layout based on activeTab */}
              {activeTab === "seasonal" ? (
                <>
                  {/* Left Content - Market Trend Analysis */}
                  <div className="text-gray-800 flex flex-col justify-center">
                    <h1
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                      style={{
                        fontFamily:
                          "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 700,
                        color: "#2D3748",
                      }}
                    >
                      Market Trend Analysis
                    </h1>
                    {/* Description for logged in users */}
                    {!isGuest && (
                      <p className="text-lg sm:text-xl text-gray-600 font-light mb-6 leading-relaxed">
                        Analisis mendalam tentang tren pasar ekspor Indonesia
                        dengan data real-time dan insights yang dapat membantu
                        Anda membuat keputusan bisnis yang tepat.
                      </p>
                    )}
                    {/* Preview Mode Explanation for Guest Users */}
                    {isGuest && (
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-4 border-2 border-amber-300 shadow-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              P
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              Preview Mode
                            </h4>
                            <p className="text-gray-600 mb-3">
                              Ini adalah preview. Silahkan Sign In untuk full
                              access.
                            </p>
                            <button
                              onClick={handlePreviewSignIn}
                              className="bg-green-600 text-white py-2 px-6 rounded-full font-medium hover:bg-green-700 transition-colors text-sm"
                            >
                              Sign In Sekarang
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons dengan simbol di kanan */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => handleTabChange("seasonal")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "seasonal"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Seasonal Trends</span>
                        <Leaf className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleTabChange("country")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "country"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Country Demand</span>
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Content - Top Trend Section */}
                  <div className="flex flex-col justify-center">
                    <div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg w-full h-full flex flex-col relative overflow-hidden"
                      style={{ borderRadius: "20px", minHeight: "350px" }}
                    >
                      {/* Title dengan margin yang diperkecil */}
                      <div
                        className="border-2 border-gray-800 px-8 py-4 mb-8 mt-2 self-center"
                        style={{ borderRadius: "30px" }}
                      >
                        <h3
                          className="font-bold text-gray-900 text-center"
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700,
                            fontSize: "32px",
                          }}
                        >
                          Top Trend Bulan Ini
                        </h3>
                      </div>

                      {/* Content dengan layout yang lebih fleksibel */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4 flex-1">
                          {seasonalTrends.length > 0 ? (
                            <>
                              <div className="flex items-center space-x-2">
                                {seasonalTrends[0].trend === "up" ? (
                                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
                                ) : (
                                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                                )}
                                <div
                                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
                                  style={{
                                    fontFamily:
                                      "'Product Sans', 'Google Sans Text', sans-serif",
                                    fontWeight: 700,
                                  }}
                                >
                                  {seasonalTrends[0].percentage}
                                </div>
                              </div>

                              <div
                                className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 max-w-xs"
                                style={{
                                  fontFamily:
                                    "'Google Sans Text', 'Roboto', sans-serif",
                                  fontWeight: 500,
                                }}
                              >
                                {seasonalTrends[0].product}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded shimmer flex-shrink-0"></div>
                                <div
                                  className="h-8 sm:h-12 bg-gray-200 rounded shimmer"
                                  style={{ width: "80px" }}
                                ></div>
                              </div>
                              <div
                                className="h-6 sm:h-8 bg-gray-200 rounded shimmer"
                                style={{ width: "150px" }}
                              ></div>
                            </>
                          )}
                        </div>

                        {/* Vector dengan ukuran yang disesuaikan */}
                        <div className="flex-shrink-0 ml-4">
                          <img
                            src={vectorImage}
                            alt="Market Trend Vector"
                            className="object-contain"
                            style={{
                              maxWidth: "120px",
                              maxHeight: "120px",
                              width: "auto",
                              height: "auto",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Country Demand Layout - Flipped */}
                  {/* Left Content - Top Negara Section dengan ukuran container yang sama */}
                  <div className="flex flex-col justify-center">
                    <div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg w-full h-full flex flex-col relative overflow-hidden"
                      style={{ borderRadius: "20px", minHeight: "350px" }}
                    >
                      {/* Title dengan margin yang diperkecil */}
                      <div
                        className="border-2 border-gray-800 px-8 py-4 mb-8 mt-2 self-center"
                        style={{ borderRadius: "30px" }}
                      >
                        <h3
                          className="font-bold text-gray-900 text-center"
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700,
                            fontSize: "32px",
                          }}
                        >
                          Top Negara Bulan Ini
                        </h3>
                      </div>

                      {/* Content dynamic country rata kiri dengan vector sebaris */}
                      <div className="flex items-center justify-start space-x-4 ml-4 pr-4">
                        <div className="flex flex-col items-start space-y-2">
                          <div className="flex items-center space-x-3">
                            {countryDemands.length > 0 ? (
                              <>
                                <span className="text-3xl">
                                  {countryDemands[0].flag}
                                </span>
                                <div
                                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                                  style={{
                                    fontFamily:
                                      "'Product Sans', 'Google Sans Text', sans-serif",
                                    fontWeight: 700,
                                  }}
                                >
                                  {countryDemands[0].country}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-12 h-12 bg-gray-200 rounded-full shimmer"></div>
                                <div
                                  className="h-8 bg-gray-200 rounded shimmer"
                                  style={{ width: "120px" }}
                                ></div>
                              </>
                            )}
                          </div>

                          <div
                            className="text-lg text-gray-700"
                            style={{
                              fontFamily:
                                "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {countryDemands.length > 0 ? (
                              `Total Ekspor: ${countryDemands[0].totalValue}`
                            ) : (
                              <div
                                className="h-6 bg-gray-200 rounded shimmer"
                                style={{ width: "200px" }}
                              ></div>
                            )}
                          </div>
                        </div>

                        {/* Vector dengan batasan margin yang ketat - sebaris */}
                        <div className="flex-shrink-0 max-w-[140px] ml-auto">
                          <img
                            src={vectorImage}
                            alt="Market Trend Vector"
                            className="object-contain w-full h-auto"
                            style={{
                              maxWidth: "140px",
                              maxHeight: "140px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Market Trend Analysis */}
                  <div className="text-gray-800 flex flex-col justify-center">
                    <h1
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                      style={{
                        fontFamily:
                          "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 700,
                        color: "#2D3748",
                      }}
                    >
                      Market Trend Analysis
                    </h1>
                    {/* Description for logged in users */}
                    {!isGuest && (
                      <p className="text-lg sm:text-xl text-gray-600 font-light mb-6 leading-relaxed">
                        Analisis mendalam tentang tren pasar ekspor Indonesia
                        dengan data real-time dan insights yang dapat membantu
                        Anda membuat keputusan bisnis yang tepat.
                      </p>
                    )}
                    {/* Preview Mode Explanation for Guest Users */}
                    {isGuest && (
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-4 border-2 border-amber-300 shadow-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              P
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              Preview Mode
                            </h4>
                            <p className="text-gray-600 mb-3">
                              Ini adalah preview. Silahkan Sign In untuk full
                              access.
                            </p>
                            <button
                              onClick={handlePreviewSignIn}
                              className="bg-green-600 text-white py-2 px-6 rounded-full font-medium hover:bg-green-700 transition-colors text-sm"
                            >
                              Sign In Sekarang
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons dengan simbol di kanan */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => handleTabChange("seasonal")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "seasonal"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Seasonal Trends</span>
                        <Leaf className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleTabChange("country")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "country"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Country Demand</span>
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Title dengan full width dan border melengkung hitam */}
        <div className="mb-4 sm:mb-6 w-full">
          <div
            className="inline-block px-8 py-3 border-4 border-black"
            style={{ borderRadius: "50px" }}
          >
            <h2
              className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-bold text-gray-900"
              style={{
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 700,
              }}
            >
              {activeTab === "seasonal" ? "Seasonal Trends" : "Country Demand"}
            </h2>
          </div>
        </div>

        {/* Content Area dengan full width */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 w-full">
          {/* Seasonal Trends Tab - Grid 2x2 dengan Pagination */}
          {activeTab === "seasonal" && (
            <div className="space-y-6">
              {/* Loading State with Shimmer */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Shimmer for 4 seasonal trend cards */}
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div
                            className="h-5 bg-gray-200 rounded shimmer mb-2"
                            style={{ width: "80%" }}
                          ></div>
                          <div
                            className="h-4 bg-gray-200 rounded shimmer"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                        <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div
                            className="h-3 bg-gray-200 rounded shimmer mb-2"
                            style={{ width: "120px" }}
                          ></div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {[1, 2, 3].map((country) => (
                              <div
                                key={country}
                                className="w-16 h-6 bg-gray-200 rounded-full shimmer"
                              ></div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div
                            className="h-4 bg-gray-200 rounded shimmer"
                            style={{ width: "100px" }}
                          ></div>
                          <div
                            className="h-4 bg-gray-200 rounded shimmer"
                            style={{ width: "80px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                      onClick={fetchSeasonalTrends}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Data Grid 2x2 Layout */}
              {!loading && !error && seasonalTrends.length > 0 && (
                <>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 transition-all duration-300 ${
                      isSeasonalTransitioning
                        ? "opacity-50 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    {currentSeasonalItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3
                              className="font-semibold text-gray-900 text-base sm:text-lg"
                              style={{
                                fontFamily:
                                  "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              {item.product}
                            </h3>
                            <p
                              className="text-sm text-gray-500"
                              style={{
                                fontFamily:
                                  "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 400,
                              }}
                            >
                              {item.season}
                            </p>
                          </div>
                          <div
                            className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                              item.trend === "up"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.trend === "up" ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            <span
                              style={{
                                fontFamily:
                                  "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              {item.percentage}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span
                              className="text-xs font-medium text-gray-500 tracking-wide"
                              style={{
                                fontFamily:
                                  "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              Target Countries
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.countries.map((country, idx) => (
                                <button
                                  key={idx}
                                  onClick={() =>
                                    handleCountryClick(country.code)
                                  }
                                  className="bg-gray-100 text-gray-700 px-3 py-1 text-xs hover:bg-gray-200 transition-colors cursor-pointer flex items-center space-x-1"
                                  style={{
                                    fontFamily:
                                      "'Google Sans Text', 'Roboto', sans-serif",
                                    fontWeight: 400,
                                    borderRadius: "15px",
                                  }}
                                >
                                  <span>{country.name}</span>
                                  <span>{country.flag}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span
                              className="text-sm text-gray-600"
                              style={{
                                fontFamily:
                                  "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 400,
                              }}
                            >
                              Harga Rata-rata:
                            </span>
                            <span
                              className="font-semibold text-gray-900 text-sm"
                              style={{
                                fontFamily:
                                  "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls for Seasonal */}
                  {totalSeasonalPages > 1 && (
                    <div className="flex justify-center items-center space-x-6 mt-6">
                      <button
                        onClick={() =>
                          handleSeasonalPageChange(
                            Math.max(0, seasonalCurrentPage - 1)
                          )
                        }
                        disabled={seasonalCurrentPage === 0}
                        className="w-10 h-10 rounded-full border-2 border-gray-800 bg-white text-gray-800 hover:bg-gray-50 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <span className="text-sm text-gray-600">
                        Page {seasonalCurrentPage + 1} of {totalSeasonalPages}
                      </span>

                      <button
                        onClick={() =>
                          handleSeasonalPageChange(
                            Math.min(
                              totalSeasonalPages - 1,
                              seasonalCurrentPage + 1
                            )
                          )
                        }
                        disabled={
                          seasonalCurrentPage === totalSeasonalPages - 1
                        }
                        className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-400 flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* No Data State */}
              {!loading && !error && seasonalTrends.length === 0 && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      No seasonal trends data available
                    </p>
                    <button
                      onClick={fetchSeasonalTrends}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Country Demand Tab - Vertical List dengan Pagination */}
          {activeTab === "country" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Loading State with Shimmer */}
              {countryLoading && (
                <div className="space-y-6">
                  {/* Shimmer for 3 country cards */}
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden w-full"
                    >
                      {/* Country Header Shimmer */}
                      <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full shimmer"></div>
                            <div>
                              <div
                                className="h-5 bg-gray-200 rounded shimmer mb-2"
                                style={{ width: "120px" }}
                              ></div>
                              <div
                                className="h-4 bg-gray-200 rounded shimmer"
                                style={{ width: "180px" }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
                        </div>
                      </div>

                      {/* Products Section Shimmer */}
                      <div className="p-4 sm:p-6">
                        <div
                          className="h-5 bg-gray-200 rounded shimmer mb-4"
                          style={{ width: "250px" }}
                        ></div>

                        <div className="relative">
                          {/* Product Cards Shimmer */}
                          <div className="flex gap-4 overflow-x-auto pb-4">
                            {[1, 2, 3].map((product) => (
                              <div
                                key={product}
                                className="flex-shrink-0 p-3 sm:p-4 bg-gray-50 rounded-lg"
                                style={{ minWidth: "250px" }}
                              >
                                <div className="flex-1">
                                  <div
                                    className="h-4 bg-gray-200 rounded shimmer mb-2"
                                    style={{ width: "80%" }}
                                  ></div>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-16 h-5 bg-gray-200 rounded-full shimmer"></div>
                                    <div className="w-20 h-4 bg-gray-200 rounded shimmer"></div>
                                  </div>
                                  <div className="text-right">
                                    <div
                                      className="h-4 bg-gray-200 rounded shimmer ml-auto"
                                      style={{ width: "60%" }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {countryError && !countryLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <p className="text-red-600 mb-4">{countryError}</p>
                    <button
                      onClick={fetchCountryDemands}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Data List */}
              {!countryLoading &&
                !countryError &&
                countryDemands.length > 0 && (
                  <>
                    <div
                      className={`transition-all duration-300 ${
                        isCountryTransitioning
                          ? "opacity-50 scale-95"
                          : "opacity-100 scale-100"
                      }`}
                    >
                      {currentCountryItems.map((country, index) => (
                        <div
                          key={country.code}
                          className="bg-white rounded-xl border border-gray-100 overflow-hidden w-full"
                        >
                          {/* Country Header */}
                          <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl sm:text-2xl">
                                  {country.flag}
                                </span>
                                <div>
                                  <h3
                                    className="font-semibold text-gray-900 text-base sm:text-lg"
                                    style={{
                                      fontFamily:
                                        "'Product Sans', 'Google Sans Text', sans-serif",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {country.country}
                                  </h3>
                                  <p
                                    className="text-sm text-gray-600"
                                    style={{
                                      fontFamily:
                                        "'Google Sans Text', 'Roboto', sans-serif",
                                      fontWeight: 400,
                                    }}
                                  >
                                    Total Nilai Ekspor: {country.totalValue}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  parseFloat(
                                    country.growth.replace(/[+%]/g, "")
                                  ) >= 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {parseFloat(
                                  country.growth.replace(/[+%]/g, "")
                                ) >= 0 ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <TrendingDown className="w-3 h-3" />
                                )}
                                <span
                                  style={{
                                    fontFamily:
                                      "'Product Sans', 'Google Sans Text', sans-serif",
                                    fontWeight: 500,
                                  }}
                                >
                                  {country.growth}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Products List - Horizontal Scrollable dengan Arrow Navigation */}
                          <div className="p-4 sm:p-6">
                            <h4
                              className="font-medium text-gray-900 mb-4 text-base sm:text-lg"
                              style={{
                                fontFamily:
                                  "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              Produk dengan Permintaan Tertinggi
                            </h4>

                            <div className="relative">
                              {/* Product Carousel Navigation - Only show if content is scrollable */}
                              {showArrows[index] && (
                                <>
                                  <button
                                    onClick={() => scrollProductsLeft(index)}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                                    style={{ marginLeft: "-20px" }}
                                  >
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                  </button>

                                  <button
                                    onClick={() => scrollProductsRight(index)}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                                    style={{ marginRight: "-20px" }}
                                  >
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                  </button>
                                </>
                              )}

                              {/* Scrollable Products Container */}
                              <div
                                ref={(el) => {
                                  countryProductsRefs.current[index] = el;
                                  // Check if arrows are needed after the element is mounted
                                  if (el) {
                                    setTimeout(
                                      () => checkIfArrowsNeeded(index),
                                      100
                                    );
                                  }
                                }}
                                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                              >
                                {country.topProducts.map((product, idx) => (
                                  <div
                                    key={idx}
                                    className="flex-shrink-0 p-3 sm:p-4 bg-gray-50 rounded-lg"
                                    style={{ minWidth: "250px" }}
                                  >
                                    <div className="flex-1">
                                      <h5
                                        className="font-medium text-gray-900 text-sm sm:text-base mb-2"
                                        style={{
                                          fontFamily:
                                            "'Product Sans', 'Google Sans Text', sans-serif",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {product.name}
                                      </h5>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <span
                                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                                            product.demand === "Sangat Tinggi"
                                              ? "bg-red-100 text-red-800"
                                              : product.demand === "Tinggi"
                                              ? "bg-green-100 text-green-800"
                                              : product.demand === "Medium"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-gray-100 text-gray-800"
                                          }`}
                                          style={{
                                            fontFamily:
                                              "'Google Sans Text', 'Roboto', sans-serif",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {product.demand}
                                        </span>
                                        <span
                                          className="text-xs text-gray-500"
                                          style={{
                                            fontFamily:
                                              "'Google Sans Text', 'Roboto', sans-serif",
                                            fontWeight: 400,
                                          }}
                                        >
                                          Growth: {product.growth}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <span
                                          className="font-semibold text-gray-900 text-xs sm:text-sm"
                                          style={{
                                            fontFamily:
                                              "'Product Sans', 'Google Sans Text', sans-serif",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {product.value}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Pagination Controls for Country */}
                      {totalCountryPages > 1 && (
                        <div className="flex justify-center items-center space-x-6 mt-6">
                          <button
                            onClick={() =>
                              handleCountryPageChange(
                                Math.max(0, countryCurrentPage - 1)
                              )
                            }
                            disabled={countryCurrentPage === 0}
                            className="w-10 h-10 rounded-full border-2 border-gray-800 bg-white text-gray-800 hover:bg-gray-50 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 flex items-center justify-center transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>

                          <span className="text-sm text-gray-600">
                            Page {countryCurrentPage + 1} of {totalCountryPages}
                          </span>

                          <button
                            onClick={() =>
                              handleCountryPageChange(
                                Math.min(
                                  totalCountryPages - 1,
                                  countryCurrentPage + 1
                                )
                              )
                            }
                            disabled={
                              countryCurrentPage === totalCountryPages - 1
                            }
                            className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-400 flex items-center justify-center transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {/* No Data State */}
              {!countryLoading &&
                !countryError &&
                countryDemands.length === 0 && (
                  <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        No country demands data available
                      </p>
                      <button
                        onClick={fetchCountryDemands}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Loading Animation Overlay for Preview Sign In */}
      {isLoadingAnimation && (
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
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <p className="text-gray-600 font-light">
              {loadingProgress < 50
                ? "Initializing..."
                : loadingProgress < 80
                ? "Redirecting to login..."
                : "Almost ready..."}
            </p>
          </div>
        </div>
      )}
      {/* CSS untuk hide scrollbar dan shimmer effect */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
