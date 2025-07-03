// src/pages/ShippingPage.js
import React, { useState, useRef, useEffect } from "react";
import { MapPin, Clock, Star, Plane, Ship } from "lucide-react";
import Globe from 'react-globe.gl';

export default function ShippingPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCourier, setSelectedCourier] = useState(null);
  const globeEl = useRef();

  const countries = [
    { 
      code: "JP", 
      name: "Jepang", 
      flag: "🇯🇵", 
      distance: "5,760 km",
      lat: 36.2048,
      lng: 138.2529
    },
    { 
      code: "DE", 
      name: "Jerman", 
      flag: "🇩🇪", 
      distance: "11,800 km",
      lat: 51.1657,
      lng: 10.4515
    },
    { 
      code: "GB", 
      name: "Inggris", 
      flag: "🇬🇧", 
      distance: "11,900 km",
      lat: 55.3781,
      lng: -3.4360
    }
  ];

  const indonesiaCoords = { lat: -0.7893, lng: 113.9213 };

  const [countriesData, setCountriesData] = useState([]);
  const [htmlElementsData, setHtmlElementsData] = useState([]);

  // Helper untuk posisi label bawah negara
  function getLabelLatLng(code) {
    switch (code) {
      case 'ID': return { lat: indonesiaCoords.lat - 8, lng: indonesiaCoords.lng };
      case 'JP': return { lat: 36.2048 - 6, lng: 138.2529 };
      case 'DE': return { lat: 51.1657 - 6, lng: 10.4515 };
      case 'GB': return { lat: 55.3781 - 6, lng: -3.4360 };
      default: return { lat: 0, lng: 0 };
    }
  }

  // Helper untuk posisi flag tepat di atas label (misal +2 dari label)
  function getFlagLatLng(code) {
    const label = getLabelLatLng(code);
    return { lat: label.lat + 2, lng: label.lng };
  }

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().enableZoom = false; // Disable zoom
      globeEl.current.pointOfView({ lat: indonesiaCoords.lat, lng: indonesiaCoords.lng, altitude: 0.7 });
    }

    fetch('/countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountriesData(data.features);

        // HTML elements: flag di atas label
        const htmls = [
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
        setHtmlElementsData(htmls);
      })
      .catch(error => {
        console.log('Loading local geojson failed, using fallback');
        // Fallback to online source if local file not found
        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
          .then(res => res.json())
          .then(data => {
            // Filter only the countries we want to highlight
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
            
            // Create HTML elements for fallback data
            const htmls = [
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
            
            setHtmlElementsData(htmls);
          });
      });
  }, []);

  // Auto pindah globe saat pilih negara, altitude selalu 0.7
  useEffect(() => {
    if (!selectedCountry || !globeEl.current) return;
    let country = countries.find(c => c.code === selectedCountry);
    if (country) {
      globeEl.current.pointOfView({
        lat: country.lat,
        lng: country.lng,
        altitude: 0.7
      }, 1000);
    }
  }, [selectedCountry]);

  // Custom HTML element creator for labels
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

  const shippingRoutes = {
    JP: {
      route: "Jakarta → Singapura → Tokyo",
      duration: "5-7 hari",
      steps: [
        { city: "Jakarta", country: "Indonesia", duration: "0 hari" },
        { city: "Singapura", country: "Singapura", duration: "1 hari" },
        { city: "Tokyo", country: "Jepang", duration: "5-7 hari" }
      ]
    },
    DE: {
      route: "Jakarta → Dubai → Frankfurt",
      duration: "8-12 hari", 
      steps: [
        { city: "Jakarta", country: "Indonesia", duration: "0 hari" },
        { city: "Dubai", country: "UAE", duration: "2 hari" },
        { city: "Frankfurt", country: "Jerman", duration: "8-12 hari" }
      ]
    },
    GB: {
      route: "Jakarta → Dubai → London",
      duration: "7-10 hari", 
      steps: [
        { city: "Jakarta", country: "Indonesia", duration: "0 hari" },
        { city: "Dubai", country: "UAE", duration: "2 hari" },
        { city: "London", country: "Inggris", duration: "7-10 hari" }
      ]
    }
  };

  const couriers = {
    JP: [
      {
        id: 1,
        name: "DHL Express",
        type: "Express Air",
        icon: <Plane className="w-4 h-4" />,
        duration: "3-5 hari",
        price: "Rp 2,500,000",
        rating: 4.8,
        features: ["Tracking Real-time", "Asuransi Penuh", "Door-to-door"]
      },
      {
        id: 2,
        name: "FedEx International",
        type: "Express Air",
        icon: <Plane className="w-4 h-4" />,
        duration: "4-6 hari",
        price: "Rp 2,200,000",
        rating: 4.7,
        features: ["Tracking Real-time", "Customs Clearance", "Signature Required"]
      },
      {
        id: 3,
        name: "Sea Freight Standard",
        type: "Sea Cargo",
        icon: <Ship className="w-4 h-4" />,
        duration: "14-21 hari",
        price: "Rp 800,000",
        rating: 4.3,
        features: ["Ekonomis", "Kapasitas Besar", "Eco-friendly"]
      }
    ],
    DE: [
      {
        id: 1,
        name: "DHL Express",
        type: "Express Air",
        icon: <Plane className="w-4 h-4" />,
        duration: "4-7 hari",
        price: "Rp 3,200,000",
        rating: 4.8,
        features: ["Tracking Real-time", "Asuransi Penuh", "Door-to-door"]
      },
      {
        id: 2,
        name: "UPS Worldwide",
        type: "Express Air", 
        icon: <Plane className="w-4 h-4" />,
        duration: "5-8 hari",
        price: "Rp 2,900,000",
        rating: 4.6,
        features: ["Tracking Real-time", "Customs Support", "Flexible Delivery"]
      },
      {
        id: 3,
        name: "Sea Freight Economy",
        type: "Sea Cargo",
        icon: <Ship className="w-4 h-4" />,
        duration: "25-35 hari",
        price: "Rp 1,200,000",
        rating: 4.2,
        features: ["Hemat Biaya", "Kapasitas Besar", "Ramah Lingkungan"]
      }
    ],
    GB: [
      {
        id: 1,
        name: "DHL Express",
        type: "Express Air",
        icon: <Plane className="w-4 h-4" />,
        duration: "4-7 hari",
        price: "Rp 3,100,000",
        rating: 4.8,
        features: ["Tracking Real-time", "Asuransi Penuh", "Door-to-door"]
      },
      {
        id: 2,
        name: "British Airways Cargo",
        type: "Express Air", 
        icon: <Plane className="w-4 h-4" />,
        duration: "5-8 hari",
        price: "Rp 2,800,000",
        rating: 4.7,
        features: ["Tracking Real-time", "Premium Service", "Fast Customs"]
      },
      {
        id: 3,
        name: "Sea Freight Standard",
        type: "Sea Cargo",
        icon: <Ship className="w-4 h-4" />,
        duration: "20-28 hari",
        price: "Rp 1,100,000",
        rating: 4.4,
        features: ["Ekonomis", "Kapasitas Besar", "Reliable"]
      }
    ]
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    setSelectedCourier(null);
  };

  const handleCountryClick = (polygon) => {
    const countryName = polygon.properties.NAME || polygon.properties.NAME_EN;
    const iso = polygon.properties.ISO_A2;
    
    // Map country names/ISO to our country codes
    if (iso === 'JP' || countryName === 'Japan') {
      handleCountrySelect('JP');
    } else if (iso === 'DE' || countryName === 'Germany') {
      handleCountrySelect('DE');
    } else if (iso === 'GB' || countryName === 'United Kingdom') {
      handleCountrySelect('GB');
    }
  };

  const handleCourierSelect = (courier) => {
    setSelectedCourier(courier);
  };

  const handleBooking = () => {
    if (selectedCountry && selectedCourier) {
      alert(`Booking ${selectedCourier.name} ke ${countries.find(c => c.code === selectedCountry)?.name}`);
    }
  };


  return (
    <div 
      className="h-screen bg-gray-50 overflow-hidden"
      style={{ 
        fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
      }}
    >
      <div className="flex h-full">
        {/* Left Content - 30% dengan margin yang tepat */}
        <div className="w-[30%] h-full overflow-y-auto">
          <div className="p-6 pb-8"> {/* Added pb-8 untuk margin bawah */}
            {/* Header dengan margin top yang cukup */}
            <div className="mb-6 mt-4"> {/* Added mt-4 untuk turunkan Smart Shipping */}
              <h1 
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              >
                Smart Shipping
              </h1>
              <p 
                className="text-gray-600 text-sm"
                style={{ 
                  fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                  fontWeight: 400
                }}
              >
                Pilih negara tujuan ekspor Anda pada globe atau daftar di bawah.
              </p>
            </div>

            {/* Country Selection - Single Column */}
            <div className="mb-6">
              <h2 
                className="text-lg font-semibold text-gray-900 mb-3"
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              >
                Pilih Negara Tujuan
              </h2>
              <div className="space-y-2">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
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
                            fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          {country.name}
                        </h3>
                        <p 
                          className="text-xs text-gray-500"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 400
                          }}
                        >
                          {country.distance}
                        </p>
                      </div>
                      {selectedCountry === country.code && (
                        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deskripsi Kurir - Only show when country selected */}
            {selectedCountry && (
              <div className="mb-6">
                <h2 
                  className="text-lg font-semibold text-gray-900 mb-3"
                  style={{ 
                    fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Pilih Kurir Pengiriman
                </h2>
                <div className="space-y-3">
                  {couriers[selectedCountry].map((courier) => (
                    <div
                      key={courier.id}
                      className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                        selectedCourier?.id === courier.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedCourier(courier)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            {courier.icon}
                          </div>
                          <div>
                            <h4 
                              className="font-medium text-gray-900 text-sm"
                              style={{ 
                                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 500
                              }}
                            >
                              {courier.name}
                            </h4>
                            <p 
                              className="text-xs text-gray-500"
                              style={{ 
                                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 400
                              }}
                            >
                              {courier.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span 
                            className="text-xs text-gray-600"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400
                            }}
                          >
                            {courier.rating}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span 
                            className="text-gray-600"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400
                            }}
                          >
                            Waktu:
                          </span>
                          <p 
                            className="font-medium text-gray-900"
                            style={{ 
                              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            {courier.duration}
                          </p>
                        </div>
                        <div>
                          <span 
                            className="text-gray-600"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400
                            }}
                          >
                            Biaya:
                          </span>
                          <p 
                            className="font-bold text-gray-900"
                            style={{ 
                              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            {courier.price}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {courier.features.slice(0, 2).map((feature, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Route - Only show when country selected */}
            {selectedCountry && (
              <div className="mb-6">
                <h2 
                  className="text-lg font-semibold text-gray-900 mb-3"
                  style={{ 
                    fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Rute Pengiriman
                </h2>
                <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 
                      className="font-medium text-gray-900 text-sm"
                      style={{ 
                        fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {shippingRoutes[selectedCountry].route}
                    </h3>
                    <div className="flex items-center space-x-1 text-green-600">
                      <Clock className="w-3 h-3" />
                      <span 
                        className="text-xs font-medium"
                        style={{ 
                          fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                          fontWeight: 500
                        }}
                      >
                        {shippingRoutes[selectedCountry].duration}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    {shippingRoutes[selectedCountry].steps.map((step, index) => (
                      <div key={index} className="relative flex items-center space-x-3 pb-4">
                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center relative z-10">
                          <MapPin className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 
                            className="font-medium text-gray-900 text-sm"
                            style={{ 
                              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            {step.city}
                          </h4>
                          <p 
                            className="text-xs text-gray-500"
                            style={{ 
                              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400
                            }}
                          >
                            {step.country}
                          </p>
                        </div>
                        <div 
                          className="text-xs text-gray-500"
                          style={{ 
                            fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 400
                          }}
                        >
                          {step.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Booking Button - Only show when courier selected */}
            {selectedCountry && selectedCourier && (
              <div className="mb-6">
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  style={{ 
                    fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Booking {selectedCourier.name}
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 
                className="font-medium text-blue-900 text-sm mb-2"
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              >
                💡 Cara Menggunakan
              </h3>
              <ul 
                className="text-xs text-blue-700 space-y-1"
                style={{ 
                  fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                  fontWeight: 400
                }}
              >
                <li>• Klik negara pada daftar atau globe</li>
                <li>• Globe akan bergeser ke negara tujuan</li>
                <li>• Pilih kurir dari panel di kiri</li>
                <li>• Lanjutkan untuk booking pengiriman</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Globe - 70% */}
        <div className="w-[70%] h-full sticky top-0 overflow-hidden relative">
          <Globe
            ref={globeEl}
            globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl={null}
            backgroundColor="rgba(0,0,0,0)"
            
            // Countries polygons dengan white transparent overlay
            polygonsData={countriesData}
            polygonCapColor={getCountryColor}
            polygonSideColor={() => 'rgba(255, 255, 255, 0.3)'}
            polygonStrokeColor={() => 'rgba(255, 255, 255, 0.8)'}
            polygonAltitude={0.03} // Higher altitude for better visibility
            onPolygonClick={handleCountryClick}
            
            // HTML elements untuk custom labels positioned below countries
            htmlElementsData={htmlElementsData}
            htmlElement={createLabelElement}
            htmlAltitude={d => d.altitude}
            
            width={window.innerWidth * 0.7}
            height={window.innerHeight}
            
            enablePointerInteraction={true}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-50/20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
