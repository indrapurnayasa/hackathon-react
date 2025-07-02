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

  // --- Globe label positions: margin bawah tiap negara ---
  function getLabelLatLng(code) {
    // Offset latitude (negatif = ke bawah) untuk label di bawah negara
    switch (code) {
      case 'ID': return { lat: indonesiaCoords.lat - 8, lng: indonesiaCoords.lng };
      case 'JP': return { lat: 36.2048 - 6, lng: 138.2529 };
      case 'DE': return { lat: 51.1657 - 6, lng: 10.4515 };
      case 'GB': return { lat: 55.3781 - 6, lng: -3.4360 };
      default: return { lat: 0, lng: 0 };
    }
  }

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: indonesiaCoords.lat, lng: indonesiaCoords.lng, altitude: 0.9 });
    }

    fetch('/countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountriesData(data.features);

        // Label di margin bawah negara
        const htmlElements = [
          {
            ...getLabelLatLng('ID'),
            label: 'Indonesia'
          },
          {
            ...getLabelLatLng('JP'),
            label: 'Japan'
          },
          {
            ...getLabelLatLng('DE'),
            label: 'Germany'
          },
          {
            ...getLabelLatLng('GB'),
            label: 'United Kingdom'
          }
        ];
        setHtmlElementsData(htmlElements);
      });
  }, []);

  // Auto pindah globe saat pilih negara
  useEffect(() => {
    if (!selectedCountry || !globeEl.current) return;
    let country = countries.find(c => c.code === selectedCountry);
    if (country) {
      globeEl.current.pointOfView({
        lat: country.lat,
        lng: country.lng,
        altitude: 0.9
      }, 1000);
    }
  }, [selectedCountry]);

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

  // Custom HTML label
  const createLabelElement = (d) => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div style="
        background: white;
        color: black;
        padding: 6px 14px;
        border-radius: 16px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 11px;
        font-weight: 600;
        border: 1px solid black;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        white-space: nowrap;
        text-align: center;
        pointer-events: none;
        user-select: none;
        transform: translate(-50%, -50%);
      ">${d.label}</div>
    `;
    el.style.pointerEvents = 'none';
    el.style.userSelect = 'none';
    return el;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Content - 30% */}
        <div className="w-[30%] p-6 overflow-y-auto h-screen">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Shipping</h1>
            <p className="text-gray-600 text-sm">
              Pilih negara tujuan ekspor Anda pada globe atau daftar di bawah.
            </p>
          </div>

          {/* Country Selection - Single Column */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Pilih Negara Tujuan</h2>
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
                      <h3 className="font-medium text-gray-900 text-sm">{country.name}</h3>
                      <p className="text-xs text-gray-500">{country.distance}</p>
                    </div>
                    {selectedCountry === country.code && (
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Deskripsi Kurir */}
          {selectedCountry && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Pilih Kurir Pengiriman</h2>
              <div className="space-y-3">
                {couriers[selectedCountry].map((courier) => (
                  <div
                    key={courier.id}
                    className={`border-2 rounded-lg p-3 transition-all ${
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
                          <h4 className="font-medium text-gray-900 text-sm">{courier.name}</h4>
                          <p className="text-xs text-gray-500">{courier.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{courier.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Waktu:</span>
                        <p className="font-medium text-gray-900">{courier.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Biaya:</span>
                        <p className="font-bold text-gray-900">{courier.price}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {courier.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Route */}
          {selectedCountry && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Rute Pengiriman</h2>
              <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {shippingRoutes[selectedCountry].route}
                  </h3>
                  <div className="flex items-center space-x-1 text-green-600">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">
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
                        <h4 className="font-medium text-gray-900 text-sm">{step.city}</h4>
                        <p className="text-xs text-gray-500">{step.country}</p>
                      </div>
                      <div className="text-xs text-gray-500">{step.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-medium text-blue-900 text-sm mb-2">💡 Cara Menggunakan</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Klik negara pada daftar atau globe</li>
              <li>• Globe akan bergeser ke negara tujuan</li>
              <li>• Pilih kurir dari panel di kiri</li>
              <li>• Lanjutkan untuk booking pengiriman</li>
            </ul>
          </div>
        </div>

        {/* Right Globe - 70% */}
        <div className="w-[70%] h-screen sticky top-0 overflow-hidden relative">
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl={null}
            backgroundColor="rgba(0,0,0,0)"
            polygonsData={countriesData}
            polygonCapColor={getCountryColor}
            polygonSideColor={() => 'rgba(255,255,255,0.3)'}
            polygonStrokeColor={() => 'rgba(255,255,255,0.8)'}
            polygonAltitude={0.03}
            onPolygonClick={(polygon) => {
              const name = polygon.properties.NAME || polygon.properties.NAME_EN;
              const iso = polygon.properties.ISO_A2;
              if (iso === 'JP' || name === 'Japan') setSelectedCountry('JP');
              else if (iso === 'DE' || name === 'Germany') setSelectedCountry('DE');
              else if (iso === 'GB' || name === 'United Kingdom') setSelectedCountry('GB');
            }}
            htmlElementsData={htmlElementsData}
            htmlElement={createLabelElement}
            htmlAltitude={0.05}
            width={window.innerWidth * 0.7}
            height={window.innerHeight}
            enablePointerInteraction={true}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-50/20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
