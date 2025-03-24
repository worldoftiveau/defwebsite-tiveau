// Main.js - Main JavaScript file for Tiveau landing page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initComponents();
});

// Initialize all components
function initComponents() {
    // Add event listeners
    addEventListeners();
    
    // Initialize any additional functionality
    initAdditionalFunctionality();
}

// Add event listeners
function addEventListeners() {
    // QR code hover effects
    const qrBoxes = document.querySelectorAll('.qr-box');
    
    qrBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const scanBeam = box.querySelector('.scan-beam');
            if (scanBeam) {
                scanBeam.style.opacity = '1';
            }
        });
        
        box.addEventListener('mouseleave', () => {
            const scanBeam = box.querySelector('.scan-beam');
            if (scanBeam) {
                scanBeam.style.opacity = '0';
            }
        });
    });
    
    // Logo hover effect
    const logo = document.getElementById('tiveau-logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                filter: 'drop-shadow(0 0 25px #5f00ff)',
                scale: 1.05,
                duration: 0.3
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                filter: 'drop-shadow(0 0 15px #5f00ff)',
                scale: 1,
                duration: 0.3
            });
        });
    }
}

// Initialize additional functionality
function initAdditionalFunctionality() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is in view
                entry.target.classList.add('animate');
                
                // If it's the divider, animate it
                if (entry.target.classList.contains('divider')) {
                    gsap.to(entry.target, {
                        opacity: 0.7,
                        duration: 1,
                        ease: "power2.inOut"
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.divider, .qr-box');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Add preloading for smoother experience
    preloadAssets();
}

// Preload assets for smoother experience
function preloadAssets() {
    // Preload logo image
    const logoImg = new Image();
    logoImg.src = 'assets/images/Tiveau Logo Neon Purple.png';
}

// Handle window resize events
window.addEventListener('resize', () => {
    // Regenerate QR codes on window resize for proper scaling
    if (typeof generateQRCodes === 'function') {
        generateQRCodes();
    }
});
