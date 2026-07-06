/**
 * Constellation Particle System
 * A high-performance, interactive background effect.
 */

export const initParticles = () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    const settings = {
        particleCount: window.innerWidth < 768 ? 40 : 100,
        connectionDistance: 150,
        particleSpeed: 0.5,
        particleColor: 'rgba(191, 149, 63, 0.4)', // Gold primary
        lineColor: 'rgba(191, 149, 63, 0.1)',
        mouseRadius: 150
    };

    const mouse = {
        x: null,
        y: null
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * settings.particleSpeed;
            this.vy = (Math.random() - 0.5) * settings.particleSpeed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < settings.mouseRadius) {
                    const force = (settings.mouseRadius - distance) / settings.mouseRadius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }
        }

        draw() {
            ctx.fillStyle = settings.particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        settings.particleCount = window.innerWidth < 768 ? 40 : 100;
        createParticles();
    };

    const createParticles = () => {
        particles = [];
        for (let i = 0; i < settings.particleCount; i++) {
            particles.push(new Particle());
        }
    };

    const drawLines = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < settings.connectionDistance) {
                    const opacity = 1 - (distance / settings.connectionDistance);
                    ctx.strokeStyle = `rgba(191, 149, 63, ${opacity * 0.15})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawLines();
        animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    animate();
};
