// src/components/SplashScreen.js
import React, { useState, useRef, useEffect } from "react";
import { Bot, Truck, TrendingUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import video files
import Fitur1 from '../assets/Fitur1.mp4';
import Fitur2 from '../assets/Fitur2.mp4';
import Fitur3 from '../assets/Fitur3.mp4';

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
      previewVideo: Fitur1
    },
    {
      id: 'shipping',
      title: 'Shipping Manager',
      category: 'LOGISTICS',
      icon: <Truck className="w-8 h-8" />,
      route: '/dashboard/shipping',
      description: 'Kelola alur pengiriman, tracking real-time, dan manajemen dokumen ekspor dengan sistem terintegrasi',
      previewVideo: Fitur2
    },
    {
      id: 'trend',
      title: 'Market Analytics',
      category: 'ANALYTICS',
      icon: <TrendingUp className="w-8 h-8" />,
      route: '/dashboard/trend',
      description: 'Analisis tren pasar global, permintaan produk, dan insight bisnis untuk strategi ekspor yang tepat',
      previewVideo: Fitur3
    }
  ];

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setIsTransitioning(true);

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
    <>
      {/* ExportCo - COMPLETELY ISOLATED FIXED CONTAINER */}
      <div 
        style={{ 
          position: 'fixed', 
          left: '10%', 
          top: '50%', 
          marginTop: '-3rem',
          zIndex: 1000, 
          textAlign: 'center',
          pointerEvents: 'none',
          isolation: 'isolate' // ISOLATE FROM PARENT TRANSFORMS
        }}
      >
        <h1 
          className={`transition-opacity duration-600 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            fontFamily: "'Product Sans', 'Google Sans Text', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: '6rem',
            margin: 0,
            letterSpacing: '-0.02em',
            color: '#000000',
            transform: 'none',
            position: 'relative'
          }}
        >
          ExportCo
        </h1>
        <div 
          className={`transition-opacity duration-600 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            marginTop: '0.5rem',
            fontSize: '1rem',
            color: '#000000',
            border: '1px solid #6b7280',
            borderRadius: '9999px',
            padding: '0.25rem 1rem',
            display: 'inline-block',
            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
            fontWeight: 400,
            transform: 'none',
            position: 'relative'
          }}
        >
          2025
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER - COMPLETELY SEPARATE */}
      <div 
        className={`min-h-screen transition-all duration-600 bg-[var(--bg-secondary)] ${
          isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ 
          fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
          isolation: 'isolate' // ISOLATE FROM EXPORTCO
        }}
      >
        <div className="max-w-7xl mx-auto px-8 pt-24">
          <div className="flex justify-end">
            {/* Right Side - Features List */}
            <div className="flex-1 max-w-3xl">
              <div 
                className={`space-y-0 transition-all duration-600 ease-in-out ${
                  isTransitioning ? 'opacity-0 transform scale-110' : 'opacity-100 transform scale-100'
                }`}
              >
                {features.map((feature, index) => (
                  <div key={feature.id}>
                    <div
                      ref={el => featureRefs.current[feature.id] = el}
                      className={`group cursor-pointer transition-all duration-500 ease-in-out`}
                      onMouseEnter={() => handleFeatureHover(feature.id)}
                      onMouseLeave={handleFeatureLeave}
                      onClick={() => handleFeatureClick(feature)}
                    >
                      <div className={`py-8 transition-colors duration-300 ${
                        hoveredFeature === feature.id ? 'bg-[var(--bg-tertiary)]' : 'hover:bg-[var(--bg-tertiary)]'
                      }`}>
                        <div className="text-left">
                          {/* Category dengan border hitam no fill */}
                          <span 
                            className="text-sm font-medium uppercase tracking-wider block mb-2 px-4 py-2 border-2 border-black bg-transparent text-black inline-block"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 500,
                              letterSpacing: '0.1em',
                              borderRadius: '18px',
                              minWidth: '140px'
                            }}
                          >
                            {feature.category}
                          </span>
                          <div className="flex items-center space-x-4">
                            <h2 
                              className={`text-4xl font-light transition-transform duration-300 text-[var(--text-primary)]`}
                              style={{ 
                                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 400,
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {feature.title}
                            </h2>
                            <ArrowUpRight className="w-6 h-6 transition-transform duration-300 text-[var(--text-primary)]" />
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          hoveredFeature === feature.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pb-8 px-4 bg-[var(--bg-tertiary)]">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                              <h3 
                                className="text-lg font-medium text-left text-[var(--text-primary)]"
                                style={{ 
                                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                                  fontWeight: 500
                                }}
                              >
                                {feature.title}
                              </h3>
                              <p 
                                className="leading-relaxed text-sm text-left text-[var(--text-secondary)]"
                                style={{ 
                                  fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                                  fontWeight: 400,
                                  lineHeight: '1.6'
                                }}
                              >
                                {feature.description}
                              </p>
                            </div>
                            <div className="relative">
                              <div className="aspect-video rounded-lg border overflow-hidden shadow-sm bg-[var(--bg-primary)] border-[var(--border-light)]">
                                {/* Video Preview */}
                                <video 
                                  src={feature.previewVideo}
                                  className="w-full h-full object-cover"
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }}
                                />
                                {/* Fallback placeholder */}
                                <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                                  <div className="text-center">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-[var(--bg-tertiary)]">
                                      <div style={{ color: 'var(--text-secondary)' }}>
                                        {feature.icon}
                                      </div>
                                    </div>
                                    <h4 
                                      className="text-sm font-medium mb-1 text-[var(--text-primary)]"
                                      style={{ 
                                        fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                                        fontWeight: 500
                                      }}
                                    >
                                      {feature.title}
                                    </h4>
                                    <p 
                                      className="text-xs text-[var(--text-tertiary)]"
                                      style={{ 
                                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif"
                                      }}
                                    >
                                      Preview Dashboard
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Garis Pembatas antar fitur */}
                    {index < features.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div 
                          style={{ 
                            width: '50%',
                            height: '2px',
                            backgroundColor: 'var(--border-dark)',
                            opacity: 0.3
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div 
            className={`flex justify-center mt-16 transition-all duration-600 ease-in-out ${
              isTransitioning ? 'opacity-0 transform scale-110' : 'opacity-100 transform scale-100'
            }`}
          >
            <div 
              style={{ 
                width: '30%',
                height: '2px',
                backgroundColor: 'var(--border-dark)',
                opacity: 0.3
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
