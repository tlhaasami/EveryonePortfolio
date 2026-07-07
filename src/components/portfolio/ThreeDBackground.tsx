"use client";

import { useEffect, useRef } from "react";

interface ThreeDBackgroundProps {
  gridType?: 'dots' | 'lines' | 'graph-paper' | 'isometric' | 'none';
  gridSize?: number;
  gridOpacity?: number;
  gridColor?: string;
  enableParticles?: boolean;
  particleCount?: number;
  enableGlowRings?: boolean;
  glowRingsColor?: string;
  colorPrimary?: string;
  colorAccent?: string;
}

export default function ThreeDBackground({
  gridType = 'graph-paper',
  gridSize = 48,
  gridOpacity = 0.03,
  gridColor = '#0a0a0a',
  enableParticles = true,
  particleCount = 150,
  enableGlowRings = true,
  glowRingsColor = '#8b5cf6',
  colorPrimary = '#8b5cf6',
  colorAccent = '#14b8a6'
}: ThreeDBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Helpers to convert colors
    const hexToRgbValues = (hex: string) => {
      let r = 139, g = 92, b = 246; // default #8b5cf6
      if (hex.startsWith("#")) {
        const cleanHex = hex.replace("#", "");
        if (cleanHex.length === 3) {
          r = parseInt(cleanHex[0] + cleanHex[0], 16);
          g = parseInt(cleanHex[1] + cleanHex[1], 16);
          b = parseInt(cleanHex[2] + cleanHex[2], 16);
        } else if (cleanHex.length === 6) {
          r = parseInt(cleanHex.substring(0, 2), 16);
          g = parseInt(cleanHex.substring(2, 4), 16);
          b = parseInt(cleanHex.substring(4, 6), 16);
        }
      }
      return { r, g, b };
    };

    const hexToHue = (hex: string) => {
      let { r, g, b } = hexToRgbValues(hex);
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0;
      if (max !== min) {
        const d = max - min;
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return Math.round(h * 360);
    };

    const primaryHue = hexToHue(colorPrimary);
    const accentHue = hexToHue(colorAccent);

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
        // Dynamically assign theme hues
        this.hue = Math.random() > 0.5 ? primaryHue : accentHue;
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

    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

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

      // ─── BACKGROUND GRID OVERLAYS ───
      const rGrid = hexToRgbValues(gridColor);
      const gridRgba = `rgba(${rGrid.r}, ${rGrid.g}, ${rGrid.b}, ${gridOpacity})`;

      if (gridType === "graph-paper") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 1;
        for (let x = 0; x < width + gridSize; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (gridType === "dots") {
        ctx.fillStyle = gridRgba;
        for (let x = 0; x < width + gridSize; x += gridSize) {
          for (let y = 0; y < height + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, 1.3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (gridType === "lines") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 1;
        for (let x = 0; x < width + gridSize; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
      } else if (gridType === "isometric") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 1;
        const gap = gridSize * 1.732;
        for (let x = -height; x < width + height; x += gap) {
          // 30 degree line
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + height * 0.577, height);
          ctx.stroke();
          
          // 150 degree line
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x - height * 0.577, height);
          ctx.stroke();
        }
      }

      // ─── CENTRAL PULSING GLOW RING ───
      if (enableGlowRings) {
        glowPhase += 0.008;
        const glowRadius = 120 + Math.sin(glowPhase) * 20;
        const glowOpacity = 0.04 + Math.sin(glowPhase) * 0.02;
        const glowGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, glowRadius);
        
        const glowRgb = hexToRgbValues(glowRingsColor);
        glowGrad.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glowOpacity * 1.6})`);
        glowGrad.addColorStop(0.5, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glowOpacity * 0.7})`);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(width / 2 - glowRadius, height / 2 - glowRadius, glowRadius * 2, glowRadius * 2);
      }

      // ─── PARTICLES DRAWING ───
      if (enableParticles && particles.length > 0) {
        particles.forEach((p) => {
          p.update(scrollY, mouseX, mouseY);

          const scale = fov / (fov + p.z);
          const projX = p.x * scale + width / 2;
          const projY = p.y * scale + height / 2;

          if (projX >= -20 && projX <= width + 20 && projY >= -20 && projY <= height + 20) {
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
                  ctx.strokeStyle = `hsla(${primaryHue}, 60%, 60%, ${lineAlpha})`;
                  ctx.lineWidth = 0.4;
                  ctx.stroke();
                }
              }
            });
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    gridType,
    gridSize,
    gridOpacity,
    gridColor,
    enableParticles,
    particleCount,
    enableGlowRings,
    glowRingsColor,
    colorPrimary,
    colorAccent
  ]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent" />;
}
