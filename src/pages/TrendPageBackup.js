// src/pages/TrendPage.js
import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Globe,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
// Import vector image (jika menggunakan src/assets)
import vectorImage from "../assets/images/vector.png";

export default function TrendPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("seasonal");
  const seasonalScrollRef = useRef(null);
  const countryProductsRefs = useRef({});

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
      state: { selectedCountry: countryCode },
    });
  };

  // Scroll functions for carousel
  const scrollSeasonalLeft = () => {
    if (seasonalScrollRef.current) {
      seasonalScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollSeasonalRight = () => {
    if (seasonalScrollRef.current) {
      seasonalScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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

  const seasonalTrends = [
    {
      product: "Kopi Arabika",
      season: "Q1 2025",
      trend: "up",
      percentage: "+25%",
      countries: [
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Singapore", code: "SG", flag: "🇸🇬" },
      ],
      price: "Rp 85,000/kg",
    },
    {
      product: "Rempah-rempah",
      season: "Q2 2025",
      trend: "up",
      percentage: "+18%",
      countries: [
        { name: "Spain", code: "ES", flag: "🇪🇸" },
        { name: "Kenya", code: "KE", flag: "🇰🇪" },
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
      ],
      price: "Rp 120,000/kg",
    },
    {
      product: "Produk Kelapa",
      season: "Q3 2025",
      trend: "down",
      percentage: "-8%",
      countries: [
        { name: "Singapore", code: "SG", flag: "🇸🇬" },
        { name: "Spain", code: "ES", flag: "🇪🇸" },
      ],
      price: "Rp 45,000/kg",
    },
    {
      product: "Tekstil Batik",
      season: "Q4 2025",
      trend: "up",
      percentage: "+35%",
      countries: [
        { name: "Kenya", code: "KE", flag: "🇰🇪" },
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Singapore", code: "SG", flag: "🇸🇬" },
      ],
      price: "Rp 250,000/pcs",
    },
    {
      product: "Udang Beku",
      season: "Q1 2025",
      trend: "up",
      percentage: "+22%",
      countries: [
        { name: "Spain", code: "ES", flag: "🇪🇸" },
        { name: "Kenya", code: "KE", flag: "🇰🇪" },
      ],
      price: "Rp 180,000/kg",
    },
    {
      product: "Minyak Kelapa",
      season: "Q2 2025",
      trend: "up",
      percentage: "+28%",
      countries: [
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Singapore", code: "SG", flag: "🇸🇬" },
        { name: "Spain", code: "ES", flag: "🇪🇸" },
      ],
      price: "Rp 65,000/L",
    },
  ];

  const countryDemands = [
    {
      country: "Malaysia",
      flag: "🇲🇾",
      code: "MY",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 65,000/L",
        },
        {
          name: "Rempah Organik",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 150,000/kg",
        },
        {
          name: "Udang Beku",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 170,000/kg",
        },
        {
          name: "Tekstil Batik",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 250,000/pcs",
        },
        {
          name: "Furniture Kayu",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 2,200,000/unit",
        },
      ],
      totalValue: "Rp 3.2 Triliun",
      growth: "+15%",
    },
    {
      country: "Singapore",
      flag: "🇸🇬",
      code: "SG",
      topProducts: [
        {
          name: "Produk Kelapa",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 48,000/kg",
        },
        {
          name: "Kopi Premium",
          demand: "Sangat Tinggi",
          growth: "+24%",
          value: "Rp 95,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 68,000/L",
        },
        {
          name: "Tekstil Batik",
          demand: "Tinggi",
          growth: "+19%",
          value: "Rp 280,000/pcs",
        },
        {
          name: "Rempah-rempah",
          demand: "Sedang",
          growth: "+14%",
          value: "Rp 125,000/kg",
        },
        {
          name: "Kerajinan Tangan",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 450,000/pcs",
        },
      ],
      totalValue: "Rp 2.8 Triliun",
      growth: "+18%",
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      code: "ES",
      topProducts: [
        {
          name: "Udang Beku",
          demand: "Sangat Tinggi",
          growth: "+26%",
          value: "Rp 185,000/kg",
        },
        {
          name: "Rempah-rempah",
          demand: "Sangat Tinggi",
          growth: "+23%",
          value: "Rp 130,000/kg",
        },
        {
          name: "Produk Kelapa",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 50,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+17%",
          value: "Rp 70,000/L",
        },
        {
          name: "Kopi Arabika",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 88,000/kg",
        },
        {
          name: "Furniture Kayu",
          demand: "Sedang",
          growth: "+11%",
          value: "Rp 2,800,000/unit",
        },
      ],
      totalValue: "Rp 2.1 Triliun",
      growth: "+16%",
    },
    {
      country: "Kenya",
      flag: "🇰🇪",
      code: "KE",
      topProducts: [
        {
          name: "Tekstil Batik",
          demand: "Sangat Tinggi",
          growth: "+32%",
          value: "Rp 260,000/pcs",
        },
        {
          name: "Udang Beku",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 175,000/kg",
        },
        {
          name: "Rempah-rempah",
          demand: "Tinggi",
          growth: "+21%",
          value: "Rp 115,000/kg",
        },
        {
          name: "Kerajinan Tangan",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 520,000/pcs",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+13%",
          value: "Rp 62,000/L",
        },
        {
          name: "Furniture Kayu",
          demand: "Sedang",
          growth: "+9%",
          value: "Rp 2,100,000/unit",
        },
      ],
      totalValue: "Rp 1.8 Triliun",
      growth: "+19%",
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      {/* Container utama dengan full width dan padding responsive */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8">
        {/* Hero Section dengan warna #A0D4CE */}
        <div
          className="relative rounded-3xl overflow-hidden mb-6 sm:mb-8 w-full"
          style={{
            background: "#A0D4CE",
            minHeight: "400px",
          }}
        >
          {/* Background Pattern/Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex items-center">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">
              {/* Left Content - Responsive text sizing */}
              <div className="text-gray-800 flex flex-col justify-center">
                {/* Main Title dalam satu baris */}
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

                {/* Description dengan responsive text */}
                <p
                  className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 leading-relaxed"
                  style={{
                    fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                    fontWeight: 400,
                    color: "#4A5568",
                  }}
                >
                  Analisis mendalam tentang tren pasar ekspor berdasarkan musim
                  dan permintaan negara. Temukan peluang terbaik untuk produk
                  Anda di pasar internasional.
                </p>

                {/* Navigation Buttons - Responsive layout */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setActiveTab("seasonal")}
                    className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
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
                    <Calendar className="w-4 h-4" />
                    Seasonal Trends ⚡
                  </button>

                  <button
                    onClick={() => setActiveTab("country")}
                    className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
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
                    <Globe className="w-4 h-4" />
                    Country Demand
                  </button>
                </div>
              </div>

              {/* Right Content - Top Trend Section */}
              <div className="flex flex-col justify-center">
                {/* Top Trend Bulan Ini Container */}
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-lg w-full h-full flex flex-col relative"
                  style={{ borderRadius: "20px", minHeight: "350px" }}
                >
                  {/* Title dengan border melengkung dan posisi mendekati margin atas */}
                  <div
                    className="border-2 border-gray-800 px-8 py-4 mb-16 mt-4 self-center"
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

                  {/* Content lebih ke kiri dengan simbol naik */}
                  <div className="flex items-center justify-start space-x-6 ml-8">
                    {/* Simbol naik di sebelah kiri 25% */}
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <div
                        className="text-5xl sm:text-6xl font-bold text-gray-900"
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        25%
                      </div>
                    </div>

                    {/* Kopi Arabika Text */}
                    <div
                      className="text-xl sm:text-2xl font-medium text-gray-900"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Kopi Arabika
                    </div>
                  </div>

                  {/* Vector Image di pojok kanan bawah dengan ukuran 220x220px */}
                  <div className="absolute bottom-6 right-6">
                    <img
                      src={vectorImage}
                      alt="Market Trend Vector"
                      className="object-contain"
                      style={{
                        maxWidth: "220px",
                        maxHeight: "220px",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Title dengan full width */}
        <div className="mb-4 sm:mb-6 w-full">
          <h2
            className="text-xl sm:text-2xl font-bold text-gray-900"
            style={{
              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
              fontWeight: 500,
            }}
          >
            {activeTab === "seasonal" ? "Seasonal Trends" : "Country Demand"}
          </h2>
        </div>

        {/* Content Area dengan full width */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 w-full">
          {/* Seasonal Trends Tab - Carousel */}
          {activeTab === "seasonal" && (
            <div className="space-y-6">
              <div className="relative">
                {/* Carousel Navigation Buttons */}
                <button
                  onClick={scrollSeasonalLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                  style={{ marginLeft: "-20px" }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={scrollSeasonalRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                  style={{ marginRight: "-20px" }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>

                {/* Scrollable Container */}
                <div
                  ref={seasonalScrollRef}
                  className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {seasonalTrends.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-shadow flex-shrink-0"
                      style={{ minWidth: "300px" }}
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
                            className="text-xs font-medium text-gray-500 uppercase tracking-wide"
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
                                onClick={() => handleCountryClick(country.code)}
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
              </div>
            </div>
          )}

          {/* Country Demand Tab */}
          {activeTab === "country" && (
            <div className="space-y-6 sm:space-y-8">
              {countryDemands.map((country, index) => (
                <div
                  key={index}
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
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        <TrendingUp className="w-3 h-3" />
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

                  {/* Products List - Scrollable */}
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
                      {/* Product Carousel Navigation */}
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

                      {/* Scrollable Products Container */}
                      <div
                        ref={(el) => (countryProductsRefs.current[index] = el)}
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
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-yellow-100 text-yellow-800"
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
            </div>
          )}
        </div>
      </div>

      {/* CSS untuk hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
