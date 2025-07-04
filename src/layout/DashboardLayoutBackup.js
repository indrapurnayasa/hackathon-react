// src/layout/DashboardLayout.js
import React, { useEffect } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();

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
        background: isShippingPage ? 'transparent' : '#f2f2f7', // Transparent untuk shipping
        fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
      }}
    >
      {/* Fixed Header - Completely transparent untuk shipping */}
      <div 
        className="flex-none w-full px-6 py-6 z-50"
        style={{ 
          background: 'transparent', // Completely transparent
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
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
            className="relative flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200"
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
      
      {/* Main Content Area - Adjust padding untuk shipping */}
      <main 
        className="flex-1 overflow-hidden relative"
        style={{ 
          background: isShippingPage ? 'transparent' : '#f2f2f7',
          paddingTop: isShippingPage ? '0' : '96px' // No padding untuk shipping
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
