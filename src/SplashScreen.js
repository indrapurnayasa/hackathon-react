import React, { useState, useEffect } from "react";

const SplashScreen = ({ onContinue }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Simulasi loading progress seperti YouTube
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onContinue();
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1500 ease-out ${
        isFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2d2d2d 70%, #000000 100%)",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Overlay hitam transparan dengan efek noise */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-1500 ease-out ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Loading Screen */}
      {isLoading && (
        <div
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            isFadingOut
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          {/* Logo kecil saat loading */}
          <div className="mb-8">
            <h2
              className="text-4xl text-white mb-4 opacity-80"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                letterSpacing: "0.01em",
              }}
            >
              ExportCo
            </h2>
          </div>

          {/* Loading Bar seperti YouTube */}
          <div className="w-80 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-white text-sm opacity-70"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: "400",
                  letterSpacing: "0.005em",
                }}
              >
                Loading...
              </span>
              <span
                className="text-white text-sm opacity-70"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: "400",
                  letterSpacing: "0.005em",
                }}
              >
                {Math.round(loadingProgress)}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-gray-700 bg-opacity-50 rounded-full overflow-hidden">
              {/* Progress Bar Fill */}
              <div
                className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-200 ease-out relative"
                style={{ width: `${loadingProgress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Spinning loader */}
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Main Content - Muncul setelah loading */}
      {!isLoading && (
        <div
          className={`relative z-10 text-center animate-fade-in transition-all duration-1200 ease-out ${
            isFadingOut
              ? "opacity-0 transform translate-y-8 scale-95"
              : "opacity-100 transform translate-y-0 scale-100"
          }`}
        >
          {/* Logo/Tulisan ExportCo dengan font Helvetica Neue */}
          <div className="mb-12 animate-fade-in-up">
            <h1
              className={`text-8xl text-white mb-4 transition-all duration-1200 ease-out ${
                isFadingOut
                  ? "opacity-0 transform translate-y-6"
                  : "opacity-100 transform translate-y-0"
              }`}
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: "400",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
                textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                animation: isFadingOut
                  ? "none"
                  : "glow 2s ease-in-out infinite alternate",
              }}
            >
              ExportCo
            </h1>
          </div>

          {/* Tombol Continue dengan font Helvetica Neue */}
          <button
            onClick={handleContinue}
            className={`group relative px-12 py-4 bg-transparent backdrop-blur-sm border-2 border-white border-opacity-40 rounded-full text-white font-normal text-lg tracking-wide transition-all duration-1000 ease-out hover:bg-white hover:bg-opacity-10 hover:scale-105 hover:shadow-2xl animate-pulse-slow ${
              isFadingOut
                ? "opacity-0 transform translate-y-4 scale-90"
                : "opacity-100 transform translate-y-0 scale-100"
            }`}
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: "400",
              letterSpacing: "0.005em",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            disabled={isFadingOut}
          >
            <span className="relative z-10">Continue</span>

            {/* Efek ripple saat hover */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </button>

          {/* Indikator loading kecil */}
          <div
            className={`mt-8 flex justify-center space-x-2 transition-all duration-1000 ease-out ${
              isFadingOut
                ? "opacity-0 transform translate-y-2"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            <div
              className="w-2 h-2 bg-white bg-opacity-40 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-white bg-opacity-40 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-white bg-opacity-40 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes glow {
          from {
            text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
          }
          to {
            text-shadow: 0 4px 30px rgba(255, 255, 255, 0.6),
              0 0 40px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
