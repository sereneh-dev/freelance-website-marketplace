// Wait until the website layers are fully loaded into the browser memory
document.addEventListener("DOMContentLoaded", function() {
    
    // Grab the hamburger button and the links container using their element IDs
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");

    // Add a simple click event trigger check to toggle the mobile drop-down drawer
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", function() {
            // Toggles the class ".active" inside our CSS rules parameters
            navLinks.classList.toggle("active");
        });
    }
});