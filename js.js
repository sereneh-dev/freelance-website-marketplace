// Wait until the website layers are fully loaded into the browser memory
document.addEventListener("DOMContentLoaded", function() {
    
    // Grab the hamburger button and the links container using their element IDs
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");

});
/*tasks 4 and 5 functionality*/
document.addEventListener('DOMContentLoaded', function () {

    // Task 5: Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-slide-left, .anim-slide-right, .anim-scale-in').forEach(function (el) {
        scrollObserver.observe(el);
    });

    //Auto-apply animation classes to common elements 
    function autoApplyAnimations() {
        // Apply fade-up to section titles
        document.querySelectorAll('.section-title-box').forEach(function (el) {
            if (!el.classList.contains('anim-fade-up')) {
                el.classList.add('anim-fade-up');
                scrollObserver.observe(el);
            }
        });

        // Apply fade-up to mission cards
        document.querySelectorAll('.mission-card').forEach(function (el, i) {
            if (!el.classList.contains('anim-fade-up')) {
                el.classList.add('anim-fade-up', 'stagger-' + Math.min(i + 1, 6));
                scrollObserver.observe(el);
            }
        });

        // Apply fade-up to review cards
        document.querySelectorAll('.review-card').forEach(function (el, i) {
            if (!el.classList.contains('anim-fade-up')) {
                el.classList.add('anim-fade-up', 'stagger-' + Math.min(i + 1, 6));
                scrollObserver.observe(el);
            }
        });

        // Apply scale-in to sidebar cards
        document.querySelectorAll('.sidebar-card, .profile-sidebar').forEach(function (el) {
            if (!el.classList.contains('anim-scale-in')) {
                el.classList.add('anim-scale-in');
                scrollObserver.observe(el);
            }
        });

        // Apply slide-left to contact info
        document.querySelectorAll('.contact-info, .contact-info-box').forEach(function (el) {
            if (!el.classList.contains('anim-slide-left')) {
                el.classList.add('anim-slide-left');
                scrollObserver.observe(el);
            }
        });

        // Apply slide-right to contact form
        document.querySelectorAll('.contact-form-box').forEach(function (el) {
            if (!el.classList.contains('anim-slide-right')) {
                el.classList.add('anim-slide-right');
                scrollObserver.observe(el);
            }
        });

        // Apply fade-up to footer columns
        document.querySelectorAll('.footer-col').forEach(function (el, i) {
            if (!el.classList.contains('anim-fade-up')) {
                el.classList.add('anim-fade-up', 'stagger-' + Math.min(i + 1, 6));
                scrollObserver.observe(el);
            }
        });
    }

    autoApplyAnimations();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateNavbar() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    // Page Load Animation Trigger 
    document.body.classList.add('page-load');

    // Add hero entrance animation class to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('hero-entrance');
    }

    // Stagger marketplace cards on load 
    const marketplaceCards = document.querySelectorAll('.services-marketplace-grid .service-card');
    marketplaceCards.forEach(function (card, i) {
        card.style.animationDelay = (0.1 + i * 0.08) + 's';
        card.classList.add('anim-fade-up');
        scrollObserver.observe(card);
    });

    // Stagger profile services cards 
    const profileCards = document.querySelectorAll('.profile-services-grid .service-card');
    profileCards.forEach(function (card, i) {
        card.classList.add('anim-fade-up', 'stagger-' + Math.min(i + 1, 6));
        scrollObserver.observe(card);
    });

    // Contact Form Handling 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Reset previous errors
            ['name', 'email', 'subject', 'message'].forEach(function (field) {
                const input = document.getElementById('contact-' + field);
                const error = document.getElementById('error-' + field);
                if (input) input.classList.remove('error');
                if (error) error.classList.remove('show');
            });

            const successBox = document.getElementById('form-success');
            if (successBox) successBox.classList.remove('show');

            let isValid = true;

            // Validate Subject
            const subjectField = document.getElementById('contact-subject');
            if (!subjectField || subjectField.value === '') {
                isValid = false;
                if (subjectField) subjectField.classList.add('error');
                const errSubject = document.getElementById('error-subject');
                if (errSubject) errSubject.classList.add('show');
            }

            // Validate Message
            const messageField = document.getElementById('contact-message');
            if (!messageField || messageField.value.trim() === '') {
                isValid = false;
                if (messageField) messageField.classList.add('error');
                const errMessage = document.getElementById('error-message');
                if (errMessage) errMessage.classList.add('show');
            }

            if (isValid) {
                // Show success message
                if (successBox) {
                    successBox.classList.add('show');
                    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                // Reset form
                contactForm.reset();
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.form-error.show');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const loginError = document.getElementById('loginError');
        const loginSuccess = document.getElementById('loginSuccess');

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Reset messages
            if (loginError) {
                loginError.classList.remove('show');
                loginError.textContent = '';
            }
            if (loginSuccess) {
                loginSuccess.classList.remove('show');
                loginSuccess.textContent = '';
            }

            const emailField = document.getElementById('loginEmail');
            const passwordField = document.getElementById('loginPassword');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let isValid = true;

            // Remove previous error states
            if (emailField) emailField.classList.remove('error');
            if (passwordField) passwordField.classList.remove('error');

            // Validate Email
            if (!emailField || !emailRegex.test(emailField.value.trim())) {
                isValid = false;
                if (emailField) emailField.classList.add('error');
            }

            // Validate Password
            if (!passwordField || passwordField.value.length < 6) {
                isValid = false;
                if (passwordField) passwordField.classList.add('error');
            }

            if (!isValid) {
                if (loginError) {
                    loginError.textContent = 'Please enter a valid email and password (min 6 characters).';
                    loginError.classList.add('show');
                }
                return;
            }

            // Show success
            if (loginSuccess) {
                loginSuccess.innerHTML = '<strong>Success!</strong> Welcome back to Acinonex.';
                loginSuccess.classList.add('show');
            }
            loginForm.reset();
        });
    }

    // Mobile Navigation 
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                }
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Filter Button Interaction
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    //  Search Input Focus Effect
    const searchInput = document.querySelector('.search-input');
    const searchWrapper = document.querySelector('.search-box-wrapper');
    if (searchInput && searchWrapper) {
        searchInput.addEventListener('focus', function () {
            searchWrapper.style.borderColor = 'var(--teal-accent)';
        });
        searchInput.addEventListener('blur', function () {
            searchWrapper.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    }

    // Card Image Hover 
    document.querySelectorAll('.card-image-placeholder').forEach(function (img) {
        img.parentElement.addEventListener('mousemove', function (e) {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            img.style.transform = 'translate(' + (x * 0.03) + 'px, ' + (y * 0.03) + 'px)';
        });
        img.parentElement.addEventListener('mouseleave', function () {
            img.style.transform = 'translate(0, 0)';
        });
    });

    //  Form Input Focus Effects 
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(function (input) {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });

    //  Back to Top Button 
    var backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '&#8593;';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 700) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

});
   /*SECURITY MATRIX & VALIDATION*/

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            // 1. Always clear old error messages instantly at the start of a check
            document.getElementById("usernameError").textContent = "";
            document.getElementById("emailError").textContent = "";
            document.getElementById("passwordError").textContent = "";
            document.getElementById("confirmPasswordError").textContent = "";
            document.getElementById("termsError").textContent = "";

            // 2. Extract live inputs from your form fields
            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const termsChecked = document.getElementById("terms").checked;

            let systemIsValid = true; // State tracker variable

            // 3. Complete Name Validation Row
            if (username === "") {
                document.getElementById("usernameError").textContent = "⚠️ Account holder registration name is required.";
                systemIsValid = false;
            }

            // 4. Complete Email Structure Regex Validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("emailError").textContent = "⚠️ Specify a valid communication email sequence.";
                systemIsValid = false;
            }

            // 5. Password Minimum Rules Verification
            if (password.length < 8) {
                document.getElementById("passwordError").textContent = "⚠️ Security matrix requires at least 8 characters.";
                systemIsValid = false;
            }

            // CRITICAL FIX: Direct password matching sequence evaluation
            if (password !== confirmPassword) {
                document.getElementById("confirmPasswordError").textContent = "⚠️ Security breach: Passwords do not match.";
                systemIsValid = false; // Forces system check failure state
            }

            // 6. Platform Legal Compliance Terms Checkbox Validation
            if (!termsChecked) {
                document.getElementById("termsError").textContent = "⚠️ Authentication rules must be accepted to proceed.";
                systemIsValid = false;
            }

               /*TASK 5: SUBMISSION TRANSITION MANAGEMENT*/ 

            // If any validation step failed above, completely stop the form right here!
            if (!systemIsValid) {
                event.preventDefault(); // Absolute block preventing broken processing reload
                return; // Cease program run
            }

            // If it passes all criteria flawlessly, trigger elite success notification sequence
            event.preventDefault(); // Prevents instant empty clearing page flash
            alert("✨ Success: Operator profile credentials verified and securely initialized into Acinonex!");
            signupForm.reset(); // Safely clear out variables
        });
    }
});

   /* search and filter btn*/
