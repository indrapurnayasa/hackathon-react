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
  const [showProfileIncomplete, setShowProfileIncomplete] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isGuest, setIsGuest] = useState(false);

  // Fetch user info on mount and check for first-time login
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
            
            // Check if this is first-time login (no personalization completed)
            const isProfileCompleted = localStorage.getItem('profileCompleted') === 'true';
            if (!isProfileCompleted) {
              // Show personalization modal for logged-in users
              setTimeout(() => {
                setShowPersonalizationModal(true);
              }, 500);
            }
            return;
          }
        } catch (err) {}
      }
      
      if (isGuestMode) {
        setIsGuest(true);
        setUserName('Guest');
      } else {
        setIsGuest(true);
        setUserName('User');
      }
    };

    fetchUser();
  }, []);

  // Check if profile is incomplete - Only for logged-in users
  const isProfileSkipped = localStorage.getItem('profileSkipped') === 'true';
  const isProfileCompleted = localStorage.getItem('profileCompleted') === 'true';
  const token = localStorage.getItem('access_token');
  const shouldShowCaution = token && !isGuest && isProfileSkipped && !isProfileCompleted;

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

  const handleClosePersonalizationModal = () => {
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

  // Add logout handler
  const handleLogout = async () => {
    try {
      await fetch(`${config.API_BASE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: '',
      });
    } catch (err) {}
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('isGuest');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('profileSkipped');
    window.location.href = '/';
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
      action: handleLogout,
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

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ height: 48 }}
                onClick={isGuest ? (e) => { e.stopPropagation(); navigate('/login', { state: { from: location.pathname } }); } : handleProfileClick}
              >
                {isGuest ? (
                  <span
                    className="text-base font-light text-gray-700 hidden md:block"
                    style={{ fontWeight: 400 }}
                  >
                    Login
                  </span>
                ) : (
                  <>
                    <span className="text-base font-light text-gray-700 hidden md:block">Hi, {userName}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span style={{ fontSize: 20 }}>🐴</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Profile Tooltip */}
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
        onClose={handleClosePersonalizationModal}
      />
    </div>
  );
}
