// Animations.js - Handles all animations for the Tiveau landing page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize cursor trail effect
    initCursorTrail();
    
    // Initialize logo animations
    initLogoAnimations();
    
    // Initialize divider animations
    initDividerAnimations();
});

// GSAP Animations for text reveal and other elements
function initGSAPAnimations() {
    // Text reveal animations
    const timeline = gsap.timeline();
    
    // Set data-text attribute for glitch effect
    const h1Element = document.querySelector('h1.glitch-text');
    if (h1Element) {
        h1Element.setAttribute('data-text', h1Element.textContent);
    }
    
    // Animate h1 with glitch effect
    timeline.to('h1.glitch-text', {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
            glitchTextEffect(h1Element);
        }
    });
    
    // Animate h2 with fade in
    timeline.to('h2', {
        opacity: 1,
        duration: 0.8,
        delay: 0.3
    });
    
    // Animate QR codes with staggered reveal
    timeline.to('.qr-box', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
    });
    
    // Animate divider
    timeline.to('.divider', {
        width: '100%',
        opacity: 0.7,
        duration: 1,
        ease: "power2.inOut"
    });
}

// Cursor trail effect
function initCursorTrail() {
    const canvas = document.getElementById('cursorTrail');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Trail effect variables
    const trail = [];
    const maxTrailLength = 20;
    const trailColor = '#5f00ff'; // Neon purple
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Update mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add current position to trail
        trail.push({ x: mouseX, y: mouseY });
        
        // Remove oldest position if trail is too long
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
    });
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw trail
        for (let i = 0; i < trail.length; i++) {
            const point = trail[i];
            const alpha = i / trail.length;
            const size = (maxTrailLength - i) / maxTrailLength * 10;
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(95, 0, 255, ${alpha * 0.5})`;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = trailColor;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Logo animations
function initLogoAnimations() {
    const logo = document.getElementById('tiveau-logo');
    
    if (!logo) return;
    
    // Add pulsating animation
    gsap.to(logo, {
        filter: 'drop-shadow(0 0 15px #5f00ff)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Divider animations
function initDividerAnimations() {
    const divider = document.querySelector('.divider');
    
    if (!divider) return;
    
    // Create pulsating effect for divider
    gsap.to(divider, {
        boxShadow: '0 0 15px #d40000, 0 0 25px #d40000',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Glitch text effect
function glitchTextEffect(element) {
    if (!element) return;
    
    // Create glitch timeline
    const glitchTimeline = gsap.timeline({
        repeat: 0,
        onComplete: () => {
            // Add subtle ongoing glitch effect
            setInterval(() => {
                if (Math.random() > 0.95) {
                    const smallGlitch = gsap.timeline();
                    smallGlitch.to(element, {
                        skewX: 10,
                        textShadow: '2px 0 #5f00ff, -2px 0 #d40000',
                        duration: 0.1
                    })
                    .to(element, {
                        skewX: 0,
                        textShadow: 'none',
                        duration: 0.1
                    });
                }
            }, 2000);
        }
    });
    
    // Initial glitch effect
    glitchTimeline.to(element, {
        skewX: 20,
        textShadow: '5px 0 #5f00ff, -5px 0 #d40000',
        duration: 0.1
    })
    .to(element, {
        skewX: -15,
        textShadow: '-5px 0 #5f00ff, 5px 0 #d40000',
        duration: 0.1
    })
    .to(element, {
        skewX: 10,
        textShadow: '3px 0 #5f00ff, -3px 0 #d40000',
        duration: 0.1
    })
    .to(element, {
        skewX: 0,
        textShadow: '1px 0 #5f00ff, -1px 0 #d40000',
        duration: 0.5
    });
}
