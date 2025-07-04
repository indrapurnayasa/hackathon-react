// src/pages/TrendPage.js
import React, { useState } from "react";
import { Calendar, Globe, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

export default function TrendPage() {
  const [activeTab, setActiveTab] = useState("seasonal");

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
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold text-gray-900 mb-3"
            style={{ 
              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
              fontWeight: 500
            }}
          >
            Market Trend Analysis
          </h1>
          <p 
            className="text-gray-600 max-w-2xl"
            style={{ 
              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
              fontWeight: 400
            }}
          >
            Analisis mendalam tentang tren pasar ekspor berdasarkan musim dan permintaan negara. 
            Temukan peluang terbaik untuk produk Anda di pasar internasional.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("seasonal")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "seasonal"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Seasonal Trends</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("country")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "country"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Country Demand</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

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

        {/* CTA Section */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center">
          <h3 
            className="text-xl font-semibold text-white mb-3"
            style={{ 
              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
              fontWeight: 500
            }}
          >
            Butuh Analisis Lebih Detail?
          </h3>
          <p 
            className="text-gray-300 mb-6 max-w-2xl mx-auto"
            style={{ 
              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
              fontWeight: 400
            }}
          >
            Dapatkan laporan analisis pasar yang lebih mendalam dan rekomendasi strategi ekspor 
            yang disesuaikan dengan produk Anda.
          </p>
          <button 
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            style={{ 
              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
              fontWeight: 500
            }}
          >
            Request Custom Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
