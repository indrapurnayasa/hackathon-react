// src/pages/ShippingPage.js
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MapPin, Clock, Star, Plane, Ship, HelpCircle } from "lucide-react";
import Globe from 'react-globe.gl';

export default function ShippingPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showRecommendationTooltip, setShowRecommendationTooltip] = useState(false);
  const [recommendationTooltipPosition, setRecommendationTooltipPosition] = useState({ x: 0, y: 0 });
  const helpIconRef = useRef(null);
  const globeEl = useRef();
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  const countries = [
    { 
      code: "JP", 
      name: "Jepang", 
      flag: "🇯🇵", 
      distance: "5,760 km",
      lat: 36.2048,
      lng: 138.2529,
      recommended: false
    },
    { 
      code: "DE", 
      name: "Jerman", 
      flag: "🇩🇪", 
      distance: "11,800 km",
      lat: 51.1657,
      lng: 10.4515,
      recommended: true
    },
    { 
      code: "GB", 
      name: "Inggris", 
      flag: "🇬🇧", 
      distance: "11,900 km",
      lat: 55.3781,
      lng: -3.4360,
      recommended: false
    }
  ];

  const indonesiaCoords = { lat: -0.7893, lng: 113.9213 };
  const GLOBE_ALTITUDE = 0.75;
  
  const [countriesData, setCountriesData] = useState([]);
  
  // Static HTML elements data
  const [htmlElementsData, setHtmlElementsData] = useState(() => {
    function getLabelLatLng(code) {
      switch (code) {
        case 'ID': return { lat: indonesiaCoords.lat - 8, lng: indonesiaCoords.lng };
        case 'JP': return { lat: 36.2048 - 6, lng: 138.2529 };
        case 'DE': return { lat: 51.1657 - 6, lng: 10.4515 };
        case 'GB': return { lat: 55.3781 - 6, lng: -3.4360 };
        default: return { lat: 0, lng: 0 };
      }
    }

    function getFlagLatLng(code) {
      const label = getLabelLatLng(code);
      return { lat: label.lat + 2, lng: label.lng };
    }

    return [
      // Indonesia
      {
        ...getFlagLatLng('ID'),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">${'🇮🇩'}</div>`,
        altitude: 0.08
      },
      {
        ...getLabelLatLng('ID'),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Indonesia</div>`,
        altitude: 0.07
      },
      // Jepang
      {
        ...getFlagLatLng('JP'),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">${'🇯🇵'}</div>`,
        altitude: 0.08
      },
      {
        ...getLabelLatLng('JP'),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Japan</div>`,
        altitude: 0.07
      },
      // Jerman
      {
        ...getFlagLatLng('DE'),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">${'🇩🇪'}</div>`,
        altitude: 0.08
      },
      {
        ...getLabelLatLng('DE'),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Germany</div>`,
        altitude: 0.07
      },
      // Inggris
      {
        ...getFlagLatLng('GB'),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">${'🇬🇧'}</div>`,
        altitude: 0.08
      },
      {
        ...getLabelLatLng('GB'),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">United Kingdom</div>`,
        altitude: 0.07
      }
    ];
  });

  // Calculate tooltip position based on help icon position
  const updateTooltipPosition = () => {
    if (helpIconRef.current) {
      const rect = helpIconRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.right + 8,
        y: rect.top - 8
      });
    }
  };

  const handleTooltipShow = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };

  const handleTooltipHide = () => {
    setShowTooltip(false);
  };

  // Handle recommendation tooltip mouse events
  const handleRecommendationMouseEnter = (event, country) => {
    if (country.recommended) {
      setShowRecommendationTooltip(true);
      updateRecommendationTooltipPosition(event);
    }
  };

  const handleRecommendationMouseMove = (event, country) => {
    if (country.recommended && showRecommendationTooltip) {
      updateRecommendationTooltipPosition(event);
    }
  };

  const handleRecommendationMouseLeave = (country) => {
    if (country.recommended) {
      setShowRecommendationTooltip(false);
    }
  };

  const updateRecommendationTooltipPosition = (event) => {
    setRecommendationTooltipPosition({
      x: event.clientX + 15, // 15px offset dari cursor
      y: event.clientY - 10  // 10px offset dari cursor
    });
  };

  // Setup globe
  useEffect(() => {
    if (globeEl.current && !isGlobeReady) {
      globeEl.current.controls().enableZoom = false;
      globeEl.current.pointOfView({ 
        lat: indonesiaCoords.lat, 
        lng: indonesiaCoords.lng, 
        altitude: GLOBE_ALTITUDE
      }, 0);
      setIsGlobeReady(true);
    }
  }, [isGlobeReady]);

  // Load countries data
  useEffect(() => {
    fetch('/countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountriesData(data.features);
      })
      .catch(error => {
        console.log('Loading local geojson failed, using fallback');
        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
          .then(res => res.json())
          .then(data => {
            const targetCountries = ['Japan', 'Germany', 'United Kingdom', 'Indonesia'];
            const filteredFeatures = data.features.filter(d => 
              targetCountries.includes(d.properties.NAME) || 
              targetCountries.includes(d.properties.NAME_EN) ||
              d.properties.ISO_A2 === 'ID' ||
              d.properties.ISO_A2 === 'JP' ||
              d.properties.ISO_A2 === 'DE' ||
              d.properties.ISO_A2 === 'GB'
            );
            setCountriesData(filteredFeatures);
          });
      });
  }, []);

  // Country navigation
  useEffect(() => {
    if (!selectedCountry || !globeEl.current || !isGlobeReady) return;
    
    let country = countries.find(c => c.code === selectedCountry);
    if (country) {
      globeEl.current.pointOfView({
        lat: country.lat,
        lng: country.lng,
        altitude: GLOBE_ALTITUDE
      }, 1000);
    }
  }, [selectedCountry, isGlobeReady]);

  const createLabelElement = (d) => {
    const el = document.createElement('div');
    el.innerHTML = d.html;
    el.style.pointerEvents = 'none';
    el.style.userSelect = 'none';
    return el;
  };

  const getCountryColor = (countryData) => {
    const name = countryData.properties.NAME || countryData.properties.NAME_EN;
    const iso = countryData.properties.ISO_A2;
    if (iso === 'ID' || name === 'Indonesia') return 'rgba(255,255,255,0.7)';
    if (selectedCountry) {
      if ((selectedCountry === 'JP' && (iso === 'JP' || name === 'Japan')) ||
          (selectedCountry === 'DE' && (iso === 'DE' || name === 'Germany')) ||
          (selectedCountry === 'GB' && (iso === 'GB' || name === 'United Kingdom')))
        return 'rgba(255,255,255,0.9)';
    }
    if (iso === 'JP' || name === 'Japan') return 'rgba(255,255,255,0.5)';
    if (iso === 'DE' || name === 'Germany') return 'rgba(255,255,255,0.5)';
    if (iso === 'GB' || name === 'United Kingdom') return 'rgba(255,255,255,0.5)';
    return 'rgba(255,255,255,0.1)';
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleCountryClick = (polygon) => {
    const countryName = polygon.properties.NAME || polygon.properties.NAME_EN;
    const iso = polygon.properties.ISO_A2;
    
    if (iso === 'JP' || countryName === 'Japan') {
      setSelectedCountry('JP');
    } else if (iso === 'DE' || countryName === 'Germany') {
      setSelectedCountry('DE');
    } else if (iso === 'GB' || countryName === 'United Kingdom') {
      setSelectedCountry('GB');
    }
  };

  // Help Tooltip component rendered via Portal
  const TooltipPortal = () => {
    if (!showTooltip) return null;

    return createPortal(
      <div 
        style={{
          position: 'fixed',
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      >
        <div className="w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-gray-700">
          <div className="mb-2">
            <span 
              className="font-medium"
              style={{ 
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              💡 Cara Menggunakan:
            </span>
          </div>
          <ul 
            className="space-y-1"
            style={{ 
              fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400
            }}
          >
            <li>• Klik negara pada daftar atau globe</li>
            <li>• Globe akan bergeser ke negara tujuan</li>
            <li>• Lihat informasi negara yang dipilih</li>
            <li>• Eksplorasi negara lain dengan mudah</li>
          </ul>
          
          <div 
            style={{
              position: 'absolute',
              left: '-6px',
              top: '8px',
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderRight: '6px solid #1f2937'
            }}
          />
        </div>
      </div>,
      document.body
    );
  };

  // Recommendation Tooltip component rendered via Portal - Follows cursor
  const RecommendationTooltipPortal = () => {
    if (!showRecommendationTooltip) return null;

    return createPortal(
      <div 
        style={{
          position: 'fixed',
          left: `${recommendationTooltipPosition.x}px`,
          top: `${recommendationTooltipPosition.y}px`,
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      >
        <div 
          className="w-64 p-3 bg-gray-900 text-white text-xs shadow-xl border border-gray-700"
          style={{
            borderRadius: '15px'
          }}
        >
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 flex-shrink-0" />
            <span 
              className="font-medium"
              style={{ 
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              Rekomendasi negara yang paling sesuai dengan personalisasi profilmu
            </span>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <TooltipPortal />
      <RecommendationTooltipPortal />

      <div className="absolute inset-0 z-0">
        <Globe
          ref={globeEl}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl={null}
          backgroundColor="rgba(0,0,0,0)"
          
          width={window.innerWidth + 400}
          height={window.innerHeight}
          
          polygonsData={countriesData}
          polygonCapColor={getCountryColor}
          polygonSideColor={() => 'rgba(255, 255, 255, 0.3)'}
          polygonStrokeColor={() => 'rgba(255, 255, 255, 0.8)'}
          polygonAltitude={0.03}
          onPolygonClick={handleCountryClick}
          
          htmlElementsData={htmlElementsData}
          htmlElement={createLabelElement}
          htmlAltitude={d => d.altitude}
          
          enablePointerInteraction={true}
        />
      </div>

      <div className="absolute top-24 left-6 w-80 max-h-[calc(100vh-120px)] overflow-y-auto z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
        <div className="p-6">
          {/* Header dengan Tooltip */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <h1 
                className="text-2xl font-bold text-gray-900"
                style={{ 
                  fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500
                }}
              >
                Smart Shipping
              </h1>
              
              <HelpCircle 
                ref={helpIconRef}
                className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help transition-colors"
                onMouseEnter={handleTooltipShow}
                onMouseLeave={handleTooltipHide}
              />
            </div>
            
            <p 
              className="text-gray-600 text-sm"
              style={{ 
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400
              }}
            >
              Pilih negara tujuan ekspor Anda pada globe atau daftar di bawah.
            </p>
          </div>

          {/* Country Selection dengan Label Rekomendasi */}
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold text-gray-900 mb-3"
              style={{ 
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              Pilih Negara Tujuan
            </h2>
            <div className="space-y-2">
              {countries.map((country) => (
                <div key={country.code} className="relative">
                  <button
                    onClick={() => handleCountrySelect(country.code)}
                    onMouseEnter={(e) => handleRecommendationMouseEnter(e, country)}
                    onMouseMove={(e) => handleRecommendationMouseMove(e, country)}
                    onMouseLeave={() => handleRecommendationMouseLeave(country)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left relative ${
                      selectedCountry === country.code
                        ? "border-gray-900 bg-gray-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{country.flag}</span>
                      <div className="flex-1">
                        <h3 
                          className="font-medium text-gray-900 text-sm"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 500
                          }}
                        >
                          {country.name}
                        </h3>
                        <p 
                          className="text-xs text-gray-500"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 400
                          }}
                        >
                          {country.distance}
                        </p>
                      </div>
                    </div>

                    {/* Label Rekomendasi */}
                    {country.recommended && (
                      <div 
                        className="absolute px-3 py-1 text-xs font-bold"
                        style={{
                          top: '6px',
                          right: '8px',
                          backgroundColor: '#059669',
                          color: '#FFFFFF',
                          fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 600,
                          fontSize: '11px',
                          borderRadius: '20px',
                          zIndex: 10,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Rekomendasi
                      </div>
                    )}
                  </button> 
                </div>
              ))}
            </div>
          </div>

          {/* Selected Country Info */}
          {selectedCountry && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                <h3 
                  className="font-medium text-gray-900 text-sm mb-2"
                  style={{ 
                    fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500
                  }}
                >
                  Negara Terpilih
                </h3>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {countries.find(c => c.code === selectedCountry)?.flag}
                  </span>
                  <div>
                    <h4 
                      className="font-medium text-gray-900"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {countries.find(c => c.code === selectedCountry)?.name}
                    </h4>
                    <p 
                      className="text-xs text-gray-500"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 400
                      }}
                    >
                      Jarak: {countries.find(c => c.code === selectedCountry)?.distance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
