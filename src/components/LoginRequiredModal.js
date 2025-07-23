// src/components/LoginRequiredModal.js
import React from 'react';
import { X, Lock } from 'lucide-react';

export default function LoginRequiredModal({ onLogin, onClose }) {
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
              onClick={onLogin}
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

          {/* Additional Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 font-light">
              Don't have an account?{' '}
              <button 
                onClick={onLogin}
                className="text-green-600 hover:underline font-light"
              >
                Create one for free
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
