document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signin-form');
    const emailInput = document.getElementById('email');
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('userEmail', emailInput.value);
        window.location.href = 'password.html';
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement === emailInput) {
            if (form.checkValidity()) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}); 