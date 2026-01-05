"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Animation References
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const scale = useRef(1);
  const glow = useRef(0.6);
  const wave = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 1. Sync mouse position
    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    // 2. Hover Interaction Logic
    const onHover = () => {
      scale.current = 2.5; // Grow larger on buttons/cards
      glow.current = 1.2;  // Intense glow
    };

    const onLeave = () => {
      scale.current = 1;
      glow.current = 0.6;
    };

    // Attach listeners to interactive elements
    const attachListeners = () => {
      const interactive = document.querySelectorAll("a, button, .card, .ps5-item");
      interactive.forEach((el) => {
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Initial attachment
    attachListeners();

    // 3. Animation Loop (High Performance)
    let animationFrameId: number;

    const animate = () => {
      // Lerp (Linear Interpolation) for "heavy" gravitational movement
      // Formula: current + (target - current) * factor
      currentX.current += (targetX.current - currentX.current) * 0.15;
      currentY.current += (targetY.current - currentY.current) * 0.15;

      // Pulse effect phase
      wave.current += 0.05; 
      const waveOffset = Math.sin(wave.current) * 5 * glow.current;

      // Apply transforms
      cursor.style.transform = `
        translate3d(${currentX.current - 10}px, ${currentY.current - 10}px, 0)
        scale(${scale.current})
      `;

      // Apply dynamic shadow based on wave pulse
      cursor.style.boxShadow = `
        0 0 ${20 * glow.current + waveOffset}px rgba(255,255,255,0.8),
        0 0 ${40 * glow.current + waveOffset * 1.5}px rgba(79,124,255,0.4)
      `;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference", // Inverts color based on background
        willChange: "transform",    // Optimization for GPU
      }}
    />
  );
}