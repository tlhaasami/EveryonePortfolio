"use client";

import { useEffect, useRef } from "react";

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class with depth-of-field properties
    class Particle {
      x: number;
      y: number;
      z: number;
      baseSize: number;
      hue: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 900;
        this.y = (Math.random() - 0.5) * 900;
        this.z = Math.random() * 900;
        this.baseSize = Math.random() * 1.8 + 0.4;
        // Brand hues: violet (262) or teal (175)
        this.hue = Math.random() > 0.5 ? 262 : 175;
      }

      update(scrollOffset: number, mouseX: number, mouseY: number) {
        this.z -= 0.4 + scrollOffset * 0.03;
        if (this.z <= 0) {
          this.z = 900;
          this.x = (Math.random() - 0.5) * 900;
          this.y = (Math.random() - 0.5) * 900;
        }
        this.x += mouseX * 0.015;
        this.y += mouseY * 0.015;
      }
    }

    const particles: Particle[] = Array.from({ length: 150 }, () => new Particle());

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let glowPhase = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 120;
      mouseY = (e.clientY - window.innerHeight / 2) / 120;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const fov = 400;

    const render = () => {
      // Soft trail clear
      ctx.fillStyle = "rgba(250, 250, 250, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Subtle grid overlay
      ctx.fillStyle = "rgba(10, 10, 10, 0.012)";
      for (let x = 0; x < width; x += 48) {
        ctx.fillRect(x, 0, 1, height);
      }
      for (let y = 0; y < height; y += 48) {
        ctx.fillRect(0, y, width, 1);
      }

      // Central pulsing glow ring
      glowPhase += 0.008;
      const glowRadius = 120 + Math.sin(glowPhase) * 20;
      const glowOpacity = 0.04 + Math.sin(glowPhase) * 0.02;
      const glowGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, glowRadius);
      glowGrad.addColorStop(0, `hsla(262, 83%, 58%, ${glowOpacity * 1.5})`);
      glowGrad.addColorStop(0.5, `hsla(175, 72%, 42%, ${glowOpacity * 0.8})`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(width / 2 - glowRadius, height / 2 - glowRadius, glowRadius * 2, glowRadius * 2);

      // Draw particles with depth-of-field
      particles.forEach((p) => {
        p.update(scrollY, mouseX, mouseY);

        const scale = fov / (fov + p.z);
        const projX = p.x * scale + width / 2;
        const projY = p.y * scale + height / 2;

        if (projX >= -20 && projX <= width + 20 && projY >= -20 && projY <= height + 20) {
          // Depth-of-field: far particles are more transparent and slightly larger (blurred)
          const depthRatio = 1 - p.z / 900;
          const alpha = 0.08 + depthRatio * 0.25;
          const blurSize = p.baseSize * scale * (1.5 + (1 - depthRatio) * 1.2);

          ctx.beginPath();
          ctx.arc(projX, projY, blurSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${alpha})`;
          ctx.fill();

          // Connect nearby particles with thin lines
          particles.forEach((other) => {
            const distZ = Math.abs(p.z - other.z);
            if (distZ < 50) {
              const dx = p.x - other.x;
              const dy = p.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 90) {
                const otherScale = fov / (fov + other.z);
                const otherProjX = other.x * otherScale + width / 2;
                const otherProjY = other.y * otherScale + height / 2;
                const lineAlpha = 0.04 * (1 - dist / 90) * depthRatio;

                ctx.beginPath();
                ctx.moveTo(projX, projY);
                ctx.lineTo(otherProjX, otherProjY);
                ctx.strokeStyle = `hsla(262, 60%, 60%, ${lineAlpha})`;
                ctx.lineWidth = 0.4;
                ctx.stroke();
              }
            }
          });
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent" />;
}
