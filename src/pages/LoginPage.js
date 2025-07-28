// src/pages/LoginPage.js
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cargoBg from "../assets/images/cargo-background.avif";
import config from "../config";

// Import GIF files
import Fitur1 from "../assets/Fitur1.gif";
import Fitur2 from "../assets/Fitur2.gif";
import Fitur3 from "../assets/Fitur3.gif";

const exportCardIcon = "🚢";

const LoginPage = () => {
  const leftRef = useRef(null);
  const [leftSectionHeight, setLeftSectionHeight] = useState("auto");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("ai-assistant");
  const [showSigningInModal, setShowSigningInModal] = useState(false);

  // Loading animation states - Only for successful login
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/dashboard");
  // Loading animation states for back to landing page
  const [isBackLoadingAnimation, setIsBackLoadingAnimation] = useState(false);
  const [backLoadingProgress, setBackLoadingProgress] = useState(0);

  const navigate = useNavigate();

  // Data fitur dengan GIF
  const features = [
    {
      id: "ai-assistant",
      title: "AI Assistant",
      category: "AI-POWERED",
      description:
        "Get instant insights and recommendations for your export business with our intelligent AI assistant.",
      gif: Fitur1,
    },
    {
      id: "shipping",
      title: "Smart Shipping",
      category: "LOGISTICS",
      description:
        "Optimize your shipping routes and costs with real-time tracking and smart logistics solutions.",
      gif: Fitur2,
    },
    {
      id: "analytics",
      title: "Market Analytics",
      category: "INSIGHTS",
      description:
        "Access comprehensive market data and trends to make informed export decisions.",
      gif: Fitur3,
    },
  ];

  // Di LoginPage.js, ubah bagian loading animation
  useEffect(() => {
    if (isLoadingAnimation) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsFadingOut(true);
              setTimeout(() => {
                navigate(redirectPath); // Use the stored path
              }, 800);
            }, 300);
            return 100;
          }
          const increment = Math.random() * 15 + 5;
          return Math.min(prev + increment, 100);
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoadingAnimation, navigate, redirectPath]);

  // Loading animation effect for back to landing page
  useEffect(() => {
    if (isBackLoadingAnimation) {
      const interval = setInterval(() => {
        setBackLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              navigate("/");
            }, 100);
            return 100;
          }
          return Math.min(prev + Math.random() * 15 + 5, 100);
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isBackLoadingAnimation, navigate]);

  // ResizeObserver to track left section height
  useEffect(() => {
    const updateHeight = () => {
      if (leftRef.current) {
        setLeftSectionHeight(leftRef.current.offsetHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (leftRef.current) {
      observer.observe(leftRef.current);
    }

    window.addEventListener("resize", updateHeight);
    return () => {
      if (leftRef.current) {
        observer.unobserve(leftRef.current);
      }
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Handler for login submit - With animation for successful login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setShowSigningInModal(true);

    try {
      const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(
          data?.detail || "Login failed. Please check your credentials."
        );
        setLoading(false);
        setShowSigningInModal(false);
        return;
      }

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.removeItem("isGuest");
        localStorage.removeItem("guestAccess");

        try {
          const userRes = await fetch(`${config.API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              accept: "application/json",
            },
          });
          if (userRes.ok) {
            const user = await userRes.json();
            user.name = "Versa";
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }

        setLoading(false);
        // Always redirect to shipping page
        setRedirectPath("/dashboard/shipping");
        setIsLoadingAnimation(true);
        setLoadingProgress(0);
        return;
      }

      setError("Login failed. Please check your credentials.");
      setLoading(false);
      setShowSigningInModal(false);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
      setShowSigningInModal(false);
    }
  };

  const selectedFeatureData = features.find((f) => f.id === selectedFeature);

  // Loading Animation Overlay - Only for successful login
  if (isLoadingAnimation) {
    return (
      <div
        className={`fixed inset-0 bg-gray-100 flex items-center justify-center z-50 transition-all duration-1500 ${
          isFadingOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
        }`}
        style={{
          fontFamily:
            "'Product Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl font-light">⚡</span>
            </div>
            <h1 className="text-4xl font-light text-gray-900">ExportIn</h1>
          </div>

          {/* Loading Progress */}
          <div className="w-80 bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <p className="text-gray-600 font-light">
            {loadingProgress < 50
              ? "Initializing..."
              : loadingProgress < 80
              ? "Loading your dashboard..."
              : "Almost ready..."}
          </p>
        </div>
      </div>
    );
  }

  const handleBackToLanding = (event) => {
    // Prevent any form submission events
    event?.preventDefault?.();
    event?.stopPropagation?.();
    setIsBackLoadingAnimation(true);
    setBackLoadingProgress(0);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        fontFamily:
          "'Product Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Left Section - Login Form */}
      <div
        ref={leftRef}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <span className="text-2xl">{exportCardIcon}</span>
            </div>
            <h2 className="text-3xl font-light text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600 font-light">
              Sign in to your ExportIn account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-full text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or Username
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-light bg-white text-gray-900 placeholder-gray-400"
                placeholder="Enter your email or username"
                style={{
                  fontSize: "16px",
                  color: "#111827",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-light bg-white text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
                style={{
                  fontSize: "16px",
                  color: "#111827",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-full font-light hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 hover:shadow-lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Guest Access */}
            <div className="mt-4 text-center">
              <button
                onClick={handleBackToLanding}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-light hover:bg-gray-200 transition-all hover:shadow-lg"
              >
                Back to Landing Page
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Features */}
      <div
        className="hidden lg:block lg:w-1/2 bg-gray-50 relative overflow-hidden cursor-pointer"
        style={{ height: leftSectionHeight }}
        onClick={() => navigate("/")}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity hover:opacity-15"
          style={{ backgroundImage: `url(${cargoBg})` }}
        />

        {/* Content Container */}
        <div
          className="relative h-full flex flex-col p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-light text-lg">⚡</span>
              </div>
              <h1 className="text-4xl font-light text-gray-900">ExportIn</h1>
            </div>
            <p className="text-lg text-gray-600 font-light">
              Optimize your export operations with AI-powered insights
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`px-6 py-2 rounded-full text-sm font-light transition-all ${
                    selectedFeature === feature.id
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Content */}
          <div className="flex-1 flex flex-col">
            {selectedFeatureData && (
              <>
                {/* Feature Info */}
                <div className="text-center mb-2">
                  <div className="text-sm font-light text-green-600 mb-1 uppercase tracking-wide">
                    {selectedFeatureData.category}
                  </div>
                  <h2 className="text-2xl font-light text-gray-900 mb-2">
                    {selectedFeatureData.title}
                  </h2>
                  <p className="text-gray-600 font-light max-w-md mx-auto">
                    {selectedFeatureData.description}
                  </p>
                </div>

                {/* Feature GIF */}
                <div className="flex-1 flex items-start justify-center mt-2">
                  <div className="w-full max-w-md">
                    <div className="aspect-video bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                      <img
                        key={selectedFeatureData.id}
                        src={selectedFeatureData.gif}
                        alt={selectedFeatureData.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full bg-gray-100 items-center justify-center hidden">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">🎬</span>
                          </div>
                          <p className="text-gray-500 text-sm font-light">
                            GIF not available
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Signing In Modal */}
      {showSigningInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center">
            <div className="w-16 h-16 mb-6">
              <div className="w-full h-full border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">
              Signing in...
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Please wait while we verify your credentials
            </p>
          </div>
        </div>
      )}

      {/* Loading Animation Overlay for Back to Landing Page */}
      {isBackLoadingAnimation && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999] font-['Inter']">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-light">⚡</span>
              </div>
              <h1 className="text-4xl font-light text-gray-900">ExportIn</h1>
            </div>

            <div className="w-80 bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${backLoadingProgress}%` }}
              />
            </div>

            <p className="text-gray-600 font-light">
              {backLoadingProgress < 50
                ? "Initializing..."
                : backLoadingProgress < 80
                ? "Redirecting to landing page..."
                : "Almost ready..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
