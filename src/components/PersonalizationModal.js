// src/components/PersonalizationModal.js
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PropTypes from "prop-types";

const PersonalizationModal = ({ isOpen, onClose, userName = "User" }) => {
  const [currentPage, setCurrentPage] = useState(-1); // Start at -1 for welcome screen
  const [selectedCommodity, setSelectedCommodity] = useState(""); // For commodity selection
  const [selectedCountry, setSelectedCountry] = useState(""); // For country selection
  const [showThankYouPage, setShowThankYouPage] = useState(false);

  const totalPages = 3; // 1 welcome + 2 content pages

  // Data untuk halaman pertama - Commodity Options
  const commodityOptions = [
    { id: "cpo", label: "Minyak Kelapa Sawit Mentah", icon: "🌴" },
    { id: "ole", label: "Minyak Kelapa Sawit Olahan", icon: "🥥" },
    { id: "cil", label: "Minyak Kelapa", icon: "🥥" },
    { id: "coa", label: "Kakao", icon: "🍫" },
    { id: "ara", label: "Kopi Arabika", icon: "☕" },
    { id: "rob", label: "Kopi Robusta", icon: "☕" },
    { id: "rub", label: "Karet Alam", icon: "🌱" },
    { id: "crn", label: "Jagung", icon: "🌽" },
  ];

  // Data untuk halaman kedua - Country Options
  const countryOptions = [
    { id: "bd", label: "Bangladesh", icon: "🇧🇩" },
    { id: "ca", label: "Canada", icon: "🇨🇦" },
    { id: "cn", label: "China", icon: "🇨🇳" },
    { id: "eg", label: "Egypt", icon: "🇪🇬" },
    { id: "fr", label: "France", icon: "🇫🇷" },
    { id: "de", label: "Germany", icon: "🇩🇪" },
    { id: "in", label: "India", icon: "🇮🇳" },
    { id: "jp", label: "Japan", icon: "🇯🇵" },
    { id: "my", label: "Malaysia", icon: "🇲🇾" },
    { id: "mx", label: "Mexico", icon: "🇲🇽" },
    { id: "mm", label: "Myanmar", icon: "🇲🇲" },
    { id: "pk", label: "Pakistan", icon: "🇵🇰" },
    { id: "ph", label: "Philippines", icon: "🇵🇭" },
    { id: "ru", label: "Russia", icon: "🇷🇺" },
    { id: "sa", label: "Saudi Arabia", icon: "🇸🇦" },
    { id: "es", label: "Spain", icon: "🇪🇸" },
    { id: "tz", label: "Tanzania", icon: "🇹🇿" },
    { id: "ae", label: "United Arab Emirates", icon: "🇦🇪" },
    { id: "us", label: "United States", icon: "🇺🇸" },
    { id: "vn", label: "Vietnam", icon: "🇻🇳" },
  ];

  // Selection handlers
  const handleCommoditySelect = (commodityId) => {
    setSelectedCommodity(selectedCommodity === commodityId ? "" : commodityId);
  };

  const handleCountrySelect = (countryId) => {
    setSelectedCountry(selectedCountry === countryId ? "" : countryId);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > -1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGetStarted = () => {
    setCurrentPage(0);
  };

  const handleSkip = () => {
    // Save to localStorage that profile was skipped
    localStorage.setItem("profileSkipped", "true");
    localStorage.setItem("profileCompleted", "false");
    // Reset state
    setCurrentPage(-1);
    setSelectedCommodity("");
    setSelectedCountry("");
    setShowThankYouPage(false);
    onClose();
  };

  const handleContinue = () => {
    console.log("Selected preferences:", {
      commodity: selectedCommodity,
      country: selectedCountry,
    });
    setShowThankYouPage(true);

    // Save to localStorage that profile is completed
    localStorage.setItem("profileCompleted", "true");
    localStorage.setItem("profileSkipped", "false");
  };

  // Enhanced handleCloseThankYou function
  const handleCloseThankYou = () => {
    setShowThankYouPage(false);
    setCurrentPage(-1);
    setSelectedCommodity("");
    setSelectedCountry("");
    onClose();
  };

  // Helper function to get selected item with emoji
  const getSelectedItemWithEmoji = (selectedId, options) => {
    const selectedOption = options.find((option) => option.id === selectedId);
    return selectedOption
      ? `${selectedOption.icon} ${selectedOption.label}`
      : null;
  };

  const getPageData = () => {
    switch (currentPage) {
      case 0:
        return {
          title: "Referensi Komoditas Kamu",
          subtitle:
            "Pilih satu komoditas yang akan kamu ekspor / yang pernah kamu ekspor.",
          options: commodityOptions,
          selectedItem: selectedCommodity,
          onSelect: handleCommoditySelect,
          showSelected: true,
        };
      case 1:
        return {
          title: "Referensi Negara Tujuan Ekspor Kamu",
          subtitle:
            "Pilih satu negara tujuan yang akan kamu ekspor / yang pernah kamu ekspor.",
          options: countryOptions,
          selectedItem: selectedCountry,
          onSelect: handleCountrySelect,
          showSelected: true,
        };
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  // Thank You Page - Enhanced with Responsive Design
  if (showThankYouPage) {
    return (
      <div className="personalization-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="modal-content bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
          {/* Header with Close Button */}
          <div className="flex items-center justify-end p-3 sm:p-4 border-b border-gray-100">
            <button
              onClick={handleCloseThankYou}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 sm:p-2 rounded-full hover:bg-gray-100"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 md:p-8 text-center">
            {/* Success Icon */}
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">✅</span>
              </div>
            </div>

            {/* Thank You Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Terima Kasih!
            </h1>

            {/* Thank You Message */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Terima kasih karena sudah membantu kami mengenalmu lebih dalam.
              Kami akan memberikan rekomendasi yang lebih personal untukmu.
            </p>

            {/* Close Button */}
            <button
              onClick={handleCloseThankYou}
              className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-full font-medium hover:bg-green-700 transition-colors text-sm sm:text-base lg:text-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen - Enhanced
  if (currentPage === -1) {
    return (
      <div className="personalization-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="modal-content bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          {/* Welcome Screen Content */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 text-center overflow-y-auto">
            {/* Developer Vector Image */}
            <div className="mb-4 sm:mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="#10B981"
                    fillOpacity="0.1"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="40"
                    fill="#10B981"
                    fillOpacity="0.2"
                  />
                  <circle cx="64" cy="64" r="20" fill="#10B981" />
                  <path d="M64 44L74 54H54L64 44Z" fill="white" />
                  <path d="M64 84L54 74H74L64 84Z" fill="white" />
                  <path d="M44 64L54 54V74L44 64Z" fill="white" />
                  <path d="M84 64L74 74V54L84 64Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Welcome Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Halo, {userName}! Welcome to ExportIn 😊
            </h1>

            {/* Welcome Message */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2 leading-relaxed">
              Kita ingin mengenalmu lebih personal. Boleh bantu kami menjawab
              beberapa pertanyaan? 🤩
            </p>

            {/* Questions Preview */}
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-medium">
                Pertanyaan akan mengenai:
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-start gap-2 sm:gap-3 text-gray-700">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    Referensi Komoditas Ekspor
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2 sm:gap-3 text-gray-700">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    Referensi Negara Tujuan Ekspor
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                Kamu bisa mengisi semua atau salah satu dari pertanyaan based on
                experience yang kamu miliki. Jika kamu merasa belum ingin dan
                belum tahu untuk mengisi personalisasi ini, bisa pilih "Skip for
                now" ya!
              </p>
            </div>

            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-full font-medium hover:bg-green-700 transition-colors text-sm sm:text-base lg:text-lg"
            >
              Get Started
            </button>

            {/* Skip Option */}
            <button
              onClick={handleSkip}
              className="w-full text-gray-500 py-2 sm:py-3 font-medium hover:text-gray-700 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Content Pages - Enhanced Responsive
  const pageData = getPageData();

  return (
    <div className="personalization-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="modal-content bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Progress Bar - Updated for 2 pages */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex gap-1 sm:gap-2">
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full transition-all duration-300 ease-out ${
                    index < currentPage
                      ? "bg-green-600 w-full"
                      : index === currentPage
                      ? "bg-green-600 animate-progress"
                      : "bg-gray-200 w-0"
                  }`}
                  style={index === currentPage ? { width: "100%" } : {}}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content - Scrollable with Responsive Height */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto modal-scrollable-content">
            <div className="p-4 sm:p-6 pb-6 sm:pb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {pageData.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {pageData.subtitle}
              </p>

              {/* Options Grid with Responsive Heights */}
              <div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-y-auto modal-items-container mb-3 sm:mb-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 pr-1 sm:pr-2">
                  {pageData.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => pageData.onSelect(option.id)}
                      className={`dietary-option relative p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ${
                        pageData.selectedItem === option.id
                          ? "border-green-500 bg-green-50 selected"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-lg sm:text-2xl md:text-3xl mb-1 sm:mb-2">
                        {option.icon}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">
                        {option.label}
                      </div>

                      {/* Full Green Circle Indicator */}
                      <div
                        className={`absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-200 ${
                          pageData.selectedItem === option.id
                            ? "bg-green-500"
                            : "border-2 border-gray-300 bg-white"
                        }`}
                      >
                        {pageData.selectedItem === option.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="sm:w-3 sm:h-3"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation - Enhanced Responsive */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-white">
          {/* Selected Item Display - Above Footer */}
          {pageData.showSelected && pageData.selectedItem && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-green-50 border-b border-green-200">
              <p className="text-xs sm:text-sm font-medium text-green-800 text-center">
                Selected:{" "}
                {getSelectedItemWithEmoji(
                  pageData.selectedItem,
                  pageData.options
                )}
              </p>
            </div>
          )}

          <div className="p-4 sm:p-6">
            <div className="flex gap-2 sm:gap-3">
              {/* Back Button - Only show for page 1 (country selection) */}
              {currentPage > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                </button>
              )}

              {/* Main Action Button */}
              <button
                onClick={currentPage === 1 ? handleContinue : handleNext}
                className="flex-1 bg-green-600 text-white py-3 sm:py-4 rounded-full font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {currentPage === 1 ? "Complete Setup" : "Next"}
                {currentPage < 1 && (
                  <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="w-full text-gray-500 py-2 font-medium hover:text-gray-700 transition-colors mt-2 sm:mt-3 text-sm sm:text-base"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalizationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default PersonalizationModal;
