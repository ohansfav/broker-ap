import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';
import '../styles/signin.css';
import '../styles/main.css';

function SignInPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value) {
      localStorage.setItem('userEmail', emailInput.value);
      navigate('/password');
    }
  };

  return (
    <>
      <div className="container">
        <img src="/google-g-logo.svg" alt="Google" className="google-logo" />
        <h1>Sign in</h1>
        <p className="subtitle">Use your Google Account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="input-field" 
              id="email" 
              placeholder="Email or phone" 
              required 
            />
          </div>
          <button type="button" className="forgot-email" onClick={() => navigate('/forgot-email')}>
            Forgot email?
          </button>
          <p className="guest-mode">
            Not your computer? Use Guest mode to sign in privately.
            <button type="button" onClick={() => window.open('https://support.google.com/chrome/answer/6130773')}>
              Learn more about using Guest mode
            </button>
          </p>
          <div className="bottom-buttons">
            <button type="button" className="create-account" onClick={() => navigate('/create-account')}>
              Create account
            </button>
            <button type="submit" className="next-button">Next</button>
          </div>
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

export default SignInPage; 