import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargoBg from '../assets/images/cargo-background.avif';
import config from '../config';

const exportCardIcon = '🚢';

const iconAnim = {
  transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
};

const cardAnim = {
  transition: 'box-shadow 0.2s, transform 0.2s',
};

const LoginPage = () => {
  const leftRef = useRef(null);
  const [leftSectionHeight, setLeftSectionHeight] = useState('auto');
  const [iconHover, setIconHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingToken, setCheckingToken] = useState(false); // not used, but keep for compatibility
  const navigate = useNavigate();

  // ResizeObserver to track left section height
  useEffect(() => {
    const updateHeight = () => {
      if (leftRef.current) {
        setLeftSectionHeight(leftRef.current.offsetHeight);
      }
    };

    // Initial height update
    updateHeight();

    // Create ResizeObserver
    const observer = new ResizeObserver(updateHeight);
    if (leftRef.current) {
      observer.observe(leftRef.current);
    }

    // Also listen for window resize
    window.addEventListener('resize', updateHeight);

    return () => {
      if (leftRef.current) {
        observer.unobserve(leftRef.current);
      }
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Handler for guest login
  const handleGuestLogin = (e) => {
    e.preventDefault();
    navigate('/landing');
  };

  // Handler for login submit
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
        // Fetch user info and change name to Versa
        try {
          const userRes = await fetch(`${config.API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              'Authorization': `Bearer ${data.access_token}`,
              'accept': 'application/json',
            },
          });
          if (userRes.ok) {
            const user = await userRes.json();
            user.name = 'Versa'; // Change name to Versa
            // Optionally, save user info to state or context here
          }
        } catch (err) {}
        setLoading(false);
        navigate('/landing');
        return;
      }
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f7f8fa',
      fontFamily: 'Poppins, Inter, Arial, sans-serif',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      gap: '40px',
    }}>
      {/* Left Section */}
      <div
        ref={leftRef}
        style={{
          width: '40%',
          minWidth: 400,
          maxWidth: 450,
          background: '#fff',
          borderRadius: '28px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '48px 0',
        }}
      >
        <div style={{ width: '100%', maxWidth: 340, padding: '0 40px' }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, color: '#222', textAlign: 'center', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 28, color: '#3bb3e6' }}>🌐</span> ExportCo
          </div>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#3bb3e6', textAlign: 'center', letterSpacing: '0.2px' }}>
            Empowering Your Global Trade Journey
          </div>
          <div style={{ color: '#7b7b7b', fontSize: 14, marginBottom: 32, fontWeight: 400, textAlign: 'center', lineHeight: 1.4 }}>
            Seamlessly manage your export operations, connect with partners worldwide, and unlock new opportunities in international trade.
          </div>
          {error && (
            <div style={{
              background: '#ffeaea',
              color: '#d32f2f',
              borderRadius: 10,
              padding: '10px 16px',
              marginBottom: 16,
              fontWeight: 500,
              fontSize: 15,
              textAlign: 'center',
              border: '1px solid #ffd6d6',
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid #e3e6ea',
              borderRadius: 24,
              padding: '10px 18px',
              marginBottom: 16,
              background: '#f7f8fa',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <span style={{ marginRight: 10, color: '#b0bec5', fontSize: 18 }}>📧</span>
              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 16, background: 'transparent', color: '#222', fontFamily: 'inherit' }}
                autoComplete="username"
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid #e3e6ea',
              borderRadius: 24,
              padding: '10px 18px',
              marginBottom: 20,
              background: '#f7f8fa',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <span style={{ marginRight: 10, color: '#b0bec5', fontSize: 18 }}>🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 16, background: 'transparent', color: '#222', fontFamily: 'inherit' }}
                autoComplete="current-password"
              />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%',
              background: '#3bb3e6',
              color: '#fff',
              border: 'none',
              borderRadius: 24,
              padding: '14px 0',
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 12,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(59,179,230,0.08)',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1,
            }}>{loading ? 'Logging in...' : 'Login'}</button>
            {/* Divider between buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '12px 0',
            }}>
              <div style={{ flex: 1, height: 1, background: '#e3e6ea' }} />
              <span style={{ margin: '0 16px', color: '#94a3b8', fontWeight: 600, fontSize: 15 }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#e3e6ea' }} />
            </div>
            <button onClick={handleGuestLogin} style={{
              width: '100%',
              background: '#f7f8fa',
              color: '#3bb3e6',
              border: '1.5px solid #3bb3e6',
              borderRadius: 24,
              padding: '12px 0',
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 8,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}>Login as Guest</button>
          </form>
          <div style={{ textAlign: 'center', fontSize: 14, color: '#7b7b7b', fontWeight: 400, marginTop: 8 }}>
            Forgot your password? <a href="#" style={{ color: '#3bb3e6', textDecoration: 'none', fontWeight: 500 }}>Reset</a>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div
        style={{
          width: '60%',
          minWidth: 500,
          borderRadius: '28px',
          marginLeft: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          background: '#bfe6f8',
          height: leftSectionHeight,
          border: 'none',
        }}
      >
        {/* Cargo background image with low opacity */}
        <img
          src={cargoBg}
          alt="Cargo export background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.28,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Soft blue overlay for color tone */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#bfe6f8',
          opacity: 0.7,
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        <style>{`
          @keyframes floatY {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-16px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
        <div style={{ width: '100%', maxWidth: 480, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
          <div style={{ fontWeight: 700, fontSize: 28, marginTop: 48, marginBottom: 18, color: '#fff', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.18)', letterSpacing: '0.5px', textAlign: 'center', alignSelf: 'center' }}>
            Seamless Export, Smarter Trade
          </div>
          <div style={{ color: '#eaf6fb', fontSize: 18, fontWeight: 500, marginBottom: 32, textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
            Manage shipments, connect with global partners, and grow your business with AI-powered export solutions.
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 24,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: cardHover
                ? '0 16px 48px rgba(59,179,230,0.18), 0 2px 8px rgba(0,0,0,0.10)'
                : '0 8px 32px rgba(0,0,0,0.10)',
              margin: '0 auto',
              maxWidth: 360,
              cursor: 'pointer',
              transform: cardHover ? 'translateY(-4px) scale(1.025)' : 'none',
              ...cardAnim,
            }}
            onMouseEnter={() => setCardHover(true)}
            onMouseLeave={() => setCardHover(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#3bb3e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 18,
                  marginRight: 10,
                  boxShadow: iconHover
                    ? '0 0 0 6px rgba(59,179,230,0.10)' : 'none',
                  transform: iconHover ? 'scale(1.12) rotate(-8deg)' : 'none',
                  backgroundImage: iconHover
                    ? 'linear-gradient(120deg, #3bb3e6 60%, #5ee2ff 100%)'
                    : 'none',
                  ...iconAnim,
                }}
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
              >{exportCardIcon}</div>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#3bb3e6' }}>Export Smarter</span>
            </div>
            <p style={{ fontSize: 15, color: '#555', margin: 0 }}>
              Optimize your export operations, connect with global partners, and grow your international business with AI-powered insights and automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 