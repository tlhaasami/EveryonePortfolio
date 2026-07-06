/* ==========================================
   CERTIFICATES LOADER
   ========================================== */

export async function initCertificates() {
    const certificatesGrid = document.querySelector('.certificates-grid:not(.competitions-grid)');
    if (!certificatesGrid) return; // Exit if container doesn't exist

    try {
        const response = await fetch('json/certificates-data.json');
        if (!response.ok) throw new Error('Failed to load certificates data');

        const certificates = await response.json();
        renderCertificates(certificates, certificatesGrid);
    } catch (error) {
        console.error('Error loading certificates:', error);
        certificatesGrid.innerHTML = '<p class="error-message">Failed to load certificates. Please refresh the page.</p>';
    }
}

function renderCertificates(certificates, container) {
    container.innerHTML = certificates.map(cert => `
        <div class="certificate-card">
            <div class="certificate-image">
                <img src="${cert.image}" alt="${cert.title}" loading="lazy" onload="this.parentElement.classList.add('loaded')">
            </div>
            <h3 class="card-title">${cert.title}</h3>
            <p class="card-description">${cert.description}</p>
            <div class="card-action-links">
                <a href="${cert.verifyUrl}" target="_blank" class="card-link">
                    <i class="fas fa-check-circle"></i> Verify Credential
                </a>
            </div>
        </div>
    `).join('');
}
