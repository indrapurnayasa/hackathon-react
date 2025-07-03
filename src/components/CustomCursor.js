// src/components/CustomCursor.js
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Update trail positions
      setTrailPositions(prev => {
        const newTrail = [newPosition, ...prev.slice(0, 8)]; // Keep 8 trail points
        return newTrail;
      });
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail/Echo Effect */}
      {trailPositions.map((position, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: position.x - 8,
            top: position.y - 8,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#000000',
            opacity: Math.max(0.1, 1 - (index * 0.15)), // Fade effect
            transform: `scale(${Math.max(0.3, 1 - (index * 0.1))})`, // Scale effect
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            mixBlendMode: 'difference' // Cool blend effect
          }}
        />
      ))}
      
      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          border: '2px solid #ffffff',
          transition: 'transform 0.1s ease-out',
          mixBlendMode: 'difference',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}
      />
    </>
  );
};

export default CustomCursor;
