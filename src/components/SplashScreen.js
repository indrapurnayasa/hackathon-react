// src/components/SplashScreen.js
import React, { useState, useRef, useEffect } from "react";
import { Bot, Truck, TrendingUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SplashScreen = ({ onContinue }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigate = useNavigate();
  const featureRefs = useRef({});

  const features = [
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      category: 'AI-POWERED',
      icon: <Bot className="w-8 h-8" />,
      route: '/dashboard/ai-assistant',
      description: 'Generate dokumen ekspor, email bisnis profesional, dan estimasi biaya secara otomatis dengan teknologi AI terdepan',
      previewVideo: '/assets/Fitur1.mp4',
      previewImage: '/assets/ai-assistant-preview.jpg'
    },
    {
      id: 'shipping',
      title: 'Shipping Manager', 
      category: 'LOGISTICS',
      icon: <Truck className="w-8 h-8" />,
      route: '/dashboard/shipping',
      description: 'Kelola alur pengiriman, tracking real-time, dan manajemen dokumen ekspor dengan sistem terintegrasi',
      previewVideo: '/assets/Fitur2.mp4',
      previewImage: '/assets/shipping-preview.jpg'
    },
    {
      id: 'trend',
      title: 'Market Analytics',
      category: 'ANALYTICS', 
      icon: <TrendingUp className="w-8 h-8" />,
      route: '/dashboard/trend',
      description: 'Analisis tren pasar global, permintaan produk, dan insight bisnis untuk strategi ekspor yang tepat',
      previewVideo: '/assets/Fitur3.mp4',
      previewImage: '/assets/trend-preview.jpg'
    }
  ];

  // Auto scroll to expanded feature
  useEffect(() => {
    if (hoveredFeature && featureRefs.current[hoveredFeature]) {
      featureRefs.current[hoveredFeature].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [hoveredFeature]);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setIsTransitioning(true);
    
    // Zoom in animation then navigate
    setTimeout(() => {
      navigate(feature.route);
      onContinue();
    }, 600);
  };

  const handleFeatureHover = (featureId) => {
    setHoveredFeature(featureId);
  };

  const handleFeatureLeave = () => {
    setHoveredFeature(null);
  };

  return (
    <div className={`min-h-screen bg-gray-200 transition-all duration-600 ${
      isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
    }`}>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-9xl font-light text-black tracking-tight">ExportCo</h1>
        </div>

        {/* Feature List dengan Hover Expand */}
        <div className="space-y-0">
          {/* Top border line */}
          <div className="w-32 h-px bg-gray-400 mx-auto mb-0"></div>
          
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => featureRefs.current[feature.id] = el}
              className={`group cursor-pointer transition-all duration-500 ease-in-out ${
                selectedFeature?.id === feature.id && isTransitioning 
                  ? 'transform scale-110 z-10' 
                  : ''
              }`}
              onMouseEnter={() => handleFeatureHover(feature.id)}
              onMouseLeave={handleFeatureLeave}
              onClick={() => handleFeatureClick(feature)}
            >
              {/* Main Row */}
              <div className={`py-8 transition-all duration-300 ${
                hoveredFeature === feature.id ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}>
                <div className="text-center">
                  {/* Category */}
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-2">
                    {feature.category}
                  </span>
                  
                  {/* Title with Arrow */}
                  <div className="flex items-center justify-center space-x-4">
                    <h2 className={`text-4xl font-light text-black transition-transform duration-300 ${
                      hoveredFeature === feature.id ? 'scale-105' : 'group-hover:scale-105'
                    }`}>
                      {feature.title}
                    </h2>
                    <ArrowUpRight className={`w-6 h-6 text-black transition-transform duration-300 ${
                      hoveredFeature === feature.id ? 'translate-x-1 -translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Expanded Content on Hover */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  hoveredFeature === feature.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-8 px-4 bg-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left - Description */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-black text-center lg:text-left">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm text-center lg:text-left">
                        {feature.description}
                      </p>
                    </div>

                    {/* Right - Preview Video/Image */}
                    <div className="relative">
                      <div className="aspect-video bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        {/* Default placeholder */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                              {feature.icon}
                            </div>
                            <h4 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-500">Dashboard Preview</p>
                          </div>
                        </div>
                        
                        {/* Video overlay */}
                        <video
                          src={feature.previewVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                          onLoadedData={(e) => {
                            e.target.style.opacity = '1';
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border line after each item */}
              {index < features.length - 1 && (
                <div className="w-32 h-px bg-gray-400 mx-auto"></div>
              )}
            </div>
          ))}
          
          {/* Bottom border line */}
          <div className="w-32 h-px bg-gray-400 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
