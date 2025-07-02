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
    <div 
      className={`min-h-screen transition-all duration-600 font-sans ${
        isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
      }`}
      style={{ backgroundColor: '#E5E7EB' }}
    >
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-9xl font-bold tracking-tight leading-none m-0"
            style={{ color: '#000000' }}
          >
            ExportCo
          </h1>
        </div>

        {/* Feature List */}
        <div className="mb-0">
          {/* Top border line */}
          <div 
            className="w-32 h-px mx-auto mb-0"
            style={{ backgroundColor: '#D1D5DB' }}
          ></div>
          
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => featureRefs.current[feature.id] = el}
              className={`cursor-pointer transition-all duration-500 ease-in-out ${
                selectedFeature?.id === feature.id && isTransitioning 
                  ? 'transform scale-110 z-10' 
                  : ''
              }`}
              onMouseEnter={() => handleFeatureHover(feature.id)}
              onMouseLeave={handleFeatureLeave}
              onClick={() => handleFeatureClick(feature)}
            >
              {/* Main Row */}
              <div 
                className={`py-8 transition-all duration-300 ${
                  hoveredFeature === feature.id ? '' : ''
                }`}
                style={{ 
                  backgroundColor: hoveredFeature === feature.id ? '#F3F4F6' : 'transparent' 
                }}
              >
                <div className="text-center">
                  {/* Category */}
                  <span 
                    className="block text-sm font-bold uppercase tracking-wider mb-2"
                    style={{ color: '#6B7280' }}
                  >
                    {feature.category}
                  </span>
                  
                  {/* Title with Arrow */}
                  <div className="flex items-center justify-center space-x-4">
                    <h2 
                      className={`text-4xl font-bold m-0 leading-tight transition-transform duration-300 ${
                        hoveredFeature === feature.id ? 'scale-105' : ''
                      }`}
                      style={{ color: '#000000' }}
                    >
                      {feature.title}
                    </h2>
                    <ArrowUpRight 
                      className={`w-6 h-6 transition-transform duration-300 ${
                        hoveredFeature === feature.id ? 'translate-x-1 -translate-y-1' : ''
                      }`}
                      style={{ color: '#000000' }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Content on Hover */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  hoveredFeature === feature.id ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  maxHeight: hoveredFeature === feature.id ? '16rem' : '0'
                }}
              >
                <div 
                  className="pb-8 px-4"
                  style={{ backgroundColor: '#F3F4F6' }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left - Description */}
                    <div className="space-y-4">
                      <h3 
                        className="text-lg font-bold text-center lg:text-left m-0"
                        style={{ color: '#000000' }}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="text-sm leading-relaxed text-center lg:text-left m-0"
                        style={{ color: '#6B7280' }}
                      >
                        {feature.description}
                      </p>
                    </div>

                    {/* Right - Preview Video/Image */}
                    <div className="relative">
                      <div 
                        className="aspect-video rounded-lg border overflow-hidden shadow-sm relative"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          borderColor: '#D1D5DB'
                        }}
                      >
                        {/* Default placeholder */}
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)' 
                          }}
                        >
                          <div className="text-center">
                            <div 
                              className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm"
                              style={{ 
                                backgroundColor: '#FFFFFF',
                                color: '#6B7280'
                              }}
                            >
                              {feature.icon}
                            </div>
                            <h4 
                              className="text-lg font-medium mb-2 m-0"
                              style={{ 
                                color: '#374151'
                              }}
                            >
                              {feature.title}
                            </h4>
                            <p 
                              className="text-sm m-0"
                              style={{ 
                                color: '#6B7280'
                              }}
                            >
                              Dashboard Preview
                            </p>
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
                <div 
                  className="w-32 h-px mx-auto"
                  style={{ backgroundColor: '#D1D5DB' }}
                ></div>
              )}
            </div>
          ))}
          
          {/* Bottom border line */}
          <div 
            className="w-32 h-px mx-auto"
            style={{ backgroundColor: '#D1D5DB' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
