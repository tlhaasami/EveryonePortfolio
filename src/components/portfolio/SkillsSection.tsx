"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Skill } from "@/lib/mockData";
import { Code2, Monitor, Cpu, Database, Cloud, Wrench } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORY_MAP: Record<string, { label: string; icon: typeof Code2; color: string }> = {
  languages: { label: "Languages", icon: Code2, color: "#8b5cf6" },
  frontend: { label: "Frontend", icon: Monitor, color: "#06b6d4" },
  backend: { label: "Backend", icon: Cpu, color: "#d946ef" },
  databases: { label: "Databases", icon: Database, color: "#10b981" },
  "cloud-devops": { label: "DevOps", icon: Cloud, color: "#f59e0b" },
  tools: { label: "Tools", icon: Wrench, color: "#0ea5e9" },
};

interface Ball {
  name: string;
  logoUrl?: string;
  category: string;
  level: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  image?: HTMLImageElement;
  isDragging: boolean;
}

export function SkillsCanvasPlayground({ skills, activeCategory }: { skills: Skill[]; activeCategory: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, px: 0, py: 0, isDown: false });
  const draggedBallRef = useRef<Ball | null>(null);

  const getColor = (cat: string) => {
    return CATEGORY_MAP[cat]?.color || "#14b8a6";
  };

  // Initialize balls on skills change
  useEffect(() => {
    const radius = 45;

    const newBalls = skills.map((skill) => {
      const existing = ballsRef.current.find(b => b.name === skill.name);
      
      // Load image immediately if logoUrl is provided
      let img: HTMLImageElement | undefined = existing?.image;
      if (skill.logoUrl && !img) {
        img = new Image();
        img.src = skill.logoUrl;
        img.onload = () => {
          const found = ballsRef.current.find(b => b.name === skill.name);
          if (found) found.image = img;
        };
      }

      if (existing) {
        existing.logoUrl = skill.logoUrl;
        existing.level = skill.level;
        existing.category = skill.category;
        existing.color = getColor(skill.category);
        if (img) existing.image = img;
        return existing;
      }

      // Random starting coordinates around center
      const startX = 150 + Math.random() * 300;
      const startY = 100 + Math.random() * 150;
      
      return {
        name: skill.name,
        logoUrl: skill.logoUrl,
        category: skill.category,
        level: skill.level,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius,
        color: getColor(skill.category),
        alpha: 1,
        targetAlpha: 1,
        isDragging: false,
        image: img
      };
    });

    ballsRef.current = newBalls;
  }, [skills]);

  // Handle activeCategory updates
  useEffect(() => {
    ballsRef.current.forEach(ball => {
      if (activeCategory === "all" || ball.category === activeCategory) {
        ball.targetAlpha = 1.0;
      } else {
        ball.targetAlpha = 0.18;
      }
    });
  }, [activeCategory]);

  // Physics animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const update = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Mouse velocity
      const mouse = mouseRef.current;
      mouse.vx = mouse.x - mouse.px;
      mouse.vy = mouse.y - mouse.py;
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      const currentBalls = ballsRef.current;

      // Update positions
      currentBalls.forEach(ball => {
        // Fade transition
        ball.alpha += (ball.targetAlpha - ball.alpha) * 0.1;

        if (ball.isDragging) {
          ball.x = mouse.x;
          ball.y = mouse.y;
          ball.vx = mouse.vx;
          ball.vy = mouse.vy;
          return;
        }

        // Apply friction
        ball.vx *= 0.96;
        ball.vy *= 0.96;

        // Apply forces based on category focus
        if (ball.targetAlpha > 0.5) {
          // Centripetal force to cluster in center
          const cx = width / 2;
          const cy = height / 2 - 10;
          ball.vx += (cx - ball.x) * 0.0006;
          ball.vy += (cy - ball.y) * 0.0006;
        } else {
          // Inactive balls drift to the bottom floor
          ball.vy += 0.08;
          ball.vx += (width / 2 - ball.x) * 0.0001; // slight center pull so they don't block corners
        }

        // Mouse avoidance force (repel)
        const dx = ball.x - mouse.x;
        const dy = ball.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const repelRadius = 140;
        if (dist < repelRadius && dist > 1) {
          const force = (repelRadius - dist) * 0.08;
          const angle = Math.atan2(dy, dx);
          ball.vx += Math.cos(angle) * force * (ball.targetAlpha > 0.5 ? 1 : 0.25);
          ball.vy += Math.sin(angle) * force * (ball.targetAlpha > 0.5 ? 1 : 0.25);
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
        const r = ball.radius;
        if (ball.x - r < 0) {
          ball.x = r;
          ball.vx *= -0.55;
        } else if (ball.x + r > width) {
          ball.x = width - r;
          ball.vx *= -0.55;
        }
        if (ball.y - r < 0) {
          ball.y = r;
          ball.vy *= -0.55;
        } else if (ball.y + r > height) {
          ball.y = height - r;
          ball.vy *= -0.55;
        }
      });

      // Ball-to-ball collisions
      for (let i = 0; i < currentBalls.length; i++) {
        for (let j = i + 1; j < currentBalls.length; j++) {
          const b1 = currentBalls[i];
          const b2 = currentBalls[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b1.radius + b2.radius + 8;

          if (dist < minDist && dist > 1) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push apart
            if (!b1.isDragging) {
              b1.x -= nx * overlap * 0.5;
              b1.y -= ny * overlap * 0.5;
            }
            if (!b2.isDragging) {
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;
            }

            // Bounce physics
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;
            
            if (!b1.isDragging) {
              b1.vx -= p * nx * 0.75;
              b1.vy -= p * ny * 0.75;
            }
            if (!b2.isDragging) {
              b2.vx += p * nx * 0.75;
              b2.vy += p * ny * 0.75;
            }
          }
        }
      }

      // Draw canvas background
      ctx.clearRect(0, 0, width, height);

      // Draw link connection lines for active cluster
      ctx.strokeStyle = "rgba(228, 228, 231, 0.35)";
      ctx.lineWidth = 1;
      for (let i = 0; i < currentBalls.length; i++) {
        for (let j = i + 1; j < currentBalls.length; j++) {
          const b1 = currentBalls[i];
          const b2 = currentBalls[j];
          if (b1.targetAlpha > 0.5 && b2.targetAlpha > 0.5) {
            const dist = Math.hypot(b2.x - b1.x, b2.y - b1.y);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(b1.x, b1.y);
              ctx.lineTo(b2.x, b2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Render balls
      currentBalls.forEach(ball => {
        ctx.save();
        ctx.globalAlpha = ball.alpha;

        // Shadow glows
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = ball.isDragging ? 18 : 6;

        // Radial fill gradient inside ball
        const grad = ctx.createRadialGradient(ball.x - 4, ball.y - 4, 4, ball.x, ball.y, ball.radius);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        grad.addColorStop(0.3, "rgba(244, 244, 245, 0.92)");
        grad.addColorStop(1, "rgba(228, 228, 231, 0.55)");
        ctx.fillStyle = grad;

        // Draw circular shape
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = ball.color;
        ctx.lineWidth = ball.isDragging ? 3.5 : 2;
        ctx.stroke();
        
        ctx.shadowBlur = 0; // remove shadow for inside contents

        // Draw image icon if loaded
        if (ball.image && ball.image.complete) {
          const imgSize = 26;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y - 6, imgSize / 2 + 1, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(ball.image, ball.x - imgSize / 2, ball.y - 6 - imgSize / 2, imgSize, imgSize);
          ctx.restore();
          ctx.save();
          ctx.globalAlpha = ball.alpha;
        } else {
          // Draw standard initials
          ctx.fillStyle = ball.color;
          ctx.font = "bold 13px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(ball.name.slice(0, 2), ball.x, ball.y - 5);
        }

        // Draw name inside circle
        ctx.fillStyle = "#09090b";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(ball.name, ball.x, ball.y + 13);

        // Draw level
        ctx.fillStyle = "#71717a";
        ctx.font = "600 7px monospace";
        ctx.fillText(`${ball.level}%`, ball.x, ball.y + 23);

        ctx.restore();
      });

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Canvas scaling on container resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = 420;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    mouseRef.current.isDown = true;
    
    const clicked = ballsRef.current.find(b => {
      if (b.targetAlpha < 0.5) return false;
      const dist = Math.hypot(b.x - pos.x, b.y - pos.y);
      return dist < b.radius;
    });

    if (clicked) {
      clicked.isDragging = true;
      draggedBallRef.current = clicked;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    mouseRef.current.x = pos.x;
    mouseRef.current.y = pos.y;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
    if (draggedBallRef.current) {
      draggedBallRef.current.isDragging = false;
      draggedBallRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.isDown = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    if (draggedBallRef.current) {
      draggedBallRef.current.isDragging = false;
      draggedBallRef.current = null;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-[420px] bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="block cursor-grab active:cursor-grabbing w-full h-full"
      />
    </div>
  );
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = ["all", ...Object.keys(CATEGORY_MAP)];

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-[#fafafa] border-b border-zinc-200 wave-divider-white">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 opacity-15 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-primary uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Expertise
          </motion.h2>
          <motion.h3 
            className="text-2xl sm:text-3xl font-black text-zinc-950 mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Skillset
          </motion.h3>
          <p className="text-zinc-500 text-xs">
            Interactive skill bubbles playground. Drag, throw, or push them with your mouse cursor!
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            const catInfo = cat !== "all" ? CATEGORY_MAP[cat] : null;
            const Icon = catInfo?.icon;
            
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  isActive 
                    ? "bg-zinc-900 border-transparent text-white shadow-lg shadow-zinc-900/15" 
                    : "bg-white border-zinc-200/80 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {cat === "all" ? "All Skills" : catInfo?.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Physics Canvas Container */}
        <SkillsCanvasPlayground skills={skills} activeCategory={activeCategory} />

      </div>
    </section>
  );
}
