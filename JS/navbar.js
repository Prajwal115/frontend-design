document.addEventListener('DOMContentLoaded', () => {
    // Select the hamburger menu icon
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    // Select the mobile navigation overlay
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    // Select the close button inside the mobile overlay
    const closeBtn = document.querySelector('.mobile-nav-overlay .close-btn');

    // Add click event listener to the hamburger menu icon
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            // When hamburger is clicked, show the mobile navigation overlay
            if (mobileNavOverlay) {
                mobileNavOverlay.style.display = 'flex'; // Use flex to center content
                // Optional: Add a class for CSS transitions (e.g., fade-in)
                // mobileNavOverlay.classList.add('is-open');
            }
        });
    }

    // Add click event listener to the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            // When close button is clicked, hide the mobile navigation overlay
            if (mobileNavOverlay) {
                mobileNavOverlay.style.display = 'none';
                // Optional: Remove the class for CSS transitions
                // mobileNavOverlay.classList.remove('is-open');
            }
        });
    }

    // Optional: Hide the mobile menu if a link inside it is clicked
    // This is useful for single-page applications or smooth navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay) {
                mobileNavOverlay.style.display = 'none';
            }
        });
    });
});

