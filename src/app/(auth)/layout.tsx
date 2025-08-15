import { Auth3DRobot } from "@/components/ui/auth-3d-robot";
import { GlobalSparkles } from "@/components/ui/global-sparkles";
import { GlobalSpotlight } from "@/components/ui/global-spotlight";
import { TopSparkles } from "@/components/ui/top-sparkles";
import { getTranslations } from "next-intl/server";
import { BackgroundPaths } from "ui/background-paths";
import { FlipWords } from "ui/flip-words";
import { Think } from "ui/think";

export default async function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  const t = await getTranslations("Auth.Intro");
  return (
    <main className="relative w-full flex flex-col h-screen">
      {/* 全局背景效果 */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundPaths />
      </div>

      {/* 全局粒子效果 - 在背景之上，不影响动态背景 */}
      <GlobalSparkles />

      {/* 顶部粒子效果 */}
      <TopSparkles />

      {/* 全局鼠标聚光灯效果 */}
      <GlobalSpotlight />

      {/* 全局底部翻转文字 - 与右侧登录表单中心对齐 */}
      <div className="absolute bottom-16 left-3/4 transform -translate-x-1/2 z-20">
        <FlipWords
          words={[t("description")]}
          className="text-muted-foreground text-center whitespace-nowrap"
        />
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex min-h-screen w-full">
          <div className="hidden lg:flex lg:w-1/2 p-6 relative flex-col">
            {/* 3D机器人背景 */}
            <Auth3DRobot />

            {/* 标题 - 在3D机器人左侧 */}
            <h1 className="text-xl font-semibold flex items-center gap-3 animate-in fade-in duration-1000 absolute top-16 left-8 z-10">
              <Think />
              <span>Chat Bot</span>
            </h1>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
            {/* 登录表单内容 - 居中显示，添加背景虚化效果 */}
            <div className="backdrop-blur-sm bg-background/80 rounded-lg p-4 shadow-lg max-w-md w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
