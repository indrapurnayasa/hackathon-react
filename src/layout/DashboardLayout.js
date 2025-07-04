// src/layout/DashboardLayout.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { Settings, User, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

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

  const activeTab = getActiveTabFromPath(location.pathname);
  const isShippingPage = location.pathname.includes('shipping');

  // Get transform position for sliding animation
  const getSliderPosition = () => {
    const index = menus.findIndex(menu => menu.id === activeTab);
    return `translateX(${index * 100}%)`;
  };

  // Settings dropdown menu items
  const settingsMenuItems = [
    {
      id: 'account',
      label: 'Account',
      icon: <User size={16} />,
      action: () => {
        console.log('Account clicked');
        setShowSettingsDropdown(false);
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={16} />,
      action: () => {
        console.log('Settings clicked');
        setShowSettingsDropdown(false);
      }
    }
  ];

  // Handle settings dropdown toggle
  const handleSettingsClick = (e) => {
    e.stopPropagation();
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettingsDropdown && !event.target.closest('.settings-dropdown-container')) {
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettingsDropdown]);

  // Reset scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const scrollableElements = document.querySelectorAll('[data-scroll-container]');
    scrollableElements.forEach(element => {
      element.scrollTop = 0;
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div 
      className="h-screen flex flex-col overflow-hidden"
      style={{ 
        background: isShippingPage ? 'transparent' : '#f2f2f7',
        fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
      }}
    >
      {/* Fixed Header */}
      <div 
        className="flex-none w-full py-6 z-50"
        style={{ 
          background: 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0
        }}
      >
        <div className="flex items-center justify-between w-full px-6">
          {/* Logo/Brand */}
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

          {/* Pills Navigation */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200"
            style={{ height: '48px' }}
          >
            <div 
              className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out"
              style={{
                width: `calc(${100 / menus.length}% - 4px)`,
                left: '2px',
                transform: getSliderPosition()
              }}
            />
            
            {menus.map((menu) => (
              <NavLink
                key={menu.id}
                to={menu.path}
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

          {/* Profile and Settings Section */}
          <div className="flex items-center space-x-3">
            {/* Settings Dropdown - Positioned di sebelah kiri Hi, Versa */}
            <div 
              className="relative settings-dropdown-container"
            >
              {/* Settings Button */}
              <div 
                className="flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                style={{ width: '48px', height: '48px' }}
                onClick={handleSettingsClick}
              >
                <Settings 
                  size={20} 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200" 
                />
              </div>

              {/* Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 transition-all duration-200 ease-in-out transform origin-top-right ${
                  showSettingsDropdown 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                style={{ 
                  zIndex: 60,
                  fontFamily: "'Google Sans Text', 'Roboto', sans-serif"
                }}
              >
                {settingsMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 text-left"
                    style={{ fontWeight: 300 }}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile */}
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
      </div>
      
      {/* Main Content Area */}
      <main 
        className="flex-1 overflow-hidden relative"
        style={{ 
          background: isShippingPage ? 'transparent' : '#f2f2f7',
          paddingTop: isShippingPage ? '0' : '96px'
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
