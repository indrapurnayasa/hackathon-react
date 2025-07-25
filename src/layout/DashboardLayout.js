// src/layout/DashboardLayout.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import { Settings, LogOut, AlertTriangle } from "lucide-react";
import PersonalizationModal from "../components/PersonalizationModal";
import config from "../config";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] =
    useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [userName, setUserName] = useState("User");
  const [isGuest, setIsGuest] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [showCautionTooltip, setShowCautionTooltip] = useState(false);

  // Fetch user info on mount and check for first-time login
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      const isGuestMode = localStorage.getItem("isGuest") === "true";
      const isProfileCompleted =
        localStorage.getItem("profileCompleted") === "true";
      const isProfileSkipped =
        localStorage.getItem("profileSkipped") === "true";

      if (token && !isGuestMode) {
        try {
          const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          });
          if (res.ok) {
            const user = await res.json();
            setUserName(user.name || user.username || "Versa");
            setIsGuest(false);

            // Show caution if user has skipped personalization
            setIsProfileIncomplete(isProfileSkipped);

            // Always show personalization modal on login unless completed
            if (!isProfileCompleted) {
              setTimeout(() => {
                setShowPersonalizationModal(true);
              }, 500);
            }
            return;
          }
          throw new Error("Failed to fetch user");
        } catch (err) {
          console.error("Error fetching user:", err);
          setIsGuest(true);
          setUserName("User");
        }
      } else {
        setIsGuest(true);
        setUserName(isGuestMode ? "Guest" : "User");
      }
    };

    fetchUser();
  }, []);

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
  // Handle caution click
  const handleCautionClick = (e) => {
    e.stopPropagation();
    setShowCautionTooltip((prev) => !prev);
  };

  // Handle start personalization
  const handleStartPersonalization = () => {
    setShowCautionTooltip(false);
    setShowPersonalizationModal(true);
  };

  // Enhanced handleClosePersonalizationModal
  const handleClosePersonalizationModal = () => {
    setShowPersonalizationModal(false);
    setShowProfileTooltip(false);

    // Check if user completed or skipped
    const isCompleted = localStorage.getItem("profileCompleted") === "true";
    const isSkipped = localStorage.getItem("profileSkipped") === "true";

    // Update caution visibility based on completion status
    setIsProfileIncomplete(isSkipped && !isCompleted);
  };

  // Handle logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setShowSettingsDropdown(false);
  };

  // Handle confirmed logout with loading animation
  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch(`${config.API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: "",
      });
    } catch (err) {
      console.error("Error during logout:", err);
    }

    // Simulate loading for UX
    setTimeout(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("isGuest");
      localStorage.removeItem("profileCompleted");
      localStorage.removeItem("profileSkipped");
      window.location.href = "/login";
    }, 1000);
  };

  // Cancel logout
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  /* ---------- SETTINGS-DROPDOWN ITEMS ---------- */
  const settingsMenuItems = [
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut size={16} />,
      action: handleLogoutClick,
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
        className={`flex-none w-full py-6 z-50 fixed top-0 inset-x-0 ${
          isShippingPage ? "" : "bg-[#f2f2f7]"
        }`}
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
            {/* Settings icon & dropdown - Only show for authenticated users */}
            {!isGuest && (
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
            )}

            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <div className="relative profile-tooltip-container">
                <div
                  className="flex items-center space-x-3 bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ height: 48 }}
                  onClick={
                    isGuest
                      ? (e) => {
                          e.stopPropagation();
                          setIsBuffering(true);
                          setTimeout(() => {
                            navigate("/login", {
                              state: { from: location.pathname },
                            });
                          }, 500);
                        }
                      : null
                  }
                >
                  {isBuffering ? (
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {isGuest ? (
                        <span
                          className="text-base font-light text-gray-700 hidden md:block"
                          style={{ fontWeight: 400 }}
                        >
                          Login
                        </span>
                      ) : (
                        <>
                          <span className="text-base font-light text-gray-700 hidden md:block">
                            Hi, {userName}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span style={{ fontSize: 20 }}>🐴</span>
                          </div>
                          {isProfileIncomplete && (
                            <div
                              className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-600 transition-colors"
                              onClick={handleCautionClick}
                            >
                              <AlertTriangle size={12} className="text-white" />
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Caution Tooltip */}
                {showCautionTooltip && isProfileIncomplete && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                    <div className="text-sm text-gray-700 mb-3">
                      Kamu belum mengisi personalisasi
                    </div>
                    <button
                      onClick={handleStartPersonalization}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-full font-medium hover:bg-green-700 transition-colors text-sm"
                    >
                      Mulai
                    </button>
                  </div>
                )}
              </div>
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

      {/* Buffer Loading Animation - YouTube style */}
      {isBuffering && (
        <div
          className={`fixed inset-0 bg-white flex items-center justify-center z-[9999] transition-opacity duration-300`}
          style={{
            fontFamily:
              "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          {/* Simple buffer animation */}
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[10000]">
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
            style={{
              fontFamily:
                "'Product Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {isLoggingOut ? (
              // Loading state
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-2">
                  Logging out...
                </h3>
                <p className="text-gray-600 font-light">
                  Please wait while we sign you out safely.
                </p>
              </div>
            ) : (
              // Confirmation state
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogOut size={24} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    Konfirmasi Logout
                  </h3>
                  <p className="text-gray-600 font-light">
                    Apakah kamu yakin untuk logout?
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelLogout}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-light hover:bg-gray-200 transition-all"
                  >
                    Tidak
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-full font-light hover:bg-red-700 transition-all"
                  >
                    Yakin
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Personalization Modal */}
      <PersonalizationModal
        isOpen={showPersonalizationModal}
        onClose={handleClosePersonalizationModal}
        userName={userName}
      />
    </div>
  );
}
