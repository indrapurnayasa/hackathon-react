// src/pages/LoginPage.js
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cargoBg from '../assets/images/cargo-background.avif';
import config from '../config';

// Import GIF files
import Fitur1 from '../assets/Fitur1.gif';
import Fitur2 from '../assets/Fitur2.gif';
import Fitur3 from '../assets/Fitur3.gif';

const exportCardIcon = '🚢';

const LoginPage = () => {
  const leftRef = useRef(null);
  const [leftSectionHeight, setLeftSectionHeight] = useState('auto');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('ai-assistant');
  
  // Loading animation states - Only for successful login
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/dashboard');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Data fitur dengan GIF
  const features = [
    {
      id: "ai-assistant",
      title: "AI Assistant",
      category: "AI-POWERED",
      description: "Get instant insights and recommendations for your export business with our intelligent AI assistant.",
      gif: Fitur1
    },
    {
      id: "shipping",
      title: "Smart Shipping",
      category: "LOGISTICS",
      description: "Optimize your shipping routes and costs with real-time tracking and smart logistics solutions.",
      gif: Fitur2
    },
    {
      id: "analytics",
      title: "Market Analytics",
      category: "INSIGHTS",
      description: "Access comprehensive market data and trends to make informed export decisions.",
      gif: Fitur3
    }
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

    window.addEventListener('resize', updateHeight);
    return () => {
      if (leftRef.current) {
        observer.unobserve(leftRef.current);
      }
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Enhanced Guest Login Handler - Direct to Analytics
  const handleGuestLogin = (e) => {
    e.preventDefault();
    // Set guest mode flags
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('guestAccess', 'true');
    localStorage.removeItem('access_token');
    // Direct navigation to analytics for guest users
    navigate('/dashboard/trend');
  };

  // Handler for login submit - With animation for successful login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.detail || 'Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.removeItem('isGuest');
        localStorage.removeItem('guestAccess');
        
        try {
          const userRes = await fetch(`${config.API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              'Authorization': `Bearer ${data.access_token}`,
              'accept': 'application/json',
            },
          });
          if (userRes.ok) {
            const user = await userRes.json();
            user.name = 'Versa';
          }
        } catch (err) {}
        
        setLoading(false);
        // Store redirect path and start loading animation
        const from = location.state?.from || '/dashboard';
        setRedirectPath(from);
        setIsLoadingAnimation(true);
        setLoadingProgress(0);
        return;
      }
      
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  // Loading Animation Overlay - Only for successful login
  if (isLoadingAnimation) {
    return (
      <div 
        className={`fixed inset-0 bg-gray-100 flex items-center justify-center z-50 transition-all duration-1500 ${
          isFadingOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
        style={{
          fontFamily: "'Product Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif"
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
            {loadingProgress < 50 ? 'Initializing...' : 
             loadingProgress < 80 ? 'Loading your dashboard...' : 
             'Almost ready...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex"
      style={{
        fontFamily: "'Product Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif"
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
            <p className="mt-2 text-gray-600 font-light">Sign in to your ExportIn account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-full text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                  fontSize: '16px',
                  color: '#111827',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  fontSize: '16px',
                  color: '#111827',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-full font-light hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 hover:shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-light hover:bg-gray-200 transition-all hover:shadow-lg"
            >
              Continue as Guest
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 font-light">
            Don't have an account?{' '}
            <a href="#" className="text-green-600 hover:underline font-light">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Features */}
      <div 
        className="hidden lg:block lg:w-1/2 bg-gray-50 relative overflow-hidden"
        style={{ height: leftSectionHeight }}
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${cargoBg})` }}
        />
        
        <div className="relative h-full flex flex-col p-8">
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
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
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
                <div className="text-center mb-6">
                  <div className="text-sm font-light text-green-600 mb-2 uppercase tracking-wide">
                    {selectedFeatureData.category}
                  </div>
                  <h2 className="text-2xl font-light text-gray-900 mb-3">
                    {selectedFeatureData.title}
                  </h2>
                  <p className="text-gray-600 font-light max-w-md mx-auto">
                    {selectedFeatureData.description}
                  </p>
                </div>

                {/* Feature GIF */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="aspect-video bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                      <img
                        key={selectedFeatureData.id}
                        src={selectedFeatureData.gif}
                        alt={selectedFeatureData.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gray-100 items-center justify-center hidden">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">🎬</span>
                          </div>
                          <p className="text-gray-500 text-sm font-light">GIF not available</p>
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
    </div>
  );
};

export default LoginPage;
