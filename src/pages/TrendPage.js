// src/pages/TrendPage.js
import React, { useState, useEffect } from "react";
import { Calendar, Globe, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { useLocation } from "react-router-dom";
// Import vector image (jika menggunakan src/assets)
import vectorImage from '../assets/images/vector.png';

export default function TrendPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("seasonal");

  // Check if navigated from ShippingPage with specific tab
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab === 'country-demand' ? 'country' : location.state.activeTab);
    }
  }, [location.state]);

  const seasonalTrends = [
    {
      product: "Kopi Arabika",
      season: "Q1 2025",
      trend: "up",
      percentage: "+25%",
      description: "Permintaan tinggi menjelang musim semi di Eropa",
      countries: ["Jerman", "Belanda", "Italia"],
      price: "Rp 85,000/kg"
    },
    {
      product: "Rempah-rempah",
      season: "Q2 2025", 
      trend: "up",
      percentage: "+18%",
      description: "Musim festival dan perayaan di Asia Tenggara",
      countries: ["Singapura", "Malaysia", "Thailand"],
      price: "Rp 120,000/kg"
    },
    {
      product: "Produk Kelapa",
      season: "Q3 2025",
      trend: "down",
      percentage: "-8%",
      description: "Penurunan sementara sebelum musim liburan",
      countries: ["Australia", "Selandia Baru"],
      price: "Rp 45,000/kg"
    },
    {
      product: "Tekstil Batik",
      season: "Q4 2025",
      trend: "up",
      percentage: "+35%",
      description: "Musim liburan dan gift season",
      countries: ["Jepang", "Korea Selatan", "USA"],
      price: "Rp 250,000/pcs"
    }
  ];

  const countryDemands = [
    {
      country: "Jepang",
      flag: "🇯🇵",
      topProducts: [
        { name: "Udang Beku", demand: "Sangat Tinggi", growth: "+22%", value: "Rp 180,000/kg" },
        { name: "Kopi Premium", demand: "Tinggi", growth: "+15%", value: "Rp 95,000/kg" },
        { name: "Furniture Kayu", demand: "Sedang", growth: "+8%", value: "Rp 2,500,000/unit" }
      ],
      totalValue: "Rp 2.8 Triliun",
      growth: "+12%"
    },
    {
      country: "Jerman", 
      flag: "🇩🇪",
      topProducts: [
        { name: "Minyak Kelapa", demand: "Sangat Tinggi", growth: "+28%", value: "Rp 65,000/L" },
        { name: "Rempah Organik", demand: "Tinggi", growth: "+20%", value: "Rp 150,000/kg" },
        { name: "Kerajinan Tangan", demand: "Sedang", growth: "+10%", value: "Rp 500,000/pcs" }
      ],
      totalValue: "Rp 1.9 Triliun",
      growth: "+18%"
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section - Meniru layout "Harness the Power of the Sun" */}
        <div 
          className="relative rounded-3xl overflow-hidden mb-8"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
            minHeight: '400px'
          }}
        >
          {/* Background Pattern/Texture */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10 p-8 lg:p-12 h-full flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-white">
                {/* Main Title - Menggantikan "Harness the Power of the Sun" */}
                <h1 
                  className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{ 
                    fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 700
                  }}
                >
                  Market Trend
                  <br />
                  Analysis
                </h1>

                {/* Description - Menggantikan "Eco-friendly..." */}
                <p 
                  className="text-lg lg:text-xl mb-8 text-blue-100 leading-relaxed"
                  style={{ 
                    fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                    fontWeight: 400
                  }}
                >
                  Analisis mendalam tentang tren pasar ekspor berdasarkan musim dan permintaan negara. 
                  Temukan peluang terbaik untuk produk Anda di pasar internasional.
                </p>

                {/* Navigation Buttons - Menggantikan "Explore Products" */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setActiveTab("seasonal")}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      activeTab === "seasonal"
                        ? "bg-white text-blue-600 shadow-lg"
                        : "bg-blue-500/20 text-white border border-white/30 hover:bg-white/10"
                    }`}
                    style={{ 
                      fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 600
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                    Seasonal Trends ⚡
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("country")}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      activeTab === "country"
                        ? "bg-white text-blue-600 shadow-lg"
                        : "bg-blue-500/20 text-white border border-white/30 hover:bg-white/10"
                    }`}
                    style={{ 
                      fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 600
                    }}
                  >
                    <Globe className="w-4 h-4" />
                    Country Demand
                  </button>
                </div>
              </div>

              {/* Right Content - Stats & Vector */}
              <div className="space-y-6">
                
                {/* Stats Cards - Menggantikan posisi "30% Reduced Carbon Footprint" dan "20% Reduced Energy Bills" */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Stats Card 1 */}
                  <div 
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                    style={{ borderRadius: '20px' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div 
                          className="text-3xl font-bold text-gray-900 mb-1"
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700
                          }}
                        >
                          30%
                        </div>
                        <div 
                          className="text-sm text-gray-600"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          Export Growth
                        </div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </div>

                  {/* Stats Card 2 */}
                  <div 
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                    style={{ borderRadius: '20px' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div 
                          className="text-3xl font-bold text-gray-900 mb-1"
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700
                          }}
                        >
                          20%
                        </div>
                        <div 
                          className="text-sm text-gray-600"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          Cost Reduction
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ArrowDown className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vector Image Container dengan Label di bawah */}
                <div 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                  style={{ borderRadius: '20px' }}
                >
                  {/* Vector Image */}
                  <div className="flex items-center justify-center mb-4" style={{ minHeight: '150px' }}>
                    {/* Jika menggunakan src/assets */}
                    <img 
                      src={vectorImage} 
                      alt="Market Trend Vector" 
                      className="object-contain"
                      style={{ 
                        maxWidth: '120px',  // Mengecilkan gambar dari 200px menjadi 120px
                        maxHeight: '120px', // Mengecilkan gambar dari 200px menjadi 120px
                        width: 'auto',
                        height: 'auto'
                      }}
                    />
                    
                    {/* Jika menggunakan public folder, uncomment baris di bawah dan comment baris di atas */}
                    {/* <img 
                      src="/images/vector.png" 
                      alt="Market Trend Vector" 
                      className="object-contain"
                      style={{ 
                        maxWidth: '120px',
                        maxHeight: '120px',
                        width: 'auto',
                        height: 'auto'
                      }}
                    /> */}
                    
                    {/* Placeholder jika gambar belum ada */}
                    {/* <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <TrendingUp size={32} />
                      </div>
                      <p className="text-sm">Vector Image</p>
                      <p className="text-xs text-gray-500">Market Analysis</p>
                    </div> */}
                  </div>

                  {/* Label Kopi Arabika di bawah gambar */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div>
                        <div 
                          className="text-2xl font-bold text-gray-900"
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700
                          }}
                        >
                          25%
                        </div>
                        <div 
                          className="text-sm text-gray-600"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          Kopi Arabika
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>

                {/* User Rating - Menggantikan "10K+ Worldwide Users" */}
                <div 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                  style={{ borderRadius: '20px' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">📊</div>
                      <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">📈</div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">💼</div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">🌍</div>
                    </div>
                    <div>
                      <div className="flex text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                      <div 
                        className="text-sm font-semibold text-gray-900"
                        style={{ 
                          fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600
                        }}
                      >
                        1000+ Export Companies
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Title */}
        <div className="mb-6">
          <h2 
            className="text-2xl font-bold text-gray-900"
            style={{ 
              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
              fontWeight: 500
            }}
          >
            {activeTab === "seasonal" ? "Seasonal Trends" : "Country Demand"}
          </h2>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Seasonal Trends Tab */}
          {activeTab === "seasonal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seasonalTrends.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 
                          className="font-semibold text-gray-900 text-lg"
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          {item.product}
                        </h3>
                        <p 
                          className="text-sm text-gray-500"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 400
                          }}
                        >
                          {item.season}
                        </p>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                        item.trend === "up" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {item.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        <span 
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          {item.percentage}
                        </span>
                      </div>
                    </div>

                    <p 
                      className="text-gray-600 text-sm mb-4"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400
                      }}
                    >
                      {item.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span 
                          className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          Target Countries
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.countries.map((country, idx) => (
                            <span 
                              key={idx} 
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              style={{ 
                                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 400
                              }}
                            >
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span 
                          className="text-sm text-gray-600"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 400
                          }}
                        >
                          Harga Rata-rata:
                        </span>
                        <span 
                          className="font-semibold text-gray-900"
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500
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
          )}

          {/* Country Demand Tab */}
          {activeTab === "country" && (
            <div className="space-y-8">
              {countryDemands.map((country, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  {/* Country Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <h3 
                            className="font-semibold text-gray-900 text-lg"
                            style={{ 
                              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            {country.country}
                          </h3>
                          <p 
                            className="text-sm text-gray-600"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400
                            }}
                          >
                            Total Nilai Ekspor: {country.totalValue}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span 
                          style={{ 
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          {country.growth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="p-6">
                    <h4 
                      className="font-medium text-gray-900 mb-4"
                      style={{ 
                        fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      Produk dengan Permintaan Tertinggi
                    </h4>
                    <div className="space-y-4">
                      {country.topProducts.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h5 
                              className="font-medium text-gray-900"
                              style={{ 
                                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500
                              }}
                            >
                              {product.name}
                            </h5>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                product.demand === "Sangat Tinggi" 
                                  ? "bg-red-100 text-red-800"
                                  : product.demand === "Tinggi"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                              style={{ 
                                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 500
                              }}
                              >
                                {product.demand}
                              </span>
                              <span 
                                className="text-xs text-gray-500"
                                style={{ 
                                  fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                                  fontWeight: 400
                                }}
                              >
                                Growth: {product.growth}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span 
                              className="font-semibold text-gray-900"
                              style={{ 
                                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500
                              }}
                            >
                              {product.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
