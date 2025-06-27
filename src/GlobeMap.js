import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const GEOJSON_URL = "/countries.geojson";

const GlobeMap = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Local GeoJSON data loaded:", data);
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error loading local GeoJSON data:", error);
        setCountries({ features: [] });
      });
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.pointOfView({ altitude: 4 }, 3000);
    }
  }, [countries]);

  return (
    <div className="w-full h-full bg-transparent flex items-center justify-center">
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countries.features.filter(
          (d) => d.properties && d.properties.ISO_A2 !== "AQ"
        )}
        polygonAltitude={(d) => (d === hoverD ? 0.04 : 0.02)}
        polygonCapColor={(d) =>
          d === hoverD ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"
        }
        polygonSideColor={() => "rgba(255, 255, 255, 0.2)"}
        polygonStrokeColor={() => "#666"}
        polygonLabel={({ properties: d }) => {
          if (!d) return "No data";

          const countryName =
            d.NAME_EN ||
            d.NAME ||
            d.ADMIN ||
            d.NAME_LONG ||
            d.SOVEREIGNT ||
            d.name ||
            d.admin ||
            "Unknown Country";

          const countryCode = d.ISO_A2 || d.ADM0_A3 || "";
          const population = d.POP_EST || "";

          return `
            <div style="
              background: white;
              color: #333;
              padding: 16px 20px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              font-family: 'Inter', 'Arial', sans-serif;
              min-width: 200px;
              max-width: 280px;
              border: 1px solid #e5e7eb;
            ">
              <div style="
                font-size: 16px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 8px;
                line-height: 1.3;
              ">${countryName}</div>
              
              ${
                countryCode
                  ? `
                <div style="
                  font-size: 13px;
                  color: #6b7280;
                  margin-bottom: 6px;
                  font-weight: 500;
                ">
                  <span style="color: #9ca3af;">Code:</span> ${countryCode}
                </div>
              `
                  : ""
              }
              
              ${
                population
                  ? `
                <div style="
                  font-size: 13px;
                  color: #6b7280;
                  font-weight: 500;
                ">
                  <span style="color: #9ca3af;">Population:</span> ${parseInt(
                    population
                  ).toLocaleString()}
                </div>
              `
                  : ""
              }
            </div>
          `;
        }}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
        width={900}
        height={550}
      />
    </div>
  );
};

export default GlobeMap;
