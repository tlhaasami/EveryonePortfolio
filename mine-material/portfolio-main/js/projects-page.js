/* ==========================================
   PROJECTS PAGE - ENTRY POINT
   ========================================== */

import { initBackToTop } from './navigation.js';
import { initTheme } from './theme.js';
import { initScrollReveal, init3DTilt } from './animations.js';
import { initMobileMenu } from './mobile.js';
import { initProjects } from './projects.js';
import { initParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initTheme();
    initBackToTop();
    initMobileMenu();

    // Animations
    initScrollReveal();
    init3DTilt();

    // Load projects
    initProjects();
    initParticles();
});
