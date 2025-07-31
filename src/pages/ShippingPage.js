// src/pages/ShippingPage.js
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Star,
  HelpCircle,
  Package,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import Globe from "react-globe.gl";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCountries } from "../utils/countryData";
import CommodityDisplay from "../components/CommodityDisplay";
import TwemojiFlag from "../components/TwemojiFlag";
import { getCountryFlagHTML } from "../utils/countryFlags";

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
  const location = useLocation();
  const countryRefs = useRef({});

  // UPDATED NEGARA TUJUAN - 20 negara dengan Malaysia sebagai rekomendasi
  const countries = getAllCountries();

  // State to track user's selected country for real-time updates
  const [userSelectedCountry, setUserSelectedCountry] = useState(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    return savedCountry || "MY"; // Default to Malaysia if no country selected
  });

  // Function to check if a country should show recommendation label
  const shouldShowRecommendation = (countryCode) => {
    return countryCode.toLowerCase() === userSelectedCountry.toLowerCase();
  };

  // Listen for changes in localStorage and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCountry = localStorage.getItem("selectedCountry");
      setUserSelectedCountry(savedCountry || "MY");
    };

    const handleCountrySelectionChange = (event) => {
      const { selectedCountry: newCountry } = event.detail;
      setUserSelectedCountry(newCountry || "MY");
    };

    // Listen for storage events (when localStorage changes in other tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // Listen for custom event when country selection changes
    window.addEventListener(
      "countrySelectionChanged",
      handleCountrySelectionChange
    );

    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const savedCountry = localStorage.getItem("selectedCountry");
      if (savedCountry !== userSelectedCountry) {
        setUserSelectedCountry(savedCountry || "MY");
      }
    }, 1000); // Check every second

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "countrySelectionChanged",
        handleCountrySelectionChange
      );
      clearInterval(interval);
    };
  }, [userSelectedCountry]);

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

  // Generate HTML elements data for all countries
  const [htmlElementsData, setHtmlElementsData] = useState(() => {
    function getLabelLatLng(code) {
      const country = countries.find((c) => c.code === code);
      if (country) {
        // Adjust latitude for label (slightly lower than flag)
        return { lat: country.lat - 1, lng: country.lng };
      }
      if (code === "ID") {
        return { lat: indonesiaCoords.lat - 1, lng: indonesiaCoords.lng };
      }
      return { lat: 0, lng: 0 };
    }

    function getFlagLatLng(code) {
      const country = countries.find((c) => c.code === code);
      if (country) {
        return { lat: country.lat, lng: country.lng };
      }
      if (code === "ID") {
        return { lat: indonesiaCoords.lat, lng: indonesiaCoords.lng };
      }
      return { lat: 0, lng: 0 };
    }

    const elements = [];

    // Indonesia
    elements.push(
      {
        ...getFlagLatLng("ID"),
        html: getCountryFlagHTML("ID"),
        altitude: 0.01,
      },
      {
        ...getLabelLatLng("ID"),
        html: `<div style="background: rgba(255,255,255,0.9); color: black; padding: 4px 12px; border-radius: 12px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%); position: absolute; left: 50%; top: 50%;">Indonesia</div>`,
        altitude: 0.01,
      }
    );

    // Add all countries
    countries.forEach((country) => {
      elements.push(
        {
          ...getFlagLatLng(country.code),
          html: getCountryFlagHTML(country.code),
          altitude: 0.01,
        },
        {
          ...getLabelLatLng(country.code),
          html: `<div style="background: rgba(255,255,255,0.9); color: black; padding: 4px 12px; border-radius: 12px; font-family: 'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 600; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 2px 8px rgba(0,0,0,0.15); white-space: nowrap; text-align: center; pointer-events: none; user-select: none; transform: translate(-50%, -50%); position: absolute; left: 50%; top: 50%;">${country.name}</div>`,
          altitude: 0.01,
        }
      );
    });

    return elements;
  });

  // Handle navigation to Analytics page with Country Demand tab
  const handleNavigateToAnalytics = () => {
    navigate("/dashboard/trend", { state: { activeTab: "country-demand" } });
  };

  // Check if navigated from TrendPage with selected country
  useEffect(() => {
    if (location.state && location.state.selectedCountry) {
      setSelectedCountry(location.state.selectedCountry);
      setIsExiting(false);

      // Scroll to the selected country if requested
      if (location.state.scrollToCountry) {
        setTimeout(() => {
          const countryRef =
            countryRefs.current[location.state.selectedCountry];
          if (countryRef) {
            countryRef.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 500); // Small delay to ensure the component is rendered
      }
    }
  }, [location.state]);

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
    if (shouldShowRecommendation(country.code)) {
      setShowRecommendationTooltip(true);
      updateRecommendationTooltipPosition(event);
    }
  };

  const handleRecommendationMouseMove = (event, country) => {
    if (shouldShowRecommendation(country.code) && showRecommendationTooltip) {
      updateRecommendationTooltipPosition(event);
    }
  };

  const handleRecommendationMouseLeave = (country) => {
    if (shouldShowRecommendation(country.code)) {
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
        // Filter for all our target countries
        const targetCountryCodes = countries.map((c) => c.code).concat(["ID"]);
        const filteredFeatures = data.features.filter((d) =>
          targetCountryCodes.includes(d.properties.ISO_A2)
        );
        setCountriesData(filteredFeatures);
      })
      .catch((error) => {
        console.log("Loading local geojson failed, using fallback");
        fetch(
          "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        )
          .then((res) => res.json())
          .then((data) => {
            // Filter for all our target countries
            const targetCountryCodes = countries
              .map((c) => c.code)
              .concat(["ID"]);
            const filteredFeatures = data.features.filter((d) =>
              targetCountryCodes.includes(d.properties.ISO_A2)
            );
            setCountriesData(filteredFeatures);
          });
      });
  }, []);

  // Country navigation
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

    // Check if this is the selected country or Indonesia when no country is selected
    if (selectedCountry) {
      const selectedCountryObj = countries.find(
        (c) => c.code === selectedCountry
      );
      if (
        selectedCountryObj &&
        (iso === selectedCountry || name === selectedCountryObj.name)
      ) {
        return "rgba(255, 255, 255, 0.3)";
      }
    } else if (iso === "ID" || name === "Indonesia") {
      return "rgba(255, 255, 255, 0.3)";
    }

    return "rgba(255,255,255,0)";
  };

  // Country color logic for polygon sides
  const getPolygonSideColor = (countryData) => {
    const name = countryData.properties.NAME || countryData.properties.NAME_EN;
    const iso = countryData.properties.ISO_A2;

    // Check if this is the selected country or Indonesia when no country is selected
    if (selectedCountry) {
      const selectedCountryObj = countries.find(
        (c) => c.code === selectedCountry
      );
      if (
        selectedCountryObj &&
        (iso === selectedCountry || name === selectedCountryObj.name)
      ) {
        return "rgba(255, 255, 255, 0.5)";
      }
    } else if (iso === "ID" || name === "Indonesia") {
      return "rgba(255, 255, 255, 0.5)";
    }

    return "rgba(255, 255, 255, 0)";
  };

  // Country stroke color logic
  const getPolygonStrokeColor = (countryData) => {
    const name = countryData.properties.NAME || countryData.properties.NAME_EN;
    const iso = countryData.properties.ISO_A2;

    // Check if this is the selected country
    if (selectedCountry) {
      const selectedCountryObj = countries.find(
        (c) => c.code === selectedCountry
      );
      if (
        selectedCountryObj &&
        (iso === selectedCountry || name === selectedCountryObj.name)
      ) {
        return "rgba(0, 128, 255, 1)"; // Solid blue stroke for selected
      }
    }

    return "rgba(255, 255, 255, 1)"; // White stroke for other countries
  };

  // Get polygon altitude based on selection
  const getPolygonAltitude = (countryData) => {
    const name = countryData.properties.NAME || countryData.properties.NAME_EN;
    const iso = countryData.properties.ISO_A2;

    // Raise selected country or Indonesia when no country is selected
    if (selectedCountry) {
      const selectedCountryObj = countries.find(
        (c) => c.code === selectedCountry
      );
      if (
        selectedCountryObj &&
        (iso === selectedCountry || name === selectedCountryObj.name)
      ) {
        return 0.01;
      }
    } else if (iso === "ID" || name === "Indonesia") {
      return 0.01;
    }

    return 0.0015;
  };

  // Handle country selection
  const handleCountrySelect = (countryCode) => {
    if (selectedCountry === countryCode) {
      setIsExiting(true);

      if (globeEl.current && isGlobeReady) {
        globeEl.current.pointOfView(
          {
            lat: indonesiaCoords.lat,
            lng: indonesiaCoords.lng,
            altitude: GLOBE_ALTITUDE,
          },
          1000
        );
      }

      setTimeout(() => {
        setSelectedCountry("");
        setIsExiting(false);
      }, 1000);
    } else {
      setSelectedCountry(countryCode);
      setIsExiting(false);
    }
  };

  // Country click logic for globe
  const handleCountryClick = (polygon) => {
    const iso = polygon.properties.ISO_A2;
    const countryObj = countries.find((c) => c.code === iso);

    if (countryObj) {
      handleCountrySelect(iso);
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
    <div
      className="h-screen w-full overflow-hidden relative"
      style={{ background: "#f2f2f7" }}
    >
      {/* CSS Animations */}
      <style>{`
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

        .country-list-container {
          max-height: calc(100vh - 480px);
          overflow-y: auto;
        }

        .country-list-container::-webkit-scrollbar {
          width: 6px;
        }

        .country-list-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .country-list-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .country-list-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <TooltipPortal />
      <RecommendationTooltipPortal />

      {/* Globe Background */}
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
          polygonSideColor={getPolygonSideColor}
          polygonStrokeColor={getPolygonStrokeColor}
          polygonAltitude={getPolygonAltitude}
          polygonStrokeWidth={2}
          onPolygonClick={handleCountryClick}
          htmlElementsData={htmlElementsData}
          htmlElement={createLabelElement}
          htmlAltitude={0.01}
          enablePointerInteraction={true}
        />
      </div>

      {/* Smart Shipping Panel dengan Scrollable Country List */}
      <div className="absolute top-24 left-6 w-80 z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
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

          {/* Country Selection dengan Scrollable List */}
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

            {/* Scrollable Container untuk Country List */}
            <div className="country-list-container space-y-2">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="relative"
                  ref={(el) => {
                    countryRefs.current[country.code] = el;
                  }}
                >
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
                      <TwemojiFlag
                        countryCode={country.code}
                        className="text-xl"
                      />
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

                    {/* Label Rekomendasi berdasarkan negara yang dipilih user */}
                    {shouldShowRecommendation(country.code) && (
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

          {/* Hot Komoditas Section */}
          {selectedCountry && (
            <div className="mb-6 relative">
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

              <div
                onClick={handleNavigateToAnalytics}
                className="w-full bg-gray-50 rounded-lg border-2 border-gray-200 p-3 relative hover:border-gray-300 hover:bg-gray-50 transition-all text-left cursor-pointer"
              >
                <CommodityDisplay countryCode={selectedCountry} />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ChevronRight size={16} className="text-gray-600" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Informasi Pengiriman Panel */}
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
