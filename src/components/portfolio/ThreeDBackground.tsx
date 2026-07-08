"use client";

import { useEffect, useRef } from "react";

interface ThreeDBackgroundProps {
  gridType?: 'dots' | 'lines' | 'graph-paper' | 'isometric' | 'radial-waves' | 'honeycomb' | 'crosshatch' | 'waves' | 'none';
  gridSize?: number;
  gridOpacity?: number;
  gridColor?: string;
  enableParticles?: boolean;
  particleCount?: number;
  particleStyle?: 'stars' | 'bubbles' | 'floating-cubes' | 'vortex' | 'spiral';
  particleSpeed?: 'slow' | 'normal' | 'fast' | 'interactive';
  geometryMeshStyle?: 'none' | 'wireframe-globe' | 'floating-shapes';
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
  particleStyle = 'stars',
  particleSpeed = 'normal',
  geometryMeshStyle = 'none',
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
      angle: number;       // For spiral/vortex movements
      baseRadius: number;  // For vortex radius
      rotation: number;    // For floating cubes
      speedOffset: number; // Random speed variations

      constructor() {
        this.x = (Math.random() - 0.5) * 900;
        this.y = (Math.random() - 0.5) * 900;
        this.z = Math.random() * 900;
        this.baseSize = Math.random() * 1.8 + 0.4;
        this.hue = Math.random() > 0.5 ? primaryHue : accentHue;
        this.angle = Math.random() * Math.PI * 2;
        this.baseRadius = Math.sqrt(this.x * this.x + this.y * this.y);
        this.rotation = Math.random() * Math.PI * 2;
        this.speedOffset = Math.random() * 0.4 + 0.8;
      }

