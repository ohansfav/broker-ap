// Language selector functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            // In a real app, this would change the language
            console.log('Language changed to:', e.target.value);
        });
    }
}); 