document.addEventListener("DOMContentLoaded", function () {
    // 1. Target your exact HTML classes
    const searchInput = document.querySelector(".search-input") || document.querySelector(".search-box");
    const searchBtn = document.querySelector(".search-btn");
    const filterButtons = document.querySelectorAll(".filter-btn"); // Matches your exact button class
    const serviceCards = document.querySelectorAll(".service-card");

    // Guard clause: Only run if elements exist on the page
    if (serviceCards.length > 0) {
        
        // Unified Master Filter Controller
        function executeMasterFilter(selectedFilterText = "all categories") {
            const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";
            const cleanFilter = selectedFilterText.toLowerCase().trim();

            serviceCards.forEach(function (card) {
                const cardText = card.textContent.toLowerCase();
                
                // Condition A: Does the card contain the search bar phrase?
                const matchesSearch = cardText.includes(searchQuery);
                
                // Condition B: Does the card match the clicked filter button text?
                let matchesFilter = false;
                
                // If "All Categories" is active, show everything
                if (cleanFilter === "all categories" || cleanFilter === "all") {
                    matchesFilter = true;
                } else {
                    // Smart Matching: Checks if the button text or key terms (like "web", "design", "seo") exist in the card
                    if (cardText.includes(cleanFilter)) {
                        matchesFilter = true;
                    } else if (cleanFilter.includes("web") && cardText.includes("web")) {
                        matchesFilter = true; // Catches variations like "Web Dev" vs "Web Development"
                    } else if (cleanFilter.includes("graphic") && cardText.includes("design")) {
                        matchesFilter = true; 
                    } else if (cleanFilter.includes("seo") && cardText.includes("seo")) {
                        matchesFilter = true;
                    }
                }

                // If both parameters pass display the card
                if (matchesSearch && matchesFilter) {
                    card.style.display = ""; 
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none";
                    card.style.opacity = "0";
                }
            });
        }

        //  FILTER BUTTON CLICK EVENT LISTENERS 
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                // Remove your active styling class from the current button
                filterButtons.forEach(btn => btn.classList.remove("active"));
                
                // Apply your active styling class to the newly clicked button
                this.classList.add("active");

                // Grab the text right out from inside the button tags
                const buttonText = this.textContent;
                
                // Run the master filter algorithm
                executeMasterFilter(buttonText);
            });
        });

        //  SECTION B: LIVE SEARCH INPUT BOX SYNC 
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                // Find whichever button currently has your active class highlight
                const activeBtn = document.querySelector(".filter-btn.active");
                const currentFilter = activeBtn ? activeBtn.textContent : "all categories";
                
                executeMasterFilter(currentFilter);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const activeBtn = document.querySelector(".filter-btn.active");
                const currentFilter = activeBtn ? activeBtn.textContent : "all categories";
                executeMasterFilter(currentFilter);
            });
        }
    }
});