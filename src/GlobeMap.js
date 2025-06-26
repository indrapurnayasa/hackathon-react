import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const GEOJSON_URL = '/ne_110m_admin_0_countries.geojson';

const GlobeMap = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.pointOfView({ altitude: 4 }, 3000);
    }
  }, [countries]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
      polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
      polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
      polygonCapColor={d => d === hoverD ? 'steelblue' : 'rgba(200,0,0,0.6)'}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) => (
        `<b>${d.ADMIN} (${d.ISO_A2})</b><br/>Populasi: ${d.POP_EST.toLocaleString()}`
      )}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
    />
  );
};

export default GlobeMap;
