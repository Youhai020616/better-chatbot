"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export function TopSparkles() {
  return (
    <div className="absolute top-0 left-0 w-full h-32 overflow-hidden z-2 pointer-events-none">
      {/* 顶部粒子效果 - 更密集的粒子 */}
      <div className="w-full h-full relative">
        <SparklesCore
          id="topsparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.8}
        />

        {/* 渐变遮罩，使粒子在底部逐渐消失 */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      </div>
    </div>
  );
}
