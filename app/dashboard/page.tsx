"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { WorkspaceCard } from "@/components/workspace/WorkspaceCard";
import { CreateWorkspaceDialog } from "@/components/workspace/CreateWorkspaceDialog";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban, Users, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";

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
        <div className="space-y-6 px-6">
          {/* Section Header */}
          <div>
            <div className="inline-block filter drop-shadow-[0_0_12px_rgba(0,240,255,0.25)] drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
              <h2 className="text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e026ce] via-[#9d4edd] to-[#00f0ff] tracking-tight">
                Your Workspaces
              </h2>
            </div>
            <p className="text-gray-400 mt-2 text-lg">
              Manage your workspaces and collaborate with your team
            </p>
          </div>
          {/* First Row - Stats Cards with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Projects */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-xl p-6 border border-[#2a2a3e] hover:border-[#00f0ff]/50 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                  <FolderKanban className="w-7 h-7 text-[#00f0ff]" />
                </div>

                <div>
                  <p className="text-3xl font-bold text-white">12</p>
                  <p className="text-gray-400 text-sm">Total Projects</p>
                </div>
              </div>
            </div>

            {/* Members */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-xl p-6 border border-[#2a2a3e] hover:border-[#ff00ff]/50 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#ff00ff]/10 border border-[#ff00ff]/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.15)]">
                  <Users className="w-7 h-7 text-[#ff00ff]" />
                </div>

                <div>
                  <p className="text-3xl font-bold text-white">48</p>
                  <p className="text-gray-400 text-sm">Team Members</p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-xl p-6 border border-[#2a2a3e] hover:border-[#00ff88]/50 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                  <CheckCircle className="w-7 h-7 text-[#00ff88]" />
                </div>

                <div>
                  <p className="text-3xl font-bold text-white">156</p>
                  <p className="text-gray-400 text-sm">Completed Tasks</p>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-xl p-6 border border-[#2a2a3e] hover:border-[#ffaa00]/50 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#ffaa00]/10 border border-[#ffaa00]/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,170,0,0.15)]">
                  <Clock className="w-7 h-7 text-[#ffaa00]" />
                </div>

                <div>
                  <p className="text-3xl font-bold text-white">23</p>
                  <p className="text-gray-400 text-sm">Pending Tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Workspace Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: "/blue.webp",
                title: "Opsync Development",
                description: "Main development workspace",
                projects: 12,
                members: 5,
                color: "text-cyan-400",
                border: "hover:border-cyan-400/70",
              },
              {
                image: "/violet.webp",
                title: "QA Testing",
                description: "Testing and bug tracking",
                projects: 8,
                members: 3,
                color: "text-pink-400",
                border: "hover:border-pink-500/70",
              },
              {
                image: "/green.webp",
                title: "Design Team",
                description: "UI/UX collaboration workspace",
                projects: 6,
                members: 4,
                color: "text-green-400",
                border: "hover:border-emerald-400/70",
              },
            ].map((workspace) => (
              <div
                key={workspace.title}
                className={`bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-xl overflow-hidden border border-[#2a2a3e]   ${workspace.border} transition-all duration-300 cursor-pointer hover:-translate-y-1`}
              >
                <div className="relative h-72 overflow-hidden rounded-xl">
                  <Image
                    src={workspace.image}
                    alt={workspace.title}
                    fill
                    className="object-cover"
                  />

                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white">
                      {workspace.title}
                    </h3>

                    <p className="text-gray-300 text-sm mt-2">
                      {workspace.description}
                    </p>

                    <div className="flex justify-between mt-4 text-sm">
                      <span className={workspace.color}>
                        {workspace.projects} Projects
                      </span>

                      <span className="text-gray-300">
                        {workspace.members} Members
                      </span>
                    </div>

                    <Button
                      className="w-full mt-4 bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60"
                      variant="outline"
                    >
                      Open Workspace
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="relative rounded-xl border border-[#1e1e2f] overflow-hidden bg-[#07070c] p-6 font-sans">
              {/* Ambient Background Glows matching the previous component */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(191,0,255,0.1),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(0,240,255,0.06),transparent_40%)] pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-base font-semibold text-white mb-6 tracking-wide">
                  Recent Activity
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-white tracking-wide">
                      Alice updated project requirements
                    </p>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      2 hours ago
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white tracking-wide">
                      Mark created a new bug report
                    </p>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      4 hours ago
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white tracking-wide">
                      Sarah uploaded design assets
                    </p>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      6 hours ago
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white tracking-wide">
                      David completed authentication module
                    </p>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      Yesterday
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="relative rounded-xl border border-[#1e1e2f] overflow-hidden bg-[#07070c] p-6 font-sans">
              {/* Ambient Background Glows */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(191,0,255,0.1),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(0,240,255,0.06),transparent_40%)] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
                {/* Left Side: Team Members List */}
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-[#a855f7]" />
                    <h3 className="text-base font-semibold text-white tracking-wide">
                      Team Members
                    </h3>
                  </div>

                  {/* Members Rows */}
                  <div className="space-y-4">
                    {/* Alice */}
                    <div className="grid grid-cols-[auto_1fr_100px] items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-[#4d31cb] to-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white tracking-wide">
                          Alice Johnson
                        </p>
                        <p className="text-xs text-gray-400 font-normal">
                          Frontend Developer
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                        <span className="text-[#00f0ff] text-xs font-medium">
                          Online
                        </span>
                      </div>
                    </div>

                    {/* Mark */}
                    <div className="grid grid-cols-[auto_1fr_100px] items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-[#c026d3] to-[#ec4899] shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                        M
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white tracking-wide">
                          Mark Wilson
                        </p>
                        <p className="text-xs text-gray-400 font-normal">
                          QA Engineer
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                        <span className="text-[#00f0ff] text-xs font-medium">
                          Online
                        </span>
                      </div>
                    </div>

                    {/* Sarah */}
                    <div className="grid grid-cols-[auto_1fr_100px] items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-[#059669] to-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        S
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white tracking-wide">
                          Sarah Chen
                        </p>
                        <p className="text-xs text-gray-400 font-normal">
                          UI/UX Designer
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b]" />
                        <span className="text-[#f59e0b] text-xs font-medium">
                          Away
                        </span>
                      </div>
                    </div>

                    {/* David */}
                    <div className="grid grid-cols-[auto_1fr_100px] items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-[#047857] to-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        D
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white tracking-wide">
                          David Park
                        </p>
                        <p className="text-xs text-gray-400 font-normal">
                          Product Designer
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <div className="w-2 h-2 rounded-full bg-gray-500" />
                        <span className="text-gray-400 text-xs font-medium">
                          Offline
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Dashboard Illustration */}
                {/* Solved issue in image_339007.png by removing dark vignettes and targeting screen blend on the wrapper */}
                <div className="flex justify-center items-center h-full mix-blend-screen bg-transparent">
                  <div className="relative w-full max-w-[340px] aspect-square filter drop-shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                    <Image
                      src="/illustration.png"
                      alt="Workspace Illustration"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
