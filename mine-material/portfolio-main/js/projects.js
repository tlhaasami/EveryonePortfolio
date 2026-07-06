import { refreshScrollReveal, init3DTilt } from './animations.js';

export async function initProjects() {
    const projectsGrid = document.querySelector('#projects-grid');
    if (!projectsGrid) return;

    try {
        const response = await fetch('json/projects-data.json');
        const projects = await response.json();

        renderProjects(projects, projectsGrid);

        // Re-initialize animations for dynamic content with a small delay for staggered effect
        setTimeout(() => {
            refreshScrollReveal();
            init3DTilt();
        }, 300);
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
    }
}

function renderProjects(projects, container) {
    container.innerHTML = ''; // Clear existing content

    // Show ALL projects (removed the slice limit)
    projects.forEach((project, index) => {
        const card = createProjectCard(project);
        // Ensure card is hidden initially for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 100}ms`; // Staggered entry
        container.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card luxury-feature-card';
    card.setAttribute('data-aos', 'fade-up');

    // Format name to PascalCase (UpperCamelCase)
    const formattedName = project.name
        .split(/[_\-\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');

    // Determine icon based on language
    let iconClass = 'fas fa-laptop-code';
    if (project.language === 'Dart') iconClass = 'fas fa-mobile-alt';
    if (project.language === 'Python') iconClass = 'fab fa-python';
    if (project.language === 'C++') iconClass = 'fas fa-code';

    const techTags = project.tech.map(t => `<span class="card-tech-tag">${t}</span>`).join('');

    card.innerHTML = `
        <div class="card-icon"><i class="${iconClass}"></i></div>
        <h3 class="card-title">${formattedName}</h3>
        <p class="card-description">${project.description}</p>
        <div class="card-tech-stack">
            ${techTags}
        </div>
        <div class="card-action-links">
            <a href="${project.github}" target="_blank" class="card-link" aria-label="GitHub">
                <i class="fab fa-github"></i> Repository
            </a>
        </div>
    `;

    return card;
}
