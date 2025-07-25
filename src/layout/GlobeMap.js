import React, { useEffect, useRef, useState, useCallback } from "react";
import Globe from "react-globe.gl";

const GEOJSON_URL = "/countries.geojson";

const GlobeMap = ({ onCountryClick, onCountryHover }) => {
  const globeEl = useRef();
  const containerRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update dimensions untuk full border area
  const updateDimensions = useCallback(() => {
    try {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerWidth = rect.width;
        const containerHeight = rect.height;

        setDimensions({
          width: containerWidth,
          height: containerHeight,
        });
      }
    } catch (err) {
      console.warn("Error updating dimensions:", err);
      setDimensions({ width: 800, height: 600 });
    }
  }, []);

  // Load GeoJSON data
  useEffect(() => {
    let isMounted = true;

    const loadGeoData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(GEOJSON_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.features)) {
          throw new Error("Invalid GeoJSON structure");
        }

        if (isMounted) {
          console.log(
            "GeoJSON data loaded successfully:",
            data.features.length,
            "features"
          );
          setCountries(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading GeoJSON data:", error);
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
          setCountries({ features: [] });
        }
      }
    };

    loadGeoData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Setup globe controls
  useEffect(() => {
    if (!isLoading && globeEl.current && countries.features.length > 0) {
      try {
        const globe = globeEl.current;

        if (globe.controls) {
          // Enable smooth controls
          globe.controls().enableZoom = true;
          globe.controls().enablePan = true;
          globe.controls().enableRotate = true;
          globe.controls().autoRotate = true;
          globe.controls().autoRotateSpeed = 0.5;
          globe.controls().minDistance = 200;
          globe.controls().maxDistance = 400;
          globe.controls().dampingFactor = 0.1;
          globe.controls().rotateSpeed = 0.7;

          // Set initial view
          globe.pointOfView({ altitude: 2.5 });

          // Allow natural zoom behavior
          const globeContainer = globe.renderer().domElement;
          if (globeContainer) {
            globeContainer.style.touchAction = "none";
          }
        }
      } catch (err) {
        console.warn("Error setting up globe controls:", err);
      }
    }
  }, [countries, isLoading]);

  // Resize listener dengan debounce
  useEffect(() => {
    updateDimensions();

    const debouncedResize = debounce(updateDimensions, 100);
    window.addEventListener("resize", debouncedResize);

    // Observer untuk perubahan ukuran container
    const resizeObserver = new ResizeObserver(debouncedResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", debouncedResize);
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Handle polygon hover with mouse coordinates
  const handlePolygonHover = useCallback(
    (polygon, event) => {
      try {
        setHoverD(polygon);

        // Pass both polygon data and mouse event to parent
        if (onCountryHover) {
          onCountryHover(polygon, event);
        }

        if (globeEl.current && globeEl.current.controls) {
          if (polygon) {
            globeEl.current.controls().autoRotateSpeed = 0.2;
          } else {
            globeEl.current.controls().autoRotateSpeed = 0.5;
          }
        }
      } catch (err) {
        console.warn("Error handling polygon hover:", err);
      }
    },
    [onCountryHover]
  );

  // Handle polygon click with mouse coordinates
  const handlePolygonClick = useCallback(
    (polygon, event) => {
      try {
        if (polygon && polygon.properties && onCountryClick) {
          const countryName =
            polygon.properties.NAME_EN || polygon.properties.NAME || "Unknown";
          onCountryClick(countryName, event);
        }
      } catch (err) {
        console.warn("Error handling polygon click:", err);
      }
    },
    [onCountryClick]
  );

  const getExportData = useCallback((countryName) => {
    const exportData = {
      Indonesia: {
        commodities: ["Palm Oil", "Coal", "Textiles"],
        percentage: 12.5,
      },
      "United States": {
        commodities: ["Machinery", "Electronics", "Chemicals"],
        percentage: 8.3,
      },
      China: {
        commodities: ["Electronics", "Machinery", "Textiles"],
        percentage: 15.7,
      },
      Germany: {
        commodities: ["Machinery", "Vehicles", "Chemicals"],
        percentage: 6.9,
      },
      Japan: {
        commodities: ["Electronics", "Vehicles", "Machinery"],
        percentage: 4.2,
      },
    };

    return (
      exportData[countryName] || {
        commodities: [
          "Agricultural Products",
          "Raw Materials",
          "Manufactured Goods",
        ],
        percentage: Math.floor(Math.random() * 15) + 3,
      }
    );
  }, []);

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "2px solid #e5e7eb",
              borderTop: "2px solid #111827",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p
            style={{
              color: "#6b7280",
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              margin: 0,
            }}
          >
            Loading globe...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          margin: 0,
          padding: "24px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#ef4444", marginBottom: "16px" }}>
            <svg
              style={{ width: "48px", height: "48px", margin: "0 auto" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "8px",
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              margin: "0 0 8px 0",
            }}
          >
            Failed to load globe data
          </p>
          <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    // Container yang mengisi penuh border area dengan scroll handling
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        // Prevent default scroll behavior pada globe area
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countries.features.filter(
          (d) => d?.properties?.ISO_A2 !== "AQ"
        )}
        polygonAltitude={(d) => (d === hoverD ? 0.02 : 0.01)}
        polygonCapColor={(d) =>
          d === hoverD ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"
        }
        polygonSideColor={() => "rgba(255, 255, 255, 0.2)"}
        polygonStrokeColor={() => "#ffffff"}
        polygonStrokeWidth={1}
        polygonLabel={({ properties: d }) => {
          try {
            if (!d) return "No data available";

            const countryName =
              d.NAME_EN ||
              d.NAME ||
              d.ADMIN ||
              d.NAME_LONG ||
              d.SOVEREIGNT ||
              d.name ||
              d.admin ||
              "Unknown Country";

            const exportData = getExportData(countryName);

            return `
              <div style="
                background: white;
                color: #333;
                padding: 20px 24px;
                border-radius: 4px;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                min-width: 280px;
                max-width: 320px;
                border: 1px solid #e5e7eb;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                margin: 0;
                pointer-events: none;
              ">
                <div style="
                  font-size: 18px;
                  font-weight: 400;
                  color: #111827;
                  margin-bottom: 16px;
                  letter-spacing: 0.01em;
                  line-height: 1.3;
                ">${countryName}</div>
                
                <div style="margin-bottom: 16px;">
                  <div style="
                    font-size: 14px;
                    font-weight: 400;
                    color: #374151;
                    margin-bottom: 8px;
                    letter-spacing: 0.005em;
                  ">Top 3 Export Commodities</div>
                  <div style="
                    font-size: 13px;
                    color: #6b7280;
                    line-height: 1.5;
                    letter-spacing: 0.005em;
                  ">
                    1. ${exportData.commodities[0]}<br/>
                    2. ${exportData.commodities[1]}<br/>
                    3. ${exportData.commodities[2]}
                  </div>
                </div>
                
                <div style="margin-bottom: 16px;">
                  <div style="
                    font-size: 14px;
                    font-weight: 400;
                    color: #374151;
                    margin-bottom: 6px;
                    letter-spacing: 0.005em;
                  ">Export Growth 2025</div>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 6px;
                  ">
                    <span style="
                      font-size: 16px;
                      font-weight: 400;
                      color: #059669;
                      letter-spacing: 0.01em;
                    ">${exportData.percentage}%</span>
                    <span style="
                      color: #059669;
                      font-size: 14px;
                    ">↗</span>
                  </div>
                </div>
                
                <div style="
                  background: #000000;
                  color: white;
                  padding: 10px 16px;
                  border-radius: 4px;
                  font-size: 14px;
                  font-weight: 400;
                  text-align: center;
                  cursor: pointer;
                  letter-spacing: 0.005em;
                  border: none;
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  margin: 0;
                ">
                  Learn More
                </div>
              </div>
            `;
          } catch (err) {
            console.warn("Error generating tooltip:", err);
            return `<div style="padding: 10px; background: white; border: 1px solid #ccc; margin: 0;">Error loading data</div>`;
          }
        }}
        onPolygonHover={handlePolygonHover}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={200}
        atmosphereColor="rgba(200,200,255,0.2)"
        atmosphereAltitude={0.1}
        // Dimensions yang mengisi penuh container
        width={dimensions.width}
        height={dimensions.height}
        // Disable zoom dan pan controls
        enablePointerInteraction={true}
        rendererConfig={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
      />

      {/* CSS Animation untuk loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GlobeMap;
