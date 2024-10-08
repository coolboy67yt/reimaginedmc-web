// Function to create and insert the navigation bar at the top of the body
function addNavbar() {
    const navHTML = `
        <nav>
            <div class="logo">
                <a href="home.html"><img src="assets/img/logo.png" width="150px"></a>
            </div>
            <ul class="nav-links">
                <li><a href="pages/about.html">About</a></li>
                <li><a href="pages/ourstaff.html">Staff</a></li>
                <li><a href="pages/showcase.html">Showcase</a></li>
                <li><a href="pages/news.html">News</a></li>
                <li><a href="pages/pacerman.html">Pacerman29</a></li>
            </ul>
        </nav>
    `;

    // Create a container for the navbar
    const navContainer = document.createElement('div');
    navContainer.innerHTML = navHTML;

    // Insert the navbar at the top of the body
    document.body.insertBefore(navContainer, document.body.firstChild);
}

// Function to create and insert the footer at the bottom of the body
function addFooter() {
    const footerHTML = `
        <footer>
            <p>ReimaginedMC is owned by Pacerman29.</p>
            <div class="link_icons">
                <p><a href="https://www.ebay.com/str/flyinofftheshelf"><i style="color: white" class="fa-solid fa-bag-shopping"></i></a> | <a href="https://patreon.com/pacerman29"><i style="color: white" class="fa-brands fa-patreon"></i></a> | <a href="https://twitch.tv/pacermann29"><i style="color: white" class="fa-brands fa-twitch"></i></a> | <a href="https://www.youtube.com/@pacerman2952"><i style="color: white" class="fa-brands fa-youtube"></i></a> | <a href="https://github.com/coolboy67yt/reimaginedmc-web"><i style="color: white" class="fa-brands fa-github"></i></a>
            </div>
        </footer>
    `;

    // Create a container for the footer
    const footerContainer = document.createElement('div');
    footerContainer.innerHTML = footerHTML;

    // Insert the footer at the bottom of the body
    document.body.appendChild(footerContainer);
}

// Function to handle resizing and replacing the nav content
function handleResize() {
    const navLinks = document.querySelector('.nav-links'); // Ensure nav-links exists
    if (!navLinks) return;  // If the nav-links element is not found, return early

    const originalContent = navLinks.innerHTML;  // Store the original content

    function updateNav() {
        if (window.innerWidth <= 634) {
            navLinks.innerHTML = '<a href="mobile/menu.html"><i class="fa-solid fa-bars"></i></a>';  // Replace with theicon
        } else {
            navLinks.innerHTML = originalContent;  // Restore original content when screen is larger
        }
    }

    // Check on page load
    updateNav();

    // Check on window resize
    window.addEventListener('resize', updateNav);
}

// Add the navbar, footer, and handle resize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addNavbar();
    addFooter();

    // Ensure the resize function is only run after the DOM is updated with the navbar
    handleResize();
});
