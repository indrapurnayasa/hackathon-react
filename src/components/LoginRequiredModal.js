// src/components/LoginRequiredModal.js
import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginRequiredModal({ onLogin, onClose }) {
  const [isBuffering, setIsBuffering] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsBuffering(true);
    setTimeout(() => {
      if (onLogin) {
        onLogin();
      } else {
        navigate('/login');
      }
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4"
      style={{ 
        zIndex: 9999,
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      }}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md flex flex-col shadow-2xl"
        style={{
          fontFamily: "'Product Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#ffffff'
        }}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock size={20} className="text-orange-600" />
            </div>
            <h2 className="text-xl font-light text-gray-900">Login Required</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon and Message */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-lg font-light text-gray-900 mb-2">
              Account Access Required
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              You need to sign in to access this feature. Please login to your account or create a new one to continue.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-sm font-light text-green-800 mb-3">
              With an account, you can:
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs font-light">Save your preferences and settings</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs font-light">Access personalized recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs font-light">Sync data across devices</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignIn}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-full font-light hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all hover:shadow-lg"
            >
              Sign In Now
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-light hover:bg-gray-200 transition-all hover:shadow-lg"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

      {/* Buffer Loading Animation - YouTube style */}
      {isBuffering && (
        <div
          className={`fixed inset-0 bg-white flex items-center justify-center z-[10000] transition-opacity duration-300`}
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
          }}
        >
          {/* Simple buffer animation */}
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
