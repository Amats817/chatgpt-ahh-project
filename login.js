document.addEventListener('DOMContentLoaded', () => {
    const profileDropdown = document.getElementById('logged-in-profile');
    const profileDropdownToggle = profileDropdown ? profileDropdown.querySelector('.profile-dropdown-toggle') : null;

    if (profileDropdownToggle && profileDropdown) {
        profileDropdownToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from immediately closing it
            profileDropdown.classList.toggle('active'); // Toggle the 'active' class on click
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!profileDropdown.contains(event.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // You can keep the isLoggedIn simulation here or move it to main.js if it affects other elements
    const isLoggedIn = true; // Set to true for testing logged-in state, false for logged-out
    const authButtons = document.getElementById('logged-out-buttons');

    if (isLoggedIn) {
        if (authButtons) authButtons.style.display = 'none';
        if (profileDropdown) profileDropdown.style.display = 'block'; // or 'flex'
    } else {
        if (authButtons) authButtons.style.display = 'flex'; // or 'block'
        if (profileDropdown) profileDropdown.style.display = 'none';
    }
});