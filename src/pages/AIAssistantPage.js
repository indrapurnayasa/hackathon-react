// src/layout/DashboardLayout.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import { Settings, User, LogOut, AlertTriangle } from "lucide-react";
import PersonalizationModal from "../components/PersonalizationModal";
import config from '../config';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isGuest, setIsGuest] = useState(false);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      const isGuestMode = localStorage.getItem('isGuest') === 'true';
      
      if (token && !isGuestMode) {
        try {
          const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
            },
          });
          if (res.ok) {
            const user = await res.json();
            setUserName(user.name || user.username || 'Versa');
            setIsGuest(false);
            return;
          }
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
      
      // Default to guest or handle failed login
      setIsGuest(true);
      setUserName(isGuestMode ? 'Guest' : 'User');
    };

    fetchUser();
  }, []);

  // Navigation and other handlers...
  const menus = [
    { id: "ai-assistant", name: "Chat", path: "/dashboard/ai-assistant" },
    { id: "shipping", name: "Shipping", path: "/dashboard/shipping" },
    { id: "trend", name: "Analytics", path: "/dashboard/trend" },
  ];

  const getActiveTabFromPath = (pathname) => {
    if (pathname.includes("ai-assistant")) return "ai-assistant";
    if (pathname.includes("shipping")) return "shipping";
    if (pathname.includes("trend")) return "trend";
    return "ai-assistant";
  };

  const activeTab = getActiveTabFromPath(location.pathname);
  const isShippingPage = location.pathname.includes("shipping");

  const getSliderPosition = () => {
    const index = menus.findIndex((m) => m.id === activeTab);
    return `translateX(${index * 100}%)`;
  };

  const handleProfileClick = () => {
    setShowPersonalizationModal(true);
  };

  const handleClosePersonalizationModal = () => {
    setShowPersonalizationModal(false);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: isShippingPage ? "transparent" : "#f2f2f7",
        fontFamily: "'Google Sans Text','Product Sans','Roboto',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
      }}
    >
      {/* Header */}
      <header className="flex-none w-full py-6 z-50 fixed top-0 inset-x-0" style={{ background: "transparent" }}>
        <div className="flex items-center justify-between w-full px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200" style={{ height: 48 }}>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="font-light text-gray-900 hidden sm:block text-lg">ExportIn</span>
          </div>

          {/* Navigation */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200" style={{ height: 48 }}>
            <div className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out" style={{
              width: `calc(${100 / menus.length}% - 4px)`,
              left: 2,
              transform: getSliderPosition(),
            }} />
            {menus.map((m) => (
              <NavLink key={m.id} to={m.path} className={`relative flex items-center justify-center px-6 py-2 rounded-full text-sm min-w-[100px] z-10 transition-colors ${
                activeTab === m.id ? "text-white" : "text-gray-600 hover:text-gray-900"
              }`}>
                {m.name}
              </NavLink>
            ))}
          </nav>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ height: 48 }} onClick={handleProfileClick}>
              <span className="text-base font-light text-gray-700 hidden md:block">Hi, {userName}</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span style={{ fontSize: 20 }}>🐴</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative" style={{
        background: isShippingPage ? "transparent" : "#f2f2f7",
        paddingTop: isShippingPage ? 0 : 96,
      }}>
        <Outlet />
      </main>

      <PersonalizationModal isOpen={showPersonalizationModal} onClose={handleClosePersonalizationModal} />
    </div>
  );
}
