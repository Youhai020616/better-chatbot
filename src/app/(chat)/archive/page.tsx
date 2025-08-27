"use client";

import { ArchiveDialog } from "@/components/archive-dialog";
import { ShareableCard } from "@/components/shareable-card";
import { useArchives } from "@/hooks/queries/use-archives";
import { authClient } from "auth/client";
import { notify } from "lib/notify";
import { ArrowUpRight, FolderPlus, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { BackgroundPaths } from "ui/background-paths";
import { Button } from "ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "ui/dialog";
import { Skeleton } from "ui/skeleton";

export default function ArchivePage() {
  const t = useTranslations();
  const _router = useRouter();
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;
  const [createArchiveDialogOpen, setCreateArchiveDialogOpen] = useState(false);

  const { data: archives, isLoading } = useArchives();

  // Filter archives by current user
  const myArchives = archives?.filter((a) => a.userId === currentUserId) || [];

  const deleteArchive = async (archiveId: string) => {
    const ok = await notify.confirm({
      description: t("Archive.deleteConfirm"),
    });
    if (!ok) return;

    try {
      const response = await fetch(`/api/archive/${archiveId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete archive");

      mutate("/api/archive");
      toast.success(t("Archive.deleted"));
    } catch (_error) {
      toast.error(t("Common.error"));
    }
  };

  const handleCreateSuccess = () => {
    setCreateArchiveDialogOpen(false);
    mutate("/api/archive");
  };

  return (
    <div className="w-full flex flex-col gap-4 p-8">
      <div className="flex flex-row gap-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="relative group">
              {t("Archive.whatIsArchive")}
              <HelpCircle className="size-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-3xl!">
            <DialogTitle className="sr-only">archive information</DialogTitle>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{t("Archive.title")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("Archive.description")}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p className="text-sm">{t("Archive.feature1")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p className="text-sm">{t("Archive.feature2")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p className="text-sm">{t("Archive.feature3")}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="secondary"
          onClick={() => setCreateArchiveDialogOpen(true)}
          className="min-w-54 justify-between"
        >
          <FolderPlus className="size-4 mr-2" />
          {t("Archive.createArchive")}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{t("Archive.myArchives")}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Create Archive Card */}
          <Card
            className="relative bg-secondary overflow-hidden w-full hover:bg-input transition-colors h-[196px] cursor-pointer"
            onClick={() => setCreateArchiveDialogOpen(true)}
          >
            <div className="absolute inset-0 w-full h-full opacity-50">
              <BackgroundPaths />
            </div>
            <CardHeader>
              <CardTitle>
                <h1 className="text-lg font-bold">
                  {t("Archive.createArchive")}
                </h1>
              </CardTitle>
              <CardDescription className="mt-2">
                <p className="">{t("Archive.createArchiveDescription")}</p>
              </CardDescription>
              <div className="mt-auto ml-auto flex-1">
                <Button variant="ghost" size="lg">
                  {t("Common.create")}
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Loading Skeletons */}
          {isLoading
            ? Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-full h-[196px]" />
                ))
            : myArchives?.map((archive) => (
                <ShareableCard
                  key={archive.id}
                  type="archive"
                  item={archive}
                  href={`/archive/${archive.id}`}
                  onDelete={deleteArchive}
                />
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && myArchives.length === 0 && (
          <div className="text-center py-12">
            <FolderPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {t("Archive.noArchives")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("Archive.noArchivesDescription")}
            </p>
            <Button onClick={() => setCreateArchiveDialogOpen(true)}>
              {t("Archive.createFirstArchive")}
            </Button>
          </div>
        )}
      </div>

      {/* Create Archive Dialog */}
      <ArchiveDialog
        open={createArchiveDialogOpen}
        onOpenChange={setCreateArchiveDialogOpen}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
