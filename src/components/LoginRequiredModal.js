import React from 'react';

export default function LoginRequiredModal({ onLogin, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '32px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        minWidth: 320,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>You need to login</div>
        <div style={{ marginBottom: 24, color: '#666', fontSize: 15 }}>Please login to access this page.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button
            style={{
              background: '#3bb3e6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
            }}
            onClick={onLogin}
          >
            Login
          </button>
          <button
            style={{
              background: '#eee',
              color: '#333',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 