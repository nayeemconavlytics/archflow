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
      scale.current = 2.8; // Slightly larger for better "selection" feel
      glow.current = 1.5;  // More intense glow
    };

    const onLeave = () => {
      scale.current = 1;
      glow.current = 0.6;
    };

    // Attach listeners to interactive elements
    const attachListeners = () => {
      // Expanded selector to include all interactive clinical elements
      const interactive = document.querySelectorAll(
        "a, button, input, select, .card, .glass-panel, [role='button']"
      );
      interactive.forEach((el) => {
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // 3. MutationObserver: Watch for new buttons/cards appearing in the DOM
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial attachment
    attachListeners();

    // 4. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      // Smooth movement (Lerp)
      currentX.current += (targetX.current - currentX.current) * 0.15;
      currentY.current += (targetY.current - currentY.current) * 0.15;

      // Pulse effect
      wave.current += 0.05; 
      const waveOffset = Math.sin(wave.current) * 5 * glow.current;

      // Apply transforms
      cursor.style.transform = `
        translate3d(${currentX.current - 10}px, ${currentY.current - 10}px, 0)
        scale(${scale.current})
      `;

      // Apply dynamic shadow
      cursor.style.boxShadow = `
        0 0 ${20 * glow.current + waveOffset}px rgba(255,255,255,0.8),
        0 0 ${40 * glow.current + waveOffset * 1.5}px rgba(99,102,241,0.4)
      `;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none transition-transform duration-300 ease-out"
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference", 
        willChange: "transform, box-shadow",
      }}
    />
  );
}