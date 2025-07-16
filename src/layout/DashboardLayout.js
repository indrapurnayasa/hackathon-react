// src/layout/DashboardLayout.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { Settings, User, LogOut, AlertTriangle } from "lucide-react";
import PersonalizationModal from "../components/PersonalizationModal";

export default function DashboardLayout() {
  const location = useLocation();
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);
  const [showProfileIncomplete, setShowProfileIncomplete] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);

  // Check if profile is incomplete
  const isProfileSkipped = localStorage.getItem('profileSkipped') === 'true';
  const isProfileCompleted = localStorage.getItem('profileCompleted') === 'true';

  /* ---------- MAIN NAVIGATION ---------- */
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

  /* ---------- SLIDER POSITION FOR NAV PILL ---------- */
  const getSliderPosition = () => {
    const index = menus.findIndex((m) => m.id === activeTab);
    return `translateX(${index * 100}%)`;
  };

  /* ---------- MODAL HANDLERS ---------- */
  const handleProfileClick = () => {
    setShowPersonalizationModal(true);
  };

  const handleCloseModal = () => {
    setShowPersonalizationModal(false);
    setShowProfileTooltip(false);
    // Recheck profile status after modal closes
    const updatedSkipped = localStorage.getItem('profileSkipped') === 'true';
    const updatedCompleted = localStorage.getItem('profileCompleted') === 'true';
    setShowProfileIncomplete(updatedSkipped && !updatedCompleted);
  };

  const handleCautionClick = () => {
    setShowProfileTooltip(!showProfileTooltip);
  };

  const handleStartProfile = () => {
    setShowProfileTooltip(false);
    setShowPersonalizationModal(true);
  };

  /* ---------- SETTINGS-DROPDOWN ITEMS ---------- */
  const settingsMenuItems = [
    {
      id: "account",
      label: "Account",
      icon: <User size={16} />,
      action: () => {
        console.log("Account clicked");
        setShowSettingsDropdown(false);
      },
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut size={16} />,
      action: () => {
        console.log("Logout clicked");
        setShowSettingsDropdown(false);
      },
    },
  ];

  /* ---------- TOGGLE & CLOSE DROPDOWN ---------- */
  const handleSettingsClick = (e) => {
    e.stopPropagation();
    setShowSettingsDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSettingsDropdown &&
        !e.target.closest(".settings-dropdown-container")
      ) {
        setShowSettingsDropdown(false);
      }
      if (
        showProfileTooltip &&
        !e.target.closest(".profile-tooltip-container")
      ) {
        setShowProfileTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettingsDropdown, showProfileTooltip]);

  /* ---------- CHECK PROFILE STATUS ON MOUNT ---------- */
  useEffect(() => {
    const checkProfileStatus = () => {
      const skipped = localStorage.getItem('profileSkipped') === 'true';
      const completed = localStorage.getItem('profileCompleted') === 'true';
      setShowProfileIncomplete(skipped && !completed);
    };
    
    checkProfileStatus();
  }, []);

  /* ---------- RESET SCROLL WHEN ROUTE CHANGES ---------- */
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll("[data-scroll-container]").forEach((el) => {
      el.scrollTop = 0;
    });
  }, [location.pathname]);

  /* ---------- RENDER ---------- */
  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: isShippingPage ? "transparent" : "#f2f2f7",
        fontFamily:
          "'Google Sans Text','Product Sans','Roboto',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
      }}
    >
      {/* ── HEADER ─────────────────────────── */}
      <header
        className="flex-none w-full py-6 z-50 fixed top-0 inset-x-0"
        style={{ background: "transparent" }}
      >
        <div className="flex items-center justify-between w-full px-6">
          {/* Logo / Brand */}
          <div
            className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200"
            style={{ height: 48 }}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span
                className="text-white font-bold text-lg"
                style={{ fontWeight: 300 }}
              >
                ⚡
              </span>
            </div>
            <span
              className="font-light text-gray-900 hidden sm:block text-lg"
              style={{ fontWeight: 300 }}
            >
              ExportIn
            </span>
          </div>

          {/* Centre Navigation Pills */}
          <nav
            className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200"
            style={{ height: 48 }}
          >
            {/* Sliding highlight */}
            <div
              className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out"
              style={{
                width: `calc(${100 / menus.length}% - 4px)`,
                left: 2,
                transform: getSliderPosition(),
              }}
            />
            {menus.map((m) => (
              <NavLink
                key={m.id}
                to={m.path}
                className={`relative flex items-center justify-center px-6 py-2 rounded-full text-sm min-w-[100px] z-10 transition-colors ${
                  activeTab === m.id
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontWeight: 300, lineHeight: 1 }}
              >
                {m.name}
              </NavLink>
            ))}
          </nav>

          {/* Right-side Profile & Settings */}
          <div className="flex items-center space-x-3">
            {/* Settings icon & dropdown */}
            <div className="relative settings-dropdown-container">
              <button
                className="flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                style={{ width: 48, height: 48 }}
                onClick={handleSettingsClick}
              >
                <Settings size={20} className="text-gray-600" />
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 origin-top-right transition-all ${
                  showSettingsDropdown
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
                style={{ zIndex: 60, fontWeight: 300 }}
              >
                {settingsMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile chip - Hi, Versa Section with Enhanced Caution */}
            <div className="relative profile-tooltip-container">
              <div
                className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ height: 48 }}
                onClick={handleProfileClick}
              >
                <span
                  className="text-base font-light text-gray-700 hidden md:block"
                  style={{ fontWeight: 300 }}
                >
                  Hi, Versa
                </span>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span style={{ fontSize: 20 }}>🐴</span>
                  </div>
                  
                  {/* Enhanced Caution Icon - Made Bigger */}
                  {isProfileSkipped && !isProfileCompleted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCautionClick();
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
                    >
                      <AlertTriangle size={14} className="text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Tooltip with Enhanced Button */}
              {showProfileTooltip && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                  <div className="text-sm text-gray-700 mb-3">
                    Kamu belum melengkapi profil personalisasi.
                  </div>
                  <button
                    onClick={handleStartProfile}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-full font-medium hover:bg-green-700 transition-colors text-sm"
                  >
                    Mulai
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ───────────────────── */}
      <main
        className="flex-1 overflow-hidden relative"
        style={{
          background: isShippingPage ? "transparent" : "#f2f2f7",
          paddingTop: isShippingPage ? 0 : 96,
        }}
      >
        <Outlet />
      </main>

      {/* Personalization Modal */}
      <PersonalizationModal
        isOpen={showPersonalizationModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}
