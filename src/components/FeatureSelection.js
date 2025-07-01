// src/components/FeatureSelection.js
import React, { useState } from "react";
import { Bot, Truck, TrendingUp, ArrowRight, Sparkles, FileText, Mail, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureSelection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      subtitle: 'Asisten Pintar Ekspor',
      description: 'Generate dokumen, email, dan estimasi biaya ekspor dengan AI',
      icon: <Bot className="w-8 h-8" />,
      gradient: 'from-blue-500 to-purple-600',
      hoverGradient: 'from-blue-400 to-purple-500',
      bgGradient: 'from-blue-50 to-purple-50',
      route: '/dashboard/ai-assistant',
      preview: {
        title: 'Fitur AI Assistant',
        features: [
          { icon: <FileText className="w-5 h-5" />, text: 'Generate Dokumen Ekspor' },
          { icon: <Mail className="w-5 h-5" />, text: 'Email Bisnis Profesional' },
          { icon: <Calculator className="w-5 h-5" />, text: 'Estimasi Biaya Otomatis' }
        ],
        image: '/api/placeholder/300/200'
      }
    },
    {
      id: 'shipping',
      title: 'Shipping',
      subtitle: 'Manajemen Pengiriman',
      description: 'Kelola alur pengiriman dan tracking ekspor secara real-time',
      icon: <Truck className="w-8 h-8" />,
      gradient: 'from-green-500 to-teal-600',
      hoverGradient: 'from-green-400 to-teal-500',
      bgGradient: 'from-green-50 to-teal-50',
      route: '/dashboard/shipping',
      preview: {
        title: 'Fitur Shipping',
        features: [
          { icon: <Truck className="w-5 h-5" />, text: 'Real-time Tracking' },
          { icon: <FileText className="w-5 h-5" />, text: 'Manajemen Dokumen' },
          { icon: <Calculator className="w-5 h-5" />, text: 'Kalkulasi Ongkir' }
        ],
        image: '/api/placeholder/300/200'
      }
    },
    {
      id: 'trend',
      title: 'Trend',
      subtitle: 'Analisis Pasar',
      description: 'Analisis tren pasar dan permintaan produk ekspor terkini',
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      route: '/dashboard/trend',
      preview: {
        title: 'Fitur Trend Analysis',
        features: [
          { icon: <TrendingUp className="w-5 h-5" />, text: 'Analisis Tren Pasar' },
          { icon: <FileText className="w-5 h-5" />, text: 'Laporan Ekspor' },
          { icon: <Calculator className="w-5 h-5" />, text: 'Prediksi Demand' }
        ],
        image: '/api/placeholder/300/200'
      }
    }
  ];

  const handleFeatureSelect = (feature) => {
    navigate(feature.route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="text-center pt-16 pb-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900">ExportHub</h1>
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Pilih Fitur yang Anda Butuhkan
        </h2>
        
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tiga fitur utama untuk mendukung semua kebutuhan ekspor Anda dengan teknologi AI terdepan
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
                    hoveredFeature === feature.id ? 'ring-4 ring-blue-200' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() => handleFeatureSelect(feature)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    <div className="flex items-center space-x-6">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${hoveredFeature === feature.id ? feature.hoverGradient : feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        {feature.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                          {feature.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-600 mb-3">
                          {feature.subtitle}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      
                      {/* Arrow */}
                      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        <ArrowRight className={`w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 ${
                          hoveredFeature === feature.id ? 'text-blue-600' : ''
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {hoveredFeature ? (
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 animate-in slide-in-from-right duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {features.find(f => f.id === hoveredFeature)?.preview.title}
                    </h3>
                    <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-4xl">
                        {features.find(f => f.id === hoveredFeature)?.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {features.find(f => f.id === hoveredFeature)?.preview.features.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-blue-600">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => handleFeatureSelect(features.find(f => f.id === hoveredFeature))}
                      className={`w-full py-3 px-6 bg-gradient-to-r ${features.find(f => f.id === hoveredFeature)?.gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      Pilih Fitur Ini
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Preview Fitur
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Arahkan cursor ke salah satu fitur untuk melihat preview dan detail lengkapnya
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSelection;
