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


// Function to fetch and insert the footer HTML from a txt file
function addFooter() {
    fetch('assets/footer.txt') // Adjusted path to assets/footer.txt
        .then(response => response.text())
        .then(footerHTML => {
            const footerElement = document.createElement('div');
            footerElement.innerHTML = footerHTML;
            document.body.appendChild(footerElement);
        })
        .catch(error => console.error('Error fetching footer:', error));
}

// Add the navbar and footer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addNavbar();
    addFooter();
});

const navLinks = document.querySelector('.nav-links');
const originalContent = navLinks.innerHTML;  // Store the original content

function handleResize() {
    if (window.innerWidth <= 634) {
        navLinks.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
        navLinks.innerHTML = originalContent;  // Restore original content when screen is larger
    }
}

// Check on page load
handleResize();

// Check on window resize
window.addEventListener('resize', handleResize);
