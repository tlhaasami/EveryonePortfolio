/* ==========================================
   UTILITIES MODULE
   ========================================== */

// Keyboard Shortcuts
export function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.key.toLowerCase()) {
            case 't':
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'h':
                // Go to home
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'a':
                // Go to about
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'p':
                // Go to projects page
                window.location.href = 'projects.html';
                break;
            case 'c':
                // Go to contact
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
}

// Console Easter Egg
export function initEasterEgg() {
    console.log(`
%c╔════════════════════════════════════════╗
║                                        ║
║     👋 Hey there, fellow developer!    ║
║                                        ║
║     Thanks for checking out my code!   ║
║     - Talha Sami                       ║
║                                        ║
║     GitHub: github.com/tlhasami        ║
║     LeetCode: leetcode.com/tlhasami    ║
║                                        ║
╚════════════════════════════════════════╝
    `, 'color: #e0e0e0; font-family: monospace; font-size: 12px;');
}

// Performance Monitoring
export function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }
}
