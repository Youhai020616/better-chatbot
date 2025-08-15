"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export function GlobalSparkles() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-1">
      {/* 全局粒子效果 - 覆盖整个界面 */}
      <div className="w-full h-full relative">
        <SparklesCore
          id="globalsparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.3}
        />
      </div>
    </div>
  );
}
