"use client";

import { useState, useEffect } from "react";

export function GlobalSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-30">
      {/* 全局鼠标跟随的白色聚光灯效果 */}
      <div
        className="absolute w-64 h-64 pointer-events-none"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.1) 60%, transparent 80%)",
          borderRadius: "50%",
          filter: "blur(15px)",
        }}
      />
    </div>
  );
}