      update(scrollOffset: number, mouseX: number, mouseY: number, currentMouseX: number, currentMouseY: number) {
        let speedMult = 0.4;
        if (particleSpeed === 'slow') speedMult = 0.15;
        else if (particleSpeed === 'fast') speedMult = 1.2;
        else if (particleSpeed === 'interactive') speedMult = 0.4;

        this.z -= (speedMult + scrollOffset * 0.03) * this.speedOffset;
        if (this.z <= 0) {
          this.z = 900;
          this.x = (Math.random() - 0.5) * 900;
          this.y = (Math.random() - 0.5) * 900;
          this.baseRadius = Math.sqrt(this.x * this.x + this.y * this.y);
        }

        if (particleStyle === 'vortex') {
          this.angle += 0.003 * (particleSpeed === 'fast' ? 2.5 : particleSpeed === 'slow' ? 0.4 : 1.0);
          this.x = Math.cos(this.angle) * this.baseRadius;
          this.y = Math.sin(this.angle) * this.baseRadius;
        } else if (particleStyle === 'spiral') {
          this.angle += 0.001 * (900 - this.z) * 0.005;
          this.x = Math.cos(this.angle) * this.baseRadius;
          this.y = Math.sin(this.angle) * this.baseRadius;
        }

        if (particleSpeed === 'interactive') {
          const targetX = currentMouseX - width / 2;
          const targetY = currentMouseY - height / 2;
          this.x += (targetX - this.x) * 0.003;
          this.y += (targetY - this.y) * 0.003;
        } else {
          this.x += mouseX * 0.015;
          this.y += mouseY * 0.015;
        }

        this.rotation += 0.01;
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let scrollY = 0;
    let glowPhase = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 120;
      mouseY = (e.clientY - window.innerHeight / 2) / 120;
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
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
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + height * 0.577, height);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x - height * 0.577, height);
          ctx.stroke();
        }
      } else if (gridType === "radial-waves") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 1;
        const maxRadius = Math.sqrt(width * width + height * height);
        const flow = (glowPhase * 20) % (gridSize * 1.5);
        for (let r = gridSize; r < maxRadius; r += gridSize * 1.5) {
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, r + flow, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (gridType === "honeycomb") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 1;
        const hexRadius = gridSize * 0.6;
        const hexWidth = hexRadius * Math.sqrt(3);
        const hexHeight = hexRadius * 2;
        for (let y = 0; y < height + hexHeight; y += hexHeight * 0.75) {
          const isOdd = Math.floor(y / (hexHeight * 0.75)) % 2 === 1;
          for (let x = isOdd ? -hexWidth/2 : 0; x < width + hexWidth; x += hexWidth) {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i + (Math.PI / 6);
              const px = x + hexRadius * Math.cos(angle);
              const py = y + hexRadius * Math.sin(angle);
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
          }
        }
      } else if (gridType === "crosshatch") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 0.5;
        for (let x = -height; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + height, height);
          ctx.stroke();
        }
        for (let x = 0; x < width + height; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x - height, height);
          ctx.stroke();
        }
      } else if (gridType === "waves") {
        ctx.strokeStyle = gridRgba;
        ctx.lineWidth = 1;
        for (let y = 0; y < height + gridSize; y += gridSize) {
          ctx.beginPath();
          for (let x = 0; x < width; x += 15) {
            const waveY = y + Math.sin(x * 0.008 + glowPhase * 1.5) * (gridSize * 0.25);
            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }
      }

      // ─── GEOMETRY MESH STYLE RENDERING ───
      if (geometryMeshStyle && geometryMeshStyle !== 'none') {
        const strokeColor = `rgba(${primaryHue === 0 ? 120 : primaryHue}, 80%, 60%, 0.12)`;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.8;

        if (geometryMeshStyle === 'wireframe-globe') {
          const globeX = width - 150;
          const globeY = height - 150;
          const radius = 100;
          const rotationAngle = glowPhase * 0.15;

          // Latitudes
          for (let i = 1; i < 6; i++) {
            const lat = (Math.PI / 6) * i;
            const r = radius * Math.sin(lat);
            const cy = globeY + radius * Math.cos(lat);
            ctx.beginPath();
            ctx.ellipse(globeX, cy, r, r * 0.25, rotationAngle, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Longitudes
          for (let i = 0; i < 6; i++) {
            const lon = (Math.PI / 3) * i + rotationAngle;
            ctx.beginPath();
            ctx.ellipse(globeX, globeY, radius * Math.abs(Math.sin(lon)), radius, rotationAngle, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else if (geometryMeshStyle === 'floating-shapes') {
          const shapes = [
            { x: width * 0.15, y: height * 0.35, r: 45, speed: 0.2 },
            { x: width * 0.85, y: height * 0.25, r: 60, speed: -0.15 },
            { x: width * 0.2, y: height * 0.75, r: 35, speed: 0.3 }
          ];

          shapes.forEach((s, idx) => {
            const rot = glowPhase * s.speed;
            const cy = s.y + Math.sin(glowPhase * 0.5 + idx) * 15;
            
            ctx.save();
            ctx.translate(s.x, cy);
            ctx.rotate(rot);

            const vertices = [
              { x: 0, y: -s.r },
              { x: s.r, y: 0 },
              { x: 0, y: s.r * 0.3 },
              { x: -s.r, y: 0 },
              { x: 0, y: s.r }
            ];

            ctx.beginPath();
            // Top pyramid
            ctx.moveTo(vertices[0].x, vertices[0].y);
            ctx.lineTo(vertices[1].x, vertices[1].y);
            ctx.lineTo(vertices[2].x, vertices[2].y);
            ctx.lineTo(vertices[3].x, vertices[3].y);
            ctx.closePath();

            // Bottom pyramid
            ctx.moveTo(vertices[4].x, vertices[4].y);
            ctx.lineTo(vertices[1].x, vertices[1].y);
            ctx.lineTo(vertices[2].x, vertices[2].y);
            ctx.lineTo(vertices[3].x, vertices[3].y);
            ctx.closePath();

            // Vertices lines
            for (let i = 1; i <= 3; i++) {
              ctx.moveTo(vertices[0].x, vertices[0].y);
              ctx.lineTo(vertices[i].x, vertices[i].y);
              ctx.moveTo(vertices[4].x, vertices[4].y);
              ctx.lineTo(vertices[i].x, vertices[i].y);
            }
            ctx.stroke();
            ctx.restore();
          });
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
          p.update(scrollY, mouseX, mouseY, currentMouseX, currentMouseY);

          const scale = fov / (fov + p.z);
          const projX = p.x * scale + width / 2;
          const projY = p.y * scale + height / 2;

          if (projX >= -20 && projX <= width + 20 && projY >= -20 && projY <= height + 20) {
            const depthRatio = 1 - p.z / 900;
            const alpha = 0.08 + depthRatio * 0.25;
            const blurSize = p.baseSize * scale * (1.5 + (1 - depthRatio) * 1.2);

            ctx.beginPath();
            if (particleStyle === 'bubbles') {
              ctx.arc(projX, projY, blurSize, 0, Math.PI * 2);
              ctx.strokeStyle = `hsla(${p.hue}, 70%, 65%, ${alpha * 1.5})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            } else if (particleStyle === 'floating-cubes') {
              ctx.save();
              ctx.translate(projX, projY);
              ctx.rotate(p.rotation);
              ctx.strokeStyle = `hsla(${p.hue}, 70%, 55%, ${alpha * 1.3})`;
              ctx.lineWidth = 0.8;
              ctx.strokeRect(-blurSize, -blurSize, blurSize * 2, blurSize * 2);
              ctx.beginPath();
              ctx.moveTo(-blurSize, -blurSize);
              ctx.lineTo(blurSize, blurSize);
              ctx.moveTo(blurSize, -blurSize);
              ctx.lineTo(-blurSize, blurSize);
              ctx.stroke();
              ctx.restore();
            } else {
              ctx.arc(projX, projY, blurSize, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${alpha})`;
              ctx.fill();
            }

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
    particleStyle,
    particleSpeed,
    geometryMeshStyle,
    enableGlowRings,
    glowRingsColor,
    colorPrimary,
    colorAccent
  ]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent" />;
}
