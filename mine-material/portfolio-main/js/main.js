/* ==========================================
   MAIN ENTRY POINT - PORTFOLIO JAVASCRIPT
   ========================================== */

// Import all modules
import { initSmoothScroll, initActiveNavTracking, initAutoHideHeader, initBackToTop } from './navigation.js';
import { initTheme } from './theme.js';
import {
   initLoadingScreen,
   initScrollReveal,
   initTypewriter,
   initParallax,
   initCursorTrail,
   init3DTilt
} from './animations.js';
import { initCertificateFilters } from './filters.js';
import { initKeyboardShortcuts, initEasterEgg, logPerformance } from './utils.js';
import { initMobileMenu } from './mobile.js';
import { initCompetitions } from './competitions.js';
import { initCertificates } from './certificates.js';
import { initParticles } from './particles.js';

/* ==========================================
   INITIALIZATION
   ========================================== */

// Initialize all features when DOM is ready and content is loaded
document.addEventListener('DOMContentLoaded', () => {
   // Core functionality that doesn't depend on injected HTML (or minimal dependencies)
   initTheme();

   console.log('DOM ready, initializing features...');

   initSmoothScroll();
   initActiveNavTracking();
   initAutoHideHeader();
   initBackToTop();
   initMobileMenu();

   // Animations
   initLoadingScreen();
   initScrollReveal();
   initTypewriter();
   initParallax();
   initCursorTrail();
   init3DTilt();

   // Interactive features
   initCompetitions();
   initCertificates();
   initCertificateFilters();
   initKeyboardShortcuts();
   initParticles();

   // Utilities
   initEasterEgg();
   logPerformance();

   // Global Image Loading Handler (for static images)
   document.querySelectorAll('.certificate-image img').forEach(img => {
      if (img.complete) {
         img.parentElement.classList.add('loaded');
      } else {
         img.addEventListener('load', () => img.parentElement.classList.add('loaded'));
      }
   });
});

/* ==========================================
   KEYBOARD SHORTCUTS HELP
   ========================================== */
console.log(`
%cKeyboard Shortcuts:
%cT - Scroll to top
H - Go to Home
A - Go to About
P - Go to Projects page
C - Go to Contact
D - Toggle dark/light theme
`, 'color: #e0e0e0; font-weight: bold; font-size: 14px;', 'color: #a0a0a0; font-size: 12px;');
