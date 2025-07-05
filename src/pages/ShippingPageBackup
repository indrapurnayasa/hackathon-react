// src/pages/ShippingPage.js
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MapPin,
  Clock,
  Star,
  Plane,
  Ship,
  HelpCircle,
  Package,
  DollarSign,
  CheckCircle,
  Circle,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";

export default function ShippingPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showRecommendationTooltip, setShowRecommendationTooltip] =
    useState(false);
  const [recommendationTooltipPosition, setRecommendationTooltipPosition] =
    useState({ x: 0, y: 0 });
  const [isExiting, setIsExiting] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const helpIconRef = useRef(null);
  const globeEl = useRef();
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const navigate = useNavigate();

  // UPDATE NEGARA TUJUAN - Spain, Malaysia, Kenya, Singapore
  const countries = [
    {
      code: "ES",
      name: "Spain",
      flag: "🇪🇸",
      distance: "11,000 km",
      lat: 40.4637,
      lng: -3.7492,
      recommended: false,
    },
    {
      code: "MY",
      name: "Malaysia",
      flag: "🇲🇾",
      distance: "3,500 km",
      lat: 4.2105,
      lng: 101.9758,
      recommended: true,
    },
    {
      code: "KE",
      name: "Kenya",
      flag: "🇰🇪",
      distance: "7,500 km",
      lat: -0.0236,
      lng: 37.9062,
      recommended: false,
    },
    {
      code: "SG",
      name: "Singapore",
      flag: "🇸🇬",
      distance: "3,200 km",
      lat: 1.3521,
      lng: 103.8198,
      recommended: false,
    },
  ];

  // Data alur pengiriman sebagai milestone edukasi
  const shippingMilestones = [
    { step: "Warehouse", description: "Barang disimpan di gudang forwarder" },
    { step: "Forwarder", description: "Pengurusan dokumen dan koordinasi" },
    { step: "Pengiriman", description: "Transport internasional ke tujuan" },
    { step: "Penerimaan", description: "Last mile delivery ke penerima" },
  ];

  // Data kurir dengan estimasi biaya
  const courierOptions = [
    {
      id: "dhl",
      name: "DHL Express",
      type: "Udara",
      duration: "3-5 hari",
      totalCost: "Rp 4,200,000",
      icon: "✈️",
      breakdown: [
        { item: "Pengemasan", cost: "Rp 500,000" },
        { item: "Pengangkutan domestik", cost: "Rp 300,000" },
        { item: "Bea cukai", cost: "Rp 400,000" },
        { item: "Pengiriman internasional", cost: "Rp 2,500,000" },
        { item: "Asuransi", cost: "Rp 200,000" },
        { item: "Delivery terakhir", cost: "Rp 300,000" },
      ],
    },
    {
      id: "fedex",
      name: "FedEx International",
      type: "Udara",
      duration: "4-6 hari",
      totalCost: "Rp 3,900,000",
      icon: "✈️",
      breakdown: [
        { item: "Pengemasan", cost: "Rp 450,000" },
        { item: "Pengangkutan domestik", cost: "Rp 280,000" },
        { item: "Bea cukai", cost: "Rp 380,000" },
        { item: "Pengiriman internasional", cost: "Rp 2,300,000" },
        { item: "Asuransi", cost: "Rp 190,000" },
        { item: "Delivery terakhir", cost: "Rp 300,000" },
      ],
    },
    {
      id: "sea",
      name: "Sea Freight",
      type: "Laut",
      duration: "14-21 hari",
      totalCost: "Rp 2,100,000",
      icon: "🚢",
      breakdown: [
        { item: "Pengemasan", cost: "Rp 400,000" },
        { item: "Pengangkutan ke pelabuhan", cost: "Rp 250,000" },
        { item: "Bea cukai", cost: "Rp 350,000" },
        { item: "Pengiriman laut", cost: "Rp 800,000" },
        { item: "Asuransi", cost: "Rp 150,000" },
        { item: "Delivery terakhir", cost: "Rp 150,000" },
      ],
    },
  ];

  const indonesiaCoords = { lat: -0.7893, lng: 113.9213 };
  const GLOBE_ALTITUDE = 0.75;

  const [countriesData, setCountriesData] = useState([]);

  // Static HTML elements data
  const [htmlElementsData, setHtmlElementsData] = useState(() => {
    function getLabelLatLng(code) {
      switch (code) {
        case "ID":
          return { lat: indonesiaCoords.lat - 8, lng: indonesiaCoords.lng };
        case "ES":
          return { lat: 40.4637 - 6, lng: -3.7492 };
        case "MY":
          return { lat: 4.2105 - 6, lng: 101.9758 };
        case "KE":
          return { lat: -0.0236 - 6, lng: 37.9062 };
        case "SG":
          return { lat: 1.3521 - 6, lng: 103.8198 };
        default:
          return { lat: 0, lng: 0 };
      }
    }

    function getFlagLatLng(code) {
      const label = getLabelLatLng(code);
      return { lat: label.lat + 2, lng: label.lng };
    }

    return [
      // Indonesia
      {
        ...getFlagLatLng("ID"),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">🇮🇩</div>`,
        altitude: 0.08,
      },
      {
        ...getLabelLatLng("ID"),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Indonesia</div>`,
        altitude: 0.07,
      },
      // Spain
      {
        ...getFlagLatLng("ES"),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">🇪🇸</div>`,
        altitude: 0.08,
      },
      {
        ...getLabelLatLng("ES"),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Spain</div>`,
        altitude: 0.07,
      },
      // Malaysia
      {
        ...getFlagLatLng("MY"),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">🇲🇾</div>`,
        altitude: 0.08,
      },
      {
        ...getLabelLatLng("MY"),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Malaysia</div>`,
        altitude: 0.07,
      },
      // Kenya
      {
        ...getFlagLatLng("KE"),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">🇰🇪</div>`,
        altitude: 0.08,
      },
      {
        ...getLabelLatLng("KE"),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Kenya</div>`,
        altitude: 0.07,
      },
      // Singapore
      {
        ...getFlagLatLng("SG"),
        html: `<div style="font-size:28px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.12));">🇸🇬</div>`,
        altitude: 0.08,
      },
      {
        ...getLabelLatLng("SG"),
        html: `<div style="background: white; color: black; padding: 6px 14px; border-radius: 16px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid black; box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%);">Singapore</div>`,
        altitude: 0.07,
      },
    ];
  });

  // Handle navigation to Analytics page with Country Demand tab
  const handleNavigateToAnalytics = () => {
    navigate("/dashboard/trend", { state: { activeTab: "country-demand" } });
  };

  // Calculate tooltip position
  const updateTooltipPosition = () => {
    if (helpIconRef.current) {
      const rect = helpIconRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.right + 8,
        y: rect.top - 8,
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

  // Handle recommendation tooltip
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
      x: event.clientX + 15,
      y: event.clientY - 10,
    });
  };

  // Setup globe
  useEffect(() => {
    if (globeEl.current && !isGlobeReady) {
      globeEl.current.controls().enableZoom = false;
      globeEl.current.pointOfView(
        {
          lat: indonesiaCoords.lat,
          lng: indonesiaCoords.lng,
          altitude: GLOBE_ALTITUDE,
        },
        0
      );
      setIsGlobeReady(true);
    }
  }, [isGlobeReady]);

  // Load countries data
  useEffect(() => {
    fetch("/countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data.features);
      })
      .catch((error) => {
        console.log("Loading local geojson failed, using fallback");
        fetch(
          "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        )
          .then((res) => res.json())
          .then((data) => {
            const targetCountries = [
              "Spain",
              "Malaysia",
              "Kenya",
              "Singapore",
              "Indonesia",
            ];
            const filteredFeatures = data.features.filter(
              (d) =>
                targetCountries.includes(d.properties.NAME) ||
                targetCountries.includes(d.properties.NAME_EN) ||
                d.properties.ISO_A2 === "ID" ||
                d.properties.ISO_A2 === "ES" ||
                d.properties.ISO_A2 === "MY" ||
                d.properties.ISO_A2 === "KE" ||
                d.properties.ISO_A2 === "SG"
            );
            setCountriesData(filteredFeatures);
          });
      });
  }, []);

  // Country navigation - HANYA UNTUK NAVIGASI KE NEGARA YANG DIPILIH
  useEffect(() => {
    if (!selectedCountry || !globeEl.current || !isGlobeReady) return;

    let country = countries.find((c) => c.code === selectedCountry);
    if (country) {
      globeEl.current.pointOfView(
        {
          lat: country.lat,
          lng: country.lng,
          altitude: GLOBE_ALTITUDE,
        },
        1000
      );
    }
  }, [selectedCountry, isGlobeReady]);

  // Reset courier selection when country changes
  useEffect(() => {
    setSelectedCourier("");
  }, [selectedCountry]);

  const createLabelElement = (d) => {
    const el = document.createElement("div");
    el.innerHTML = d.html;
    el.style.pointerEvents = "none";
    el.style.userSelect = "none";
    return el;
  };

  // Country color logic
  const getCountryColor = (countryData) => {
    const name = countryData.properties.NAME || countryData.properties.NAME_EN;
    const iso = countryData.properties.ISO_A2;
    if (iso === "ID" || name === "Indonesia") return "rgba(255,255,255,0.7)";
    if (selectedCountry) {
      if (
        (selectedCountry === "ES" && (iso === "ES" || name === "Spain")) ||
        (selectedCountry === "MY" && (iso === "MY" || name === "Malaysia")) ||
        (selectedCountry === "KE" && (iso === "KE" || name === "Kenya")) ||
        (selectedCountry === "SG" && (iso === "SG" || name === "Singapore"))
      )
        return "rgba(255,255,255,0.9)";
    }
    if (iso === "ES" || name === "Spain") return "rgba(255,255,255,0.5)";
    if (iso === "MY" || name === "Malaysia") return "rgba(255,255,255,0.5)";
    if (iso === "KE" || name === "Kenya") return "rgba(255,255,255,0.5)";
    if (iso === "SG" || name === "Singapore") return "rgba(255,255,255,0.5)";
    return "rgba(255,255,255,0.1)";
  };

  // ANIMASI BERSAMAAN - Globe dan Panel bersamaan saat kembali ke Indonesia
  const handleCountrySelect = (countryCode) => {
    if (selectedCountry === countryCode) {
      // TRIGGER ANIMASI BERSAMAAN
      setIsExiting(true);

      // Globe navigation kembali ke Indonesia - BERSAMAAN dengan panel exit
      if (globeEl.current && isGlobeReady) {
        globeEl.current.pointOfView(
          {
            lat: indonesiaCoords.lat,
            lng: indonesiaCoords.lng,
            altitude: GLOBE_ALTITUDE,
          },
          1000
        ); // Durasi sama dengan animasi panel (1000ms)
      }

      // Reset state setelah animasi selesai
      setTimeout(() => {
        setSelectedCountry("");
        setIsExiting(false);
      }, 1000); // Durasi sama dengan animasi globe dan panel
    } else {
      setSelectedCountry(countryCode);
      setIsExiting(false);
    }
  };

  // Country click logic
  const handleCountryClick = (polygon) => {
    const countryName = polygon.properties.NAME || polygon.properties.NAME_EN;
    const iso = polygon.properties.ISO_A2;

    if (iso === "ES" || countryName === "Spain") {
      handleCountrySelect("ES");
    } else if (iso === "MY" || countryName === "Malaysia") {
      handleCountrySelect("MY");
    } else if (iso === "KE" || countryName === "Kenya") {
      handleCountrySelect("KE");
    } else if (iso === "SG" || countryName === "Singapore") {
      handleCountrySelect("SG");
    }
  };

  const handleCourierSelect = (courierId) => {
    setSelectedCourier(selectedCourier === courierId ? "" : courierId);
  };

  // Help Tooltip Portal
  const TooltipPortal = () => {
    if (!showTooltip) return null;

    return createPortal(
      <div
        style={{
          position: "fixed",
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        <div className="w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-gray-700">
          <div className="mb-2">
            <span
              className="font-medium"
              style={{
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
              }}
            >
              💡 Cara Menggunakan:
            </span>
          </div>
          <ul
            className="space-y-1"
            style={{
              fontFamily:
                "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
            }}
          >
            <li>• Klik negara pada daftar atau globe</li>
            <li>• Globe akan bergeser ke negara tujuan</li>
            <li>• Lihat informasi negara yang dipilih</li>
            <li>• Eksplorasi negara lain dengan mudah</li>
          </ul>

          <div
            style={{
              position: "absolute",
              left: "-6px",
              top: "8px",
              width: 0,
              height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderRight: "6px solid #1f2937",
            }}
          />
        </div>
      </div>,
      document.body
    );
  };

  // Recommendation Tooltip Portal
  const RecommendationTooltipPortal = () => {
    if (!showRecommendationTooltip) return null;

    return createPortal(
      <div
        style={{
          position: "fixed",
          left: `${recommendationTooltipPosition.x}px`,
          top: `${recommendationTooltipPosition.y}px`,
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        <div
          className="w-64 p-3 bg-gray-900 text-white text-xs shadow-xl border border-gray-700"
          style={{
            borderRadius: "15px",
          }}
        >
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 flex-shrink-0" />
            <span
              className="font-medium"
              style={{
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
              }}
            >
              Rekomendasi negara yang paling sesuai dengan personalisasi
              profilmu
            </span>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* CSS Animations - DURASI SAMA 1000ms */}
      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToRight {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .info-panel-enter {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .info-panel-exit {
          animation: slideOutToRight 1s ease-in forwards;
        }
      `}</style>

      <TooltipPortal />
      <RecommendationTooltipPortal />

      {/* Globe Background - ANIMASI BERSAMAAN */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-in-out"
        style={{
          transform: selectedCountry ? "translateX(-200px)" : "translateX(0)",
        }}
      >
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
          polygonSideColor={() => "rgba(255, 255, 255, 0.3)"}
          polygonStrokeColor={() => "rgba(255, 255, 255, 0.8)"}
          polygonAltitude={0.015}
          onPolygonClick={handleCountryClick}
          htmlElementsData={htmlElementsData}
          htmlElement={createLabelElement}
          htmlAltitude={(d) => d.altitude}
          enablePointerInteraction={true}
        />
      </div>

      {/* Smart Shipping Panel - SCROLL LOCKED */}
      <div
        className="absolute top-24 left-6 w-80 max-h-[calc(100vh-120px)] z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200"
        style={{
          overflowY: isScrollLocked ? "hidden" : "auto",
        }}
      >
        <div className="p-6">
          {/* Header dengan Tooltip */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <h1
                className="text-2xl font-bold text-gray-900"
                style={{
                  fontFamily:
                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500,
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
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
              }}
            >
              Pilih negara tujuan ekspor Anda pada globe atau daftar di bawah.
            </p>
          </div>

          {/* Country Selection */}
          <div className="mb-3">
            <h2
              className="text-lg font-semibold text-gray-900 mb-3"
              style={{
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
              }}
            >
              Pilih Negara Tujuan
            </h2>
            <div className="space-y-2">
              {countries.map((country) => (
                <div key={country.code} className="relative">
                  <button
                    onClick={() => handleCountrySelect(country.code)}
                    onMouseEnter={(e) =>
                      handleRecommendationMouseEnter(e, country)
                    }
                    onMouseMove={(e) =>
                      handleRecommendationMouseMove(e, country)
                    }
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
                            fontFamily:
                              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {country.name}
                        </h3>
                        <p
                          className="text-xs text-gray-500"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {country.distance}
                        </p>
                      </div>
                    </div>

                    {/* Label Rekomendasi untuk Malaysia */}
                    {country.recommended && (
                      <div
                        className="absolute px-3 py-1 text-xs font-bold"
                        style={{
                          top: "6px",
                          right: "8px",
                          backgroundColor: "#059669",
                          color: "#FFFFFF",
                          fontFamily:
                            "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 600,
                          fontSize: "11px",
                          borderRadius: "20px",
                          zIndex: 10,
                          whiteSpace: "nowrap",
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

          {/* Hot Komoditas Section - Enhanced dengan ukuran yang disesuaikan */}
          {selectedCountry && (
            <div className="mb-6 relative">
              {/* Label Hot Komoditas di atas border - ukuran sama dengan Pilih Negara Tujuan */}
              <div className="flex items-center space-x-1 mb-1">
                <h3
                  className="text-lg font-semibold text-gray-900"
                  style={{
                    fontFamily:
                      "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Hot Komoditas
                </h3>
                <span className="text-lg">🔥</span>
              </div>

              {/* Border container dengan ukuran sama dengan list negara - clickable untuk navigasi */}
              <button
                onClick={handleNavigateToAnalytics}
                className="w-full bg-gray-50 rounded-lg border-2 border-gray-200 p-3 relative hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🦐</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className="font-medium text-gray-900 text-sm"
                        style={{
                          fontFamily:
                            "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        Udang Beku
                      </span>
                      <TrendingUp size={16} className="text-green-500" />
                    </div>
                    <div
                      className="text-xs text-green-600 font-medium"
                      style={{
                        fontFamily:
                          "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Growth: 22%
                    </div>
                  </div>
                </div>

                {/* Chevron di dalam border, posisi tengah kanan */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Informasi Pengiriman Panel - ANIMASI BERSAMAAN */}
      {selectedCountry && (
        <div
          className={`absolute top-24 right-6 w-96 max-h-[calc(100vh-120px)] overflow-y-auto z-20 bg-white backdrop-blur-lg rounded-xl shadow-xl border-2 border-gray-200 ${
            isExiting ? "info-panel-exit" : "info-panel-enter"
          }`}
        >
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="w-5 h-5 text-gray-600" />
                <h1
                  className="text-2xl font-bold text-gray-900"
                  style={{
                    fontFamily:
                      "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Informasi Pengiriman
                </h1>
              </div>
              <p
                className="text-gray-600 text-sm"
                style={{
                  fontFamily:
                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                }}
              >
                Alur pengiriman dan estimasi biaya ke{" "}
                {countries.find((c) => c.code === selectedCountry)?.name}
              </p>
            </div>

            {/* Alur Pengiriman dengan Angka di Kiri */}
            <div className="mb-6">
              <div className="relative">
                {shippingMilestones.map((milestone, index) => (
                  <div key={index} className="relative mb-6">
                    <div className="flex items-start space-x-4">
                      {/* Angka di Sebelah Kiri */}
                      <div
                        className="relative flex-shrink-0"
                        style={{ marginTop: "4px" }}
                      >
                        <div
                          className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 700,
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div
                          className="inline-block px-3 py-1 text-xs font-bold mb-2"
                          style={{
                            backgroundColor: "#000000",
                            color: "#FFFFFF",
                            fontFamily:
                              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 700,
                            fontSize: "11px",
                            borderRadius: "20px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {milestone.step}
                        </div>
                        <p
                          className="text-xs text-gray-600 leading-relaxed"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pilihan Kurir */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h2
                  className="text-lg font-semibold text-gray-900"
                  style={{
                    fontFamily:
                      "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Pilihan Ekspedisi
                </h2>
              </div>

              <div className="space-y-3">
                {courierOptions.map((courier) => (
                  <div key={courier.id}>
                    <button
                      onClick={() => handleCourierSelect(courier.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedCourier === courier.id
                          ? "border-gray-900 bg-gray-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{courier.icon}</span>
                          <div>
                            <h3
                              className="font-medium text-gray-900 text-sm"
                              style={{
                                fontFamily:
                                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              {courier.name}
                            </h3>
                            <p
                              className="text-xs text-gray-500"
                              style={{
                                fontFamily:
                                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                                fontWeight: 400,
                              }}
                            >
                              {courier.type} • {courier.duration}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-bold text-gray-900 text-sm"
                            style={{
                              fontFamily:
                                "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {courier.totalCost}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Rincian Biaya */}
                    {selectedCourier === courier.id && (
                      <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4
                          className="text-sm font-medium text-gray-900 mb-3"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Rincian Biaya:
                        </h4>
                        <div className="space-y-2">
                          {courier.breakdown.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-1"
                            >
                              <span
                                className="text-xs text-gray-600"
                                style={{
                                  fontFamily:
                                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                                  fontWeight: 400,
                                }}
                              >
                                {item.item}
                              </span>
                              <span
                                className="text-xs font-medium text-gray-900"
                                style={{
                                  fontFamily:
                                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                                  fontWeight: 500,
                                }}
                              >
                                {item.cost}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between items-center">
                              <span
                                className="text-sm font-medium text-gray-900"
                                style={{
                                  fontFamily:
                                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                                  fontWeight: 500,
                                }}
                              >
                                Total:
                              </span>
                              <span
                                className="text-sm font-bold text-gray-900"
                                style={{
                                  fontFamily:
                                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                                  fontWeight: 600,
                                }}
                              >
                                {courier.totalCost}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p
                className="text-xs text-blue-800"
                style={{
                  fontFamily:
                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                }}
              >
                ⚠️ Estimasi biaya dapat berubah tergantung jenis barang, berat,
                dan kondisi pasar saat ini.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
