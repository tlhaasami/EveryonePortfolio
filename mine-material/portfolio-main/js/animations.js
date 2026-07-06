/* ==========================================
   ANIMATIONS MODULE
   ========================================== */

// Loading Screen
export function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    // Click to hide immediately
    loadingScreen.addEventListener('click', () => {
        loadingScreen.classList.add('hidden');
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    });
}

// Scroll Reveal Animations
let scrollObserver;

export function initScrollReveal() {
    if (!scrollObserver) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add visible class styles
        const style = document.createElement('style');
        style.textContent = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    refreshScrollReveal();
}

export function refreshScrollReveal() {
    if (!scrollObserver) return;

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(`
        .achievement-card,
        .project-card,
        .certificate-card,
        .tech-item,
        .about-content,
        .values-grid
    `);

    elementsToAnimate.forEach((el, index) => {
        if (!el.classList.contains('visible')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            // Add stagger effect for cards in grids
            const staggerDelay = (index % 3) * 0.1; // Stagger by 0.1s for every 3 items
            el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${staggerDelay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${staggerDelay}s`;
            el.style.willChange = 'opacity, transform';
            scrollObserver.observe(el);
        }
    });
}

// Typewriter Effect - Fixed for complete display
export function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';

    // Use responsive styles instead of inline forcing
    typewriterElement.style.display = 'inline-block';

    // Check screen width to determine wrapping behavior
    if (window.innerWidth < 768) {
        typewriterElement.style.whiteSpace = 'normal'; // Allow wrap on mobile
    } else {
        typewriterElement.style.whiteSpace = 'nowrap';
    }

    typewriterElement.style.overflow = 'visible';

    let charIndex = 0;
    const typingSpeed = 60;

    function type() {
        if (charIndex < text.length) {
            typewriterElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Remove cursor after typing completes
            typewriterElement.style.borderRight = 'none';
        }
    }

    setTimeout(type, 500);
}

// Parallax Background Effect
export function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Cursor Trail Effect (Desktop only)
export function initCursorTrail() {
    if (window.innerWidth < 768) return; // Skip on mobile

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;

        trailX += dx * 0.1;
        trailY += dy * 0.1;

        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// 3D Tilt Effect on Project Cards (Desktop Only)
export function init3DTilt() {
    // Disable on mobile for better performance
    if (window.innerWidth < 768) return;

    const cards = document.querySelectorAll('.project-card, .achievement-card, .certificate-card');

    cards.forEach(card => {
        // Prevent multiple listeners if called again
        if (card.getAttribute('data-tilt-init')) return;
        card.setAttribute('data-tilt-init', 'true');

        // Add will-change for performance
        card.style.willChange = 'transform';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15; // Reduced intensity for smoother feel
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}
