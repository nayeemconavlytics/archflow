"use client";

import { useEffect, useState } from "react";

export default function BlackHoleScroll() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setVisible(scrollTop > 120);
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setIsExpanding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Duration matches the animation time (1.8s)
    setTimeout(() => setIsExpanding(false), 2000);
  };

  if (!visible && !isExpanding) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <>
      <style>{`
        @keyframes eventHorizonRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* WAVE STARTS FROM BUTTON POSITION */
        @keyframes globalGravityWave {
          0% { 
            transform: scale(0); 
            opacity: 1; 
            border-width: 40px;
          }
          100% { 
            transform: scale(1); 
            opacity: 0; 
            border-width: 1px;
          }
        }

        @keyframes screenFlash {
          0% { opacity: 0; }
          10% { opacity: 0.4; }
          100% { opacity: 0; }
        }

        .black-hole-fixed-trigger {
          position: fixed;
          bottom: 40px;
          right: 40px;
          width: 60px;
          height: 60px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .gravity-core {
          position: absolute;
          width: 26px;
          height: 26px;
          background: #000;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.8);
          z-index: 10001;
        }

        /* The wave now expands from the fixed button point */
        .global-wave {
          position: absolute; /* Relative to .black-hole-fixed-trigger */
          width: 300vmax;     /* Large enough to cover any screen size/ratio */
          height: 300vmax;
          border: 4px solid rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          
          /* Centering the giant circle on the small button */
          top: 50%;
          left: 50%;
          margin-top: -150vmax;
          margin-left: -150vmax;

          animation: globalGravityWave 1.8s cubic-bezier(0.1, 0, 0.3, 1) forwards;
          backdrop-filter: blur(4px) brightness(1.5);
          -webkit-backdrop-filter: blur(4px) brightness(1.5);
        }

        .flash-overlay {
          position: fixed;
          inset: 0;
          background: white;
          pointer-events: none;
          z-index: 10002;
          animation: screenFlash 0.5s ease-out forwards;
        }

        .event-horizon-svg {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: eventHorizonRotate 12s linear infinite;
          filter: drop-shadow(0 0 8px rgba(0, 210, 255, 0.6));
          z-index: 10000;
        }
      `}</style>

      <div className="black-hole-fixed-trigger" onClick={handleClick}>
        {isExpanding && (
          <>
            <div className="flash-overlay" />
            {/* Two waves for extra depth */}
            <div className="global-wave" style={{ animationDelay: '0s' }} />
            <div className="global-wave" style={{ animationDelay: '0.15s', opacity: 0.5 }} />
          </>
        )}

        <svg className="event-horizon-svg" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
          <circle
            cx="22" cy="22" r={radius}
            stroke="url(#bhGradientCentered)"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="bhGradientCentered" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#3aefc3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="gravity-core" />
      </div>
    </>
  );
}