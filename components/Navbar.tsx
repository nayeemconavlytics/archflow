"use client";

import { Dispatch, SetStateAction } from "react";

// The props interface to fix your TypeScript error
interface NavbarProps {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

export default function PS5Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: 0, label: "Home", path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { id: 1, label: "About", path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
    { id: 2, label: "Services", path: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { id: 3, label: "Why Us", path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { id: 4, label: "Estimate", path: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    { id: 5, label: "Contact", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
  ];

  const handleNavClick = (id: number) => {
    setActiveTab(id);
    
    // TRIGGER PARTICLES: Dispatch a high-intensity wave for the PS5 "Selection" effect
    window.dispatchEvent(
      new CustomEvent("gravitational-wave", { 
        detail: { intensity: 0.8, color: "#00d2ff" } 
      })
    );
  };

  return (
    <div className="ps5-container">
      <nav className="ps5-bar">
        {navItems.map((item) => (
          // Inside your navItems.map in Navbar.tsx
<button
  key={item.id}
  className={`ps5-item ${activeTab === item.id ? "active" : ""}`}
  onClick={() => {
    setActiveTab(item.id);
    // Trigger "Snap" shiver + Permanent Shape Change
    window.dispatchEvent(new CustomEvent("morph-shape", { detail: { shape: item.label.toLowerCase() } }));
    window.dispatchEvent(new CustomEvent("gravitational-wave", { detail: { intensity: 0.8 } }));
  }}
  onMouseEnter={() => {
    // Trigger "Hover" Shape Change (Subtle)
    window.dispatchEvent(new CustomEvent("morph-shape", { detail: { shape: item.label.toLowerCase() } }));
    window.dispatchEvent(new CustomEvent("gravitational-wave", { detail: { intensity: 0.15 } }));
  }}
  onMouseLeave={() => {
    // Optional: Return to default sphere when not hovering
    window.dispatchEvent(new CustomEvent("morph-shape", { detail: { shape: 'default' } }));
  }}
>
            <div className="ps5-icon-wrapper">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d={item.path} />
              </svg>
            </div>
            
            <span className="ps5-label">{item.label}</span>
            
            {activeTab === item.id && <div className="ps5-glow-dot" />}
          </button>
        ))}
      </nav>

      <style jsx>{`
        .ps5-container {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          padding: 10px;
        }

        .ps5-bar {
          display: flex;
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(25px) saturate(150%);
          -webkit-backdrop-filter: blur(25px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px;
          border-radius: 28px;
          gap: 12px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .ps5-item {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: rgba(255, 255, 255, 0.4);
        }

        .ps5-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-8px) scale(1.1);
        }

        .ps5-item.active {
          color: #00d2ff;
          background: rgba(0, 210, 255, 0.15);
        }

        .ps5-icon-wrapper svg {
          width: 22px;
          height: 22px;
        }

        .ps5-label {
          position: absolute;
          top: -45px;
          background: rgba(255, 255, 255, 0.95);
          color: #000;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
          transition: 0.3s ease;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .ps5-item:hover .ps5-label {
          opacity: 1;
          transform: translateY(0);
        }

        .ps5-glow-dot {
          position: absolute;
          bottom: 6px;
          width: 5px;
          height: 5px;
          background: #00d2ff;
          border-radius: 50%;
          box-shadow: 0 0 15px #00d2ff, 0 0 5px #fff;
        }
      `}</style>
    </div>
  );
}