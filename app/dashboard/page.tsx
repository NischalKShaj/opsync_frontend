"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/types";
import { workspaceApi } from "@/lib/api";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { WorkspaceCard } from "@/components/workspace/WorkspaceCard";
import { CreateWorkspaceDialog } from "@/components/workspace/CreateWorkspaceDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const DUMMY_WORKSPACES: Workspace[] = [
    {
      id: "1",
      name: "Opsync Development",
      description: "Main development workspace",
      ownerId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "QA Testing",
      description: "Testing and bug tracking",
      ownerId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Design Team",
      description: "UI/UX collaboration workspace",
      ownerId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // const fetchWorkspaces = useCallback(async () => {
  //   try {
  //     const data = await workspaceApi.get<Workspace[]>("/workspaces");
  //     setWorkspaces(data);
  //   } catch {
  //     console.error("Failed to fetch workspaces");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const fetchWorkspaces = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setWorkspaces(DUMMY_WORKSPACES);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const loadWorkSpace = async () => {
      await fetchWorkspaces();
    };

    loadWorkSpace();
  }, [fetchWorkspaces]);

  const handleCreateWorkspace = (workspace: Workspace) => {
    setWorkspaces([...workspaces, workspace]);
  };

  const handleWorkspaceClick = (workspaceId: string) => {
    router.push(`/workspace/${workspaceId}`);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AppLayout title="Workspaces">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f0ff]"></div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppLayout title="Workspaces">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white neon-text">
                Your Workspaces
              </h1>
              <p className="text-gray-400">
                Manage your workspaces and collaborate with your team
              </p>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Workspace
            </Button>
          </div>

          {workspaces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No workspaces yet</p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
              >
                Create your first workspace
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onClick={() => handleWorkspaceClick(workspace.id)}
                />
              ))}
            </div>
          )}
        </div>

        <CreateWorkspaceDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSuccess={handleCreateWorkspace}
        />
      </AppLayout>
    </ProtectedRoute>
  );
}
