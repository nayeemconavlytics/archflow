"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(percent);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[9998] h-[2px] bg-white/30"
      style={{
        width: `${progress * 100}%`,
        transition: "width 0.1s linear",
      }}
    />
  );
}
