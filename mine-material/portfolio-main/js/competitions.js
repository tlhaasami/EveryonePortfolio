/* ==========================================
   COMPETITIONS LOADER
   ========================================== */

export async function initCompetitions() {
    const competitionsGrid = document.querySelector('.competitions-grid');
    if (!competitionsGrid) return; // Exit if container doesn't exist

    try {
        const response = await fetch('json/competitions-data.json');
        if (!response.ok) throw new Error('Failed to load competition data');

        const competitions = await response.json();
        renderCompetitions(competitions, competitionsGrid);
    } catch (error) {
        console.error('Error loading competitions:', error);
        competitionsGrid.innerHTML = '<p class="error-message">Failed to load competitions. Please refresh the page.</p>';
    }
}

function renderCompetitions(competitions, container) {
    container.innerHTML = competitions.map(comp => `
        <div class="certificate-card competition-card">
            <div class="certificate-image">
                <img src="${comp.image}" alt="${comp.title}" loading="lazy" onload="this.parentElement.classList.add('loaded')">
            </div>
            <h3 class="card-title">${comp.title}</h3>
            <p class="card-description">${comp.description}</p>
            <div class="card-action-links">
                <span class="card-tech-tag" style="background: var(--gold-primary); color: #000; font-weight: bold;">
                    <i class="fas fa-${comp.badgeIcon}"></i> ${comp.badge}
                </span>
            </div>
        </div>
    `).join('');

    // Trigger animations for new elements if utilizing scroll reveal
    // (Optional: if the animation system observes mutations or needs re-init)
}
