import React, { useState } from 'react';
import axios from 'axios';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Indigo/Purple
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Pink/Rose
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Teal/Green
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // Gold/Peach
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', // Sky Blue
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Magenta/Red
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Spring Green
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'  // Deep Teal/Navy
];

export default function LoginForm({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_GRADIENTS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Register Flow
        await axios.post('http://localhost:8080/api/auth/register', {
          username,
          password,
          email,
          avatarUrl: selectedAvatar
        });
        
        // Auto Login after successful registration
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          username,
          password
        });
        onLoginSuccess(response.data);
      } else {
        // Login Flow
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          username,
          password
        });
        onLoginSuccess(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        'Something went wrong. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p>
            {isRegister 
              ? 'Join our premium real-time chat application' 
              : 'Sign in to connect with friends'}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              minLength={3}
              maxLength={20}
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label className="avatar-selection-label">Select Profile Gradient</label>
              <div className="avatar-grid">
                {AVATAR_GRADIENTS.map((gradient, index) => (
                  <div
                    key={index}
                    className={`avatar-option ${selectedAvatar === gradient ? 'selected' : ''}`}
                    style={{ background: gradient }}
                    onClick={() => setSelectedAvatar(gradient)}
                  />
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Register & Sign In' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <span onClick={() => { setIsRegister(false); setError(''); }}>Sign In</span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={() => { setIsRegister(true); setError(''); }}>Register</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
