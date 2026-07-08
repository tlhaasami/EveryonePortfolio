"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Profile, AppearanceSettings } from "@/lib/mockData";
import { SOCIAL_PLATFORMS, SOCIAL_PLATFORM_LOGOS } from "@/lib/socialConfig";
import SkeletonImage from "./SkeletonImage";
import ThreeDBackground from "./ThreeDBackground";
import { Magnetic, TextReveal, FadeInUp, StaggerContainer, StaggerItem, TextAnimationWrapper } from "./Animations";

interface HeroSectionProps {
  profile: Profile;
  appearance?: AppearanceSettings;
  isPreview?: boolean;
}

export default function HeroSection({ profile, appearance, isPreview = false }: HeroSectionProps) {
  // Appearance Configurations
  const layout = appearance?.heroLayout || "split-right";
  const picShape = appearance?.heroPicShape || "circle";
  const picBorder = appearance?.heroPicBorder || "conic-glow";
  const textAlignment = appearance?.heroTextAlignment || "left";
  const titleWeight = appearance?.heroTitleWeight || "black";
  const picSize = appearance?.profilePicSize || 310;

  // Derive sizes for rings
  const outerRingSize = picSize + 70;
  const innerRingSize = picSize + 30;

  // Picture Shape Classes / Inline Styles
  let shapeClass = "rounded-full";
  let clipStyle: React.CSSProperties = {};

  if (picShape === "square") {
    shapeClass = "rounded-none";
  } else if (picShape === "rounded-square") {
    shapeClass = "rounded-[2.5rem]";
  } else if (picShape === "hexagon") {
    shapeClass = "rounded-none";
    clipStyle = { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" };
  } else if (picShape === "blob") {
    shapeClass = "rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]";
  }

  // Picture Border Elements
  const renderPictureBorder = () => {
    if (picBorder === "conic-glow" && picShape !== "hexagon") {
      return (
        <div 
          className={`absolute animate-[spin_12s_linear_infinite] ${shapeClass}`}
          style={{
            width: innerRingSize,
            height: innerRingSize,
            background: "conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-warm), var(--color-primary))",
            padding: "3px",
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))`,
            ...clipStyle
          }}
        />
      );
    } else if (picBorder === "pulse-solid") {
      return (
        <div 
          className={`absolute animate-pulse border-4 border-primary ${shapeClass}`}
          style={{ width: innerRingSize, height: innerRingSize, ...clipStyle }}
        />
      );
    } else if (picBorder === "glow-ring") {
      return (
        <div 
          className={`absolute border-[3px] border-accent shadow-[0_0_30px_var(--color-accent-light)] animate-pulse ${shapeClass}`}
          style={{ width: innerRingSize, height: innerRingSize, ...clipStyle }}
        />
      );
    }
    return null;
  };

  // Text alignment settings
  const alignClass = textAlignment === "center" 
    ? "text-center flex flex-col items-center justify-center" 
    : textAlignment === "right" 
      ? "text-right flex flex-col items-end justify-end" 
      : "text-left flex flex-col items-start justify-start";

  const ctasAlign = textAlignment === "center"
    ? "flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 w-full"
    : textAlignment === "right"
      ? "flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 w-full"
      : "flex flex-col sm:flex-row items-center justify-start gap-3 pt-3 w-full";

  const socialsAlign = textAlignment === "center"
    ? "flex items-center justify-center gap-3 pt-3 w-full"
    : textAlignment === "right"
      ? "flex items-center justify-end gap-3 pt-3 w-full"
      : "flex items-center justify-start gap-3 pt-3 w-full";

  const titleWeightClass = titleWeight === "normal"
    ? "font-normal"
    : titleWeight === "semibold"
      ? "font-semibold"
      : titleWeight === "bold"
        ? "font-bold"
        : "font-black";

  // Dynamic CSS Variables
  const inlineGlowKeyframes = `
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 6px var(--color-primary-light), 0 0 12px rgba(139, 92, 246, 0.1); }
      50% { text-shadow: 0 0 20px var(--color-primary), 0 0 35px var(--color-primary-light); }
    }
    @keyframes textPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    @keyframes textWiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-0.5deg); }
      75% { transform: rotate(0.5deg); }
    }
  `;

  // Render Inner Content
  const renderTextContent = (isInSplitVertical = false) => {
    const primaryText = isInSplitVertical ? "text-white" : "text-zinc-950 dark:text-white";
    const subText = isInSplitVertical ? "text-white/80" : "text-zinc-700 dark:text-zinc-300";
    const faintText = isInSplitVertical ? "text-white/60" : "text-zinc-500 dark:text-zinc-400";

    const customPrimaryStyle = (!isInSplitVertical && appearance?.textColorPrimary) ? { color: appearance.textColorPrimary } : undefined;
    const customMutedStyle = (!isInSplitVertical && appearance?.textColorMuted) ? { color: appearance.textColorMuted } : undefined;

    return (
      <div className={`space-y-7 flex-1 ${alignClass}`}>
        <style dangerouslySetInnerHTML={{ __html: inlineGlowKeyframes }} />

        {/* Availability Badge */}
        {profile.availabilityStatus === "available" && (
          <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.2} distance={15}>
            <div 
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass ${isInSplitVertical ? "text-white border-white/20" : "text-emerald-700 border-emerald-500/20"} text-[10px] font-bold tracking-wider uppercase border`}
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for projects
            </div>
          </TextAnimationWrapper>
        )}

        {/* Name and Title */}
        <div className={`space-y-3 w-full ${alignClass}`}>
          <h1 
            style={customPrimaryStyle}
            className={`text-4xl sm:text-5xl lg:text-6xl ${titleWeightClass} tracking-tight ${primaryText} leading-[1.1] w-full ${
              appearance?.continuousAnimationStyle === "glowing" 
                ? "animate-[textGlow_3s_ease-in-out_infinite]"
                : appearance?.continuousAnimationStyle === "pulsing"
                  ? "animate-[textPulse_4s_ease-in-out_infinite]"
                  : appearance?.continuousAnimationStyle === "wiggle"
                    ? "animate-[textWiggle_5s_ease-in-out_infinite]"
                    : ""
            }`}
          >
            {appearance?.textAnimationStyle === "typewriter" ? (
              <TextAnimationWrapper style="typewriter" delay={0.3}>
                {profile.name} {profile.username && <span className="text-sm font-semibold opacity-60 ml-2">@{profile.username}</span>}
              </TextAnimationWrapper>
            ) : (
              <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.3} distance={30}>
                {profile.name} {profile.username && <span className="text-xs sm:text-sm font-semibold opacity-50 block sm:inline sm:ml-2">@{profile.username}</span>}
              </TextAnimationWrapper>
            )}
          </h1>
          <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.6} distance={20}>
            <p className="text-lg sm:text-xl lg:text-2xl font-extrabold gradient-text">
              {profile.title}
            </p>
          </TextAnimationWrapper>
        </div>

        {/* Introduction */}
        <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.75} distance={20}>
          <p 
            style={customMutedStyle}
            className={`${subText} text-base sm:text-lg font-medium leading-relaxed max-w-xl`}
          >
            {profile.introduction}
          </p>
        </TextAnimationWrapper>

        {/* Subtitle */}
        <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.85} distance={20}>
          <p 
            style={customMutedStyle}
            className={`${faintText} text-sm sm:text-base leading-relaxed max-w-lg`}
          >
            {profile.subtitle}
          </p>
        </TextAnimationWrapper>

        {/* Call to Actions */}
        <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.95} distance={20}>
          <div className={ctasAlign}>
            <Magnetic strength={0.15}>
              <a 
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20 active:scale-[0.98] hover:shadow-xl hover:shadow-primary/30"
              >
                View Work <ArrowRight className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a 
                href="#contact"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border-2 ${
                  isInSplitVertical 
                    ? "border-white hover:bg-white hover:text-primary text-white" 
                    : "border-primary hover:bg-primary hover:text-white text-primary"
                } font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-primary/20 cursor-pointer`}
              >
                Contact Me <MessageSquare className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>
        </TextAnimationWrapper>

        {/* Social Links */}
        <StaggerContainer className={socialsAlign} staggerDelay={0.06}>
          {SOCIAL_PLATFORMS.map((platform) => {
            const href = profile.socialLinks[platform.key as keyof typeof profile.socialLinks];
            if (!href) return null;
            return (
              <StaggerItem key={platform.key}>
                <Magnetic strength={0.25}>
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${isInSplitVertical ? "text-white/60 hover:text-white hover:bg-white/10" : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"} hover:shadow-sm`}
                    aria-label={platform.label}
                  >
                    {SOCIAL_PLATFORM_LOGOS[platform.key]}
                  </a>
                </Magnetic>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    );
  };

  const renderPhotoContent = (rotateStyle: React.CSSProperties = {}) => {
    if (picShape === "hidden") return null;

    return (
      <motion.div 
        className="flex-shrink-0 relative flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
        style={rotateStyle}
      >
        {renderPictureBorder()}

        {picBorder === "conic-glow" && picShape !== "hexagon" && (
          <div 
            className={`absolute border border-zinc-250/30 animate-[spin_50s_linear_infinite] pointer-events-none ${shapeClass}`}
            style={{ width: outerRingSize, height: outerRingSize, ...clipStyle }}
          />
        )}

        <div 
          className={`relative overflow-hidden border-4 border-white shadow-2xl bg-zinc-100 group ${shapeClass}`}
          style={{ width: picSize, height: picSize, ...clipStyle }}
        >
          <SkeletonImage 
            src={profile.heroImage} 
            alt={profile.name} 
            fill 
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${shapeClass}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        </div>
      </motion.div>
    );
  };

  // Render different layouts
  const renderLayoutContent = () => {
    switch (layout) {
      case "split-left":
        return (
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 max-w-6xl mx-auto w-full">
            {renderTextContent()}
            {renderPhotoContent()}
          </div>
        );
      case "centered":
        return (
          <div className="flex flex-col items-center text-center gap-12 max-w-4xl mx-auto w-full">
            {renderPhotoContent()}
            {renderTextContent()}
          </div>
        );
      case "split-vertical":
        return (
          <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[92vh] max-w-none mx-0">
            {/* Left Column (Text & Accent Gradient) */}
            <div className="flex-1 bg-gradient-to-br from-primary to-primary-dark p-8 sm:p-14 lg:p-24 flex flex-col justify-center relative overflow-hidden">
              {/* Radial gradient background accent details */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-accent-dark),transparent_50%)] opacity-35" />
              <div className="relative z-10 w-full max-w-2xl mx-auto">
                {renderTextContent(true)}
              </div>
            </div>

            {/* Right Column (Photo & Clean Canvas Grid) */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 sm:p-14 lg:p-24 relative overflow-hidden">
              <div className="relative z-10">
                {renderPhotoContent()}
              </div>
            </div>
          </div>
        );
      case "banner-overlay":
        return (
          <div className="relative w-full py-16 flex items-center justify-center min-h-[85vh]">
            {/* Soft blurred background profile picture copy */}
            {profile.heroImage && picShape !== "hidden" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <SkeletonImage 
                  src={profile.heroImage} 
                  alt="" 
                  fill
                  className="object-cover scale-110 blur-[80px]"
                />
              </div>
            )}

            {/* Centered Glassmorphic card */}
            <div className="relative z-10 max-w-3xl w-full mx-auto p-8 sm:p-14 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-8">
              {renderPhotoContent()}
              {renderTextContent()}
            </div>
          </div>
        );
      case "floating-cards":
        return (
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-6xl mx-auto w-full">
            {/* Floating text card */}
            <div className="p-8 sm:p-12 rounded-3xl border border-zinc-200/60 bg-white/90 backdrop-blur-md shadow-xl flex-1 relative z-20">
              {renderTextContent()}
            </div>
            {/* Floating photo card */}
            <div className="p-6 rounded-3xl border border-zinc-200/60 bg-white/95 backdrop-blur-md shadow-2xl relative z-10 lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              {renderPhotoContent()}
            </div>
          </div>
        );
      case "split-right":
      default:
        return (
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto w-full">
            {renderTextContent()}
            {renderPhotoContent()}
          </div>
        );
    }
  };

  return (
    <section className={`relative flex items-center justify-center overflow-hidden bg-white wave-divider ${
      isPreview 
        ? "min-h-full h-full py-8" 
        : `min-h-[92vh] ${layout === "split-vertical" ? "py-0" : "py-20"}`
    }`}>
      <ThreeDBackground 
        gridType={appearance?.bgGridType}
        gridSize={appearance?.bgGridSize}
        gridOpacity={appearance?.bgGridOpacity}
        gridColor={appearance?.bgGridColor}
        enableParticles={appearance?.enableParticles}
        particleCount={appearance?.particleCount}
        particleStyle={appearance?.particleStyle}
        particleSpeed={appearance?.particleSpeed}
        geometryMeshStyle={appearance?.geometryMeshStyle}
        enableGlowRings={appearance?.enableGlowRings}
        glowRingsColor={appearance?.glowRingsColor}
        colorPrimary={appearance?.colorPrimary}
        colorAccent={appearance?.colorAccent}
      />

      {/* Dynamic theme glow blobs (hidden in split-vertical to prevent overlays) */}
      {layout !== "split-vertical" && (
        <>
          <div 
            className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-35 blur-[120px] pointer-events-none" 
            style={{ backgroundColor: "var(--color-primary-light)" }}
          />
          <div 
            className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full opacity-30 blur-[140px] pointer-events-none" 
            style={{ backgroundColor: "var(--color-accent-light)" }}
          />
          <div 
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full opacity-15 blur-[100px] pointer-events-none" 
            style={{ backgroundColor: "var(--color-warm)" }}
          />
        </>
      )}

      <div className={`w-full relative z-10 ${layout === "split-vertical" ? "px-0" : "container mx-auto px-6"}`}>
        {renderLayoutContent()}
      </div>
    </section>
  );
}
