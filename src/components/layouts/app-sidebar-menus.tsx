"use client";
import { SidebarMenuAction, SidebarMenuButton, useSidebar } from "ui/sidebar";
import { SidebarMenu, SidebarMenuItem } from "ui/sidebar";
import { SidebarGroupContent } from "ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

import { Shortcuts, getShortcutKeyList } from "lib/keyboard-shortcuts";
import { FolderSearchIcon, PlusIcon, Waypoints } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { MCPIcon } from "ui/mcp-icon";
import { SidebarGroup } from "ui/sidebar";
import { WriteIcon } from "ui/write-icon";
import { ArchiveDialog } from "../archive-dialog";

export function AppSidebarMenus() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("");
  const { setOpenMobile } = useSidebar();
  const [addArchiveDialogOpen, setAddArchiveDialogOpen] = useState(false);

  // Define page states
  const isHomePage = pathname === "/" || pathname.startsWith("/c/");
  const isMcpPage = pathname.startsWith("/mcp");
  const isWorkflowPage = pathname.startsWith("/workflow");
  const isArchivePage = pathname.startsWith("/archive");

  const handleArchiveClick = useCallback(() => {
    setOpenMobile(false);
    router.push("/archive");
  }, [router, setOpenMobile]);

  // Archive should be active when on archive page
  const isArchiveActive = isArchivePage;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Tooltip>
            <SidebarMenuItem className="mb-1">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenMobile(false);
                  router.push(`/`);
                  router.refresh();
                }}
              >
                <SidebarMenuButton
                  className={`flex font-semibold group/new-chat ${
                    isHomePage ? "bg-input/20 border border-border/40" : ""
                  }`}
                >
                  <WriteIcon className="size-4" />
                  {t("Layout.newChat")}
                  <div className="flex items-center gap-1 text-xs font-medium ml-auto opacity-0 group-hover/new-chat:opacity-100 transition-opacity">
                    {getShortcutKeyList(Shortcuts.openNewChat).map((key) => (
                      <span
                        key={key}
                        className="border w-5 h-5 flex items-center justify-center bg-accent rounded"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
        <SidebarMenu>
          <Tooltip>
            <SidebarMenuItem>
              <Link href="/mcp">
                <SidebarMenuButton
                  className={`font-semibold ${
                    isMcpPage ? "bg-input/20 border border-border/40" : ""
                  }`}
                >
                  <MCPIcon className="size-4 fill-accent-foreground" />
                  {t("Layout.mcpConfiguration")}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
        <SidebarMenu>
          <Tooltip>
            <SidebarMenuItem>
              <Link href="/workflow">
                <SidebarMenuButton
                  className={`font-semibold ${
                    isWorkflowPage ? "bg-input/20 border border-border/40" : ""
                  }`}
                >
                  <Waypoints className="size-4" />
                  {t("Layout.workflow")}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
        <SidebarMenu className="group/archive">
          <Tooltip>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleArchiveClick}
                className={`font-semibold ${
                  isArchiveActive ? "bg-input/20 border border-border/40" : ""
                }`}
              >
                <FolderSearchIcon className="size-4" />
                {t("Archive.title")}
              </SidebarMenuButton>
              <SidebarMenuAction
                className="group-hover/archive:opacity-100 opacity-0 transition-opacity"
                onClick={() => setAddArchiveDialogOpen(true)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PlusIcon className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    {t("Archive.addArchive")}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuAction>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
      </SidebarGroupContent>
      <ArchiveDialog
        open={addArchiveDialogOpen}
        onOpenChange={setAddArchiveDialogOpen}
      />
    </SidebarGroup>
  );
}
