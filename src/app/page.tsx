"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

const TOTAL_FRAMES = 40;

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("INÍCIO");

  const navItems = ["INÍCIO", "SOBRE", "PROJETOS", "SERVIÇOS", "CONTATO"];

  // Canvas & Scroll Animation References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<{ [key: number]: HTMLImageElement }>({});
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);

  // Draw a specific frame to the canvas with responsive cover sizing & Retina support
  const drawFrame = (frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const targetIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNum)));

    // Retrieve requested image or closest loaded frame fallback (zero flicker)
    let img = imagesRef.current[targetIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const lower = targetIndex - offset;
        const upper = targetIndex + offset;
        if (lower >= 1 && imagesRef.current[lower]?.complete && imagesRef.current[lower]?.naturalWidth > 0) {
          img = imagesRef.current[lower];
          break;
        }
        if (upper <= TOTAL_FRAMES && imagesRef.current[upper]?.complete && imagesRef.current[upper]?.naturalWidth > 0) {
          img = imagesRef.current[upper];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;

    // Cover math (centered without distortion)
    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  };

  // 1. Progressive Frame Preloading (ezgif-frame-001.png to ezgif-frame-040.png)
  useEffect(() => {
    let isMounted = true;

    // Priority 1: Load first frame immediately for initial paint
    const img1 = new Image();
    img1.src = "/imagens/ezgif-frame-001.png";
    img1.onload = () => {
      if (!isMounted) return;
      imagesRef.current[1] = img1;
      drawFrame(1);
    };

    // Priority 2: Preload remaining frames progressively
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/imagens/ezgif-frame-${padded}.png`;
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i] = img;
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Global Scroll Progress Calculation: 0% -> Frame 1, 100% -> Frame 40 (All the way to the final frame!)
  useEffect(() => {
    const onScrollOrResize = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const track = scrollTrackRef.current;
      const trackHeight = track ? track.offsetHeight : document.documentElement.scrollHeight;
      const scrollableDistance = trackHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollY / scrollableDistance));

      // Map progress directly to frame index [1, TOTAL_FRAMES]
      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // 3. Persistent Animation Loop with Smooth Momentum LERP & DPR Sizing
  useEffect(() => {
    let animationFrameId: number;

    const syncCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.floor(window.innerWidth * dpr);
      const targetH = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        drawFrame(currentFrameRef.current);
      }
    };

    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize, { passive: true });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animateLoop = () => {
      if (prefersReducedMotion.matches) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        // Apple-style smooth momentum lerp
        const lerpFactor = 0.095;
        const delta = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(delta) > 0.0005) {
          currentFrameRef.current += delta * lerpFactor;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      drawFrame(currentFrameRef.current);

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", syncCanvasSize);
    };
  }, []);

  return (
    <div ref={scrollTrackRef} className={styles.scrollTrack}>
      {/* Fullscreen HTML5 Fixed Canvas - Permanently visible throughout entire 400vh scroll */}
      <canvas ref={canvasRef} className={styles.scrollCanvas} />

      {/* Deep Luxury Gold & Cinematic Vignette Seamless Blend */}
      <div className={styles.cinematicOverlay} aria-hidden="true" />

      {/* Fixed Hero Section Structure & Elements (100% Unchanged) */}
      <div className={styles.heroWrapper}>
      {/* Background Ambience & Cyber Grid (No image files) */}
      <div className={styles.ambientGlowRight} aria-hidden="true" />
      <div className={styles.ambientGlowLeft} aria-hidden="true" />
      <div className={styles.cyberGrid} aria-hidden="true" />

      {/* Main Container */}
      <div className={styles.container}>
        {/* HEADER / NAVIGATION */}
        <header className={styles.header}>
          {/* Brand Logo */}
          <a href="#" className={styles.logo} aria-label="ROBOFORGE Home">
            <div className={styles.logoIcon}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="rgba(0, 240, 255, 0.3)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#00f0ff"
                  strokeWidth="3.5"
                  strokeDasharray="28 8 28 8"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 6px #00f0ff)"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="13"
                  stroke="#00b4ff"
                  strokeWidth="2"
                  strokeDasharray="16 6"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="5"
                  fill="#00f0ff"
                  filter="drop-shadow(0 0 8px #00f0ff)"
                />
              </svg>
            </div>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoBrand}>ROBOFORGE</span>
              <span className={styles.logoTagline}>AUTOMATION &amp; AI</span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className={styles.navMenu} aria-label="Navegação Principal">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item);
                }}
                className={`${styles.navLink} ${
                  activeTab === item ? styles.navLinkActive : ""
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Header CTA Button (Desktop) */}
          <a href="#contato" className={styles.headerCta}>
            <span>Vamos Conversar</span>
            <div className={styles.headerCtaCircle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`${styles.hamburgerBtn} ${mobileMenuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className={styles.mobileMenu} aria-label="Menu Mobile">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`${styles.mobileNavLink} ${
                  activeTab === item ? styles.mobileNavLinkActive : ""
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="#contato"
              className={styles.mobileCta}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Vamos Conversar</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </nav>
        )}

        {/* HERO MAIN BODY */}
        <section className={styles.heroBody}>
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className={styles.heroLeft}>
            {/* Eyebrow tracker */}
            <div className={styles.eyebrow}>
              <span>TECNOLOGIA</span>
              <span className={styles.eyebrowDot} />
              <span>AUTOMAÇÃO</span>
              <span className={styles.eyebrowDot} />
              <span>INTELIGÊNCIA ARTIFICIAL</span>
            </div>

            {/* Giant Title */}
            <h1 className={styles.title}>
              <span className={styles.titleWhite}>ROBOFORGE</span>
              <span className={styles.titleGradient}>IDEIAS EM</span>
              <span className={styles.titleGradient}>AUTOMAÇÃO</span>
            </h1>

            {/* Description Subtitle */}
            <p className={styles.subtitle}>
              Soluções inteligentes que transformam processos em resultados reais. Do conceito à automação, com o poder da IA.
            </p>

            {/* Action Buttons */}
            <div className={styles.ctaGroup}>
              <a href="#projetos" className={styles.btnPrimary}>
                <span className={styles.btnIconCircle}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span>Ver Projetos</span>
                <span className={styles.btnArrowRight}>→</span>
              </a>

              <a href="#servicos" className={styles.btnSecondary}>
                <span>Conhecer Serviços</span>
                <span className={styles.gearIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </span>
              </a>
            </div>

            {/* 4 Feature Badges */}
            <div className={styles.featuresRow}>
              {/* Badge 1: Automação de Processos */}
              <div className={styles.featureItem}>
                <div className={styles.featureIconBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className={styles.featureTexts}>
                  <span className={styles.featureTitle}>Automação</span>
                  <span className={styles.featureSubtitle}>de Processos</span>
                </div>
              </div>

              {/* Badge 2: Inteligência Artificial */}
              <div className={styles.featureItem}>
                <div className={styles.featureIconBadge}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    {/* Brain / AI network SVG */}
                    <path d="M12 2a4 4 0 0 0-4 4c0 .7.18 1.35.5 1.93A5 5 0 0 0 4 12c0 1.45.62 2.76 1.61 3.67A4.5 4.5 0 0 0 10 20h4a4.5 4.5 0 0 0 4.39-4.33A5 5 0 0 0 20 12a5 5 0 0 0-4.5-4.07A4 4 0 0 0 12 2z"></path>
                    <line x1="12" y1="6" x2="12" y2="18"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <div className={styles.featureTexts}>
                  <span className={styles.featureTitle}>Inteligência</span>
                  <span className={styles.featureSubtitle}>Artificial</span>
                </div>
              </div>

              {/* Badge 3: Desenvolvimento de Sistemas */}
              <div className={styles.featureItem}>
                <div className={styles.featureIconBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <line x1="10" y1="20" x2="14" y2="4"></line>
                  </svg>
                </div>
                <div className={styles.featureTexts}>
                  <span className={styles.featureTitle}>Desenvolvimento</span>
                  <span className={styles.featureSubtitle}>de Sistemas</span>
                </div>
              </div>

              {/* Badge 4: Apps e Web Modernos */}
              <div className={styles.featureItem}>
                <div className={styles.featureIconBadge}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <div className={styles.featureTexts}>
                  <span className={styles.featureTitle}>Apps e Web</span>
                  <span className={styles.featureSubtitle}>Modernos</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HOLOGRAPHIC PORTAL STRUCTURE (NO IMAGES) */}
          <div className={styles.heroRight}>
            <div className={styles.portalStructure}>
              {/* Pulsing Aura Backdrop */}
              <div className={styles.portalBackdropGlow} aria-hidden="true" />

              {/* Multi-layered Futuristic SVG Stargate / Portal Ring */}
              <svg className={styles.portalSvg} viewBox="0 0 500 500" fill="none">
                {/* Glow Filter Definitions */}
                <defs>
                  <filter id="neonCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur1" />
                    <feGaussianBlur stdDeviation="14" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="cyanRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f7ff" />
                    <stop offset="50%" stopColor="#0088ff" />
                    <stop offset="100%" stopColor="#00f7ff" />
                  </linearGradient>
                </defs>

                {/* Outer Ambient Rings */}
                <circle
                  cx="250"
                  cy="250"
                  r="238"
                  stroke="rgba(0, 195, 255, 0.12)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="228"
                  stroke="rgba(0, 240, 255, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="6 14"
                />

                {/* Heavy Segmented Mechanical Outer Ring */}
                <g className={styles.rotateClockwise}>
                  <circle
                    cx="250"
                    cy="250"
                    r="215"
                    stroke="url(#cyanRingGradient)"
                    strokeWidth="10"
                    strokeDasharray="45 15 80 20 30 15 110 30"
                    filter="url(#neonCyanGlow)"
                    strokeLinecap="round"
                  />
                  {/* Outer Mechanical Tick Nodes */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 250 + Math.cos(rad) * 228;
                    const y1 = 250 + Math.sin(rad) * 228;
                    const x2 = 250 + Math.cos(rad) * 242;
                    const y2 = 250 + Math.sin(rad) * 242;
                    return (
                      <line
                        key={angle}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                        filter="drop-shadow(0 0 4px #00f0ff)"
                      />
                    );
                  })}
                </g>

                {/* Intermediate Counter-Rotating Precision Ring */}
                <g className={styles.rotateCounterClockwise}>
                  <circle
                    cx="250"
                    cy="250"
                    r="195"
                    stroke="#0088ff"
                    strokeWidth="2"
                    strokeDasharray="18 10 4 10"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="182"
                    stroke="rgba(0, 240, 255, 0.45)"
                    strokeWidth="1.5"
                    strokeDasharray="100 40 60 40"
                  />
                </g>

                {/* Inner Glowing Plasma Arc Ring */}
                <g className={styles.rotateSlow}>
                  <circle
                    cx="250"
                    cy="250"
                    r="165"
                    stroke="#00f0ff"
                    strokeWidth="4"
                    strokeDasharray="140 30 90 20"
                    filter="url(#neonCyanGlow)"
                  />
                </g>
              </svg>

              {/* Portal Center Hologram / 3D Gateway Slot */}
              <div className={styles.portalCenterSlot}>
                <div className={styles.portalStatusTag}>
                  <span className={styles.portalStatusDot}></span>
                  <span>PORTAL ONLINE</span>
                </div>
                <h3 className={styles.portalCenterTitle}>ROBOFORGE CORE</h3>
                <p className={styles.portalCenterSub}>
                  Portal Dimensional de IA &amp; Automação
                </p>
                <div className={styles.portalTelemetry}>
                  <span>GRID: 3D-ACTIVE</span>
                  <span>SYS: 100%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM BAR: SCROLL DISCOVER & SOCIAL ICONS */}
        <footer className={styles.bottomBar}>
          {/* Scroll Down Mouse Indicator */}
          <div className={styles.scrollIndicator}>
            <div className={styles.mouseIcon} aria-hidden="true">
              <span className={styles.mouseWheel}></span>
            </div>
            <div className={styles.scrollTextWrapper}>
              <span className={styles.scrollText}>ROLE PARA DESCOBRIR</span>
              <div className={styles.scrollChevrons} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className={styles.socialRow}>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  </div>
  );
}
