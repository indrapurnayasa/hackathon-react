// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    getActiveTabFromPath(location.pathname)
  );

  const menus = [
    { id: "ai-assistant", name: "Chat", path: "/dashboard/ai-assistant" },
    { id: "shipping", name: "Shipping", path: "/dashboard/shipping" },
    { id: "trend", name: "Analytics", path: "/dashboard/trend" },
  ];

  function getActiveTabFromPath(pathname) {
    if (pathname.includes("ai-assistant")) return "ai-assistant";
    if (pathname.includes("shipping")) return "shipping";
    if (pathname.includes("trend")) return "trend";
    return "ai-assistant";
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
    const index = menus.findIndex((menu) => menu.id === activeTab);
    return `translateX(${index * 100}%)`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Header Section with improved spacing */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo Section - adjusted padding */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            Export2Explore
          </span>
        </div>

        {/* User Section - adjusted padding */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">Hi</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">V</span>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="px-8 pb-4">
        <div className="relative bg-gray-100 rounded-full p-1 max-w-md">
          {/* Sliding background */}
          <div
            className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out"
            style={{
              width: `${100 / menus.length}%`,
              transform: getSliderPosition(),
            }}
          />

          {/* Menu items */}
          <div className="relative flex">
            {menus.map((menu) => (
              <NavLink
                key={menu.id}
                to={menu.path}
                className={`flex-1 px-6 py-2 text-sm font-medium text-center rounded-full transition-colors duration-300 relative z-10 ${
                  activeTab === menu.id
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleTabClick(menu.id)}
              >
                {menu.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
