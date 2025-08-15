"use client";

import { SplineScene } from "@/components/ui/splite";

export function Auth3DRobot() {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* 3D机器人 - 占满整个左侧界面，支持鼠标交互 */}
      <div className="w-full h-full">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
