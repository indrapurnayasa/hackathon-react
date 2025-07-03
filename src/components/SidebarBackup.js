// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(location.pathname));

  const menus = [
    { 
      id: "ai-assistant",
      name: "Chat", 
      path: "/dashboard/ai-assistant"
    },
    { 
      id: "shipping",
      name: "Shipping", 
      path: "/dashboard/shipping"
    },
    { 
      id: "trend",
      name: "Analytics", 
      path: "/dashboard/trend"
    }
  ];

  function getActiveTabFromPath(pathname) {
    if (pathname.includes('ai-assistant')) return 'ai-assistant';
    if (pathname.includes('shipping')) return 'shipping';
    if (pathname.includes('trend')) return 'trend';
    return 'ai-assistant';
  }

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Get transform position for sliding animation
  const getSliderPosition = () => {
    const index = menus.findIndex(menu => menu.id === activeTab);
    return `translateX(${index * 100}%)`;
  };

  return (
    <div 
      className="w-full px-6 py-6"
      style={{ 
        fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        background: 'transparent' // Changed back to transparent
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Brand (Kiri) - With white pill border, aligned baseline */}
        <div 
          className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200"
          style={{ height: '48px' }}
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span 
              className="text-white font-bold text-lg"
              style={{ 
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 300
              }}
            >
              ⚡
            </span>
          </div>
          <span 
            className="font-light text-gray-900 hidden sm:block text-lg leading-none"
            style={{ 
              fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
              fontWeight: 300
            }}
          >
            ExportHub
          </span>
        </div>

        {/* Pills Navigation (Tengah) - White background with same height */}
        <div 
          className="relative flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200"
          style={{ height: '48px' }}
        >
          {/* Sliding Background */}
          <div 
            className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out"
            style={{
              width: `calc(${100 / menus.length}% - 4px)`,
              left: '2px',
              transform: getSliderPosition()
            }}
          />
          
          {/* Menu Items */}
          {menus.map((menu) => (
            <NavLink
              key={menu.id}
              to={menu.path}
              onClick={() => handleTabClick(menu.id)}
              className={`relative flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 min-w-[100px] z-10 ${
                activeTab === menu.id
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              style={{
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.01em',
                lineHeight: '1'
              }}
            >
              <span>{menu.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Profile (Kanan) - With white pill border, aligned baseline */}
        <div 
          className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200"
          style={{ height: '48px' }}
        >
          <span 
            className="text-base font-light text-gray-700 hidden md:block leading-none"
            style={{ 
              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
              fontWeight: 300
            }}
          >
            Hi, Versa
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
            <span style={{ fontSize: '20px' }}>🐴</span>
          </div>
        </div>
      </div>
    </div>
  );
}
