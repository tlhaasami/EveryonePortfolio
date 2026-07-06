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

    // Particle class representing coordinates in 3D space
    class Particle {
      x: number;
      y: number;
      z: number;
      color: string;
      size: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 800;
        this.y = (Math.random() - 0.5) * 800;
        this.z = Math.random() * 800;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 
          ? "rgba(139, 92, 246, 0.4)" // Violet
          : "rgba(6, 182, 212, 0.4)"; // Cyan
      }

      update(scrollOffset: number, mouseX: number, mouseY: number) {
        // Move particle closer on Z axis (flowing space)
        this.z -= 0.5 + (scrollOffset * 0.05);
        if (this.z <= 0) {
          this.z = 800; // Reset back
          this.x = (Math.random() - 0.5) * 800;
          this.y = (Math.random() - 0.5) * 800;
        }

        // Apply mouse sway
        this.x += (mouseX * 0.02);
        this.y += (mouseY * 0.02);
      }
    }

    const particles: Particle[] = Array.from({ length: 120 }, () => new Particle());
    
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
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

    const fov = 350; // Field of View projection factor

    const render = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.2)"; // Soft trails
      ctx.fillRect(0, 0, width, height);

      // Draw grid overlay details
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
      for (let x = 0; x < width; x += 40) {
        ctx.fillRect(x, 0, 1, height);
      }
      for (let y = 0; y < height; y += 40) {
        ctx.fillRect(0, y, width, 1);
      }

      particles.forEach((p) => {
        p.update(scrollY, mouseX, mouseY);

        // Simple 3D perspective projection formula
        const scale = fov / (fov + p.z);
        const projX = (p.x * scale) + width / 2;
        const projY = (p.y * scale) + height / 2;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, p.size * scale * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Connect nearby particles with thin lines for a neural net look
          particles.forEach((other) => {
            const distZ = Math.abs(p.z - other.z);
            if (distZ < 40) {
              const dx = p.x - other.x;
              const dy = p.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 80) {
                const otherScale = fov / (fov + other.z);
                const otherProjX = (other.x * otherScale) + width / 2;
                const otherProjY = (other.y * otherScale) + height / 2;

                ctx.beginPath();
                ctx.moveTo(projX, projY);
                ctx.lineTo(otherProjX, otherProjY);
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 * (1 - dist / 80)})`;
                ctx.lineWidth = 0.5;
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
