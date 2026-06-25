"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Workspace, Team, Project, Task } from "@/types";
import { workspaceApi } from "@/lib/api";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { TeamCard } from "@/components/team/TeamCard";
import { CreateTeamDialog } from "@/components/team/CreateTeamDialog";
import { ProjectCard } from "@/components/project/ProjectCard";
import { CreateProjectDialog } from "@/components/project/CreateProjectDialog";
import { TaskCard } from "@/components/task/TaskCard";
import { CreateTaskDialog } from "@/components/task/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.id as string;

  const MOCK_WORKSPACE: Workspace = {
    id: "2",
    name: "Opsync Development",
    description:
      "Main development workspace for our backend system infrastructure.",
    ownerId: "user-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const MOCK_TEAMS: Team[] = [
    {
      id: "team-1",
      name: "Backend Core",
      workspaceId: "2",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "team-2",
      name: "Frontend UI/UX",
      workspaceId: "2",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const MOCK_PROJECTS: Project[] = [
    {
      id: "proj-1",
      name: "Opsync Backend",
      teamId: "team-1",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
    {
      id: "proj-2",
      name: "Opsync Frontend",
      teamId: "team-2",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  ];

  const MOCK_TASKS: Task[] = [
    {
      id: "task-1",
      title: "Configure Docker Compose for Redis & Postgres",
      projectId: "proj-1",
      status: "todo",
      description: "",
      priority: "medium",
      assigneeId: "user-1",
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "task-2",
      title: "Fix Layout Hydration Mismatch Errors",
      projectId: "proj-2",
      status: "in_progress",
      description: "",
      priority: "medium",
      assigneeId: "user-1",
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaceData = useCallback(async () => {
    try {
      const [workspaceData, teamsData, projectsData, tasksData] =
        await Promise.all([
          workspaceApi.get<Workspace>(`/workspaces/${workspaceId}`),
          workspaceApi.get<Team[]>(`/workspaces/${workspaceId}/teams`),
          workspaceApi.get<Project[]>(`/projects`),
          workspaceApi.get<Task[]>(`/tasks`),
        ]);
      setWorkspace(workspaceData);
      setTeams(teamsData);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch {
      console.error("Failed to fetch workspace data");
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    const loadWorkspaceData = async () => {
      await fetchWorkspaceData();
    };
    loadWorkspaceData();
  }, [fetchWorkspaceData]);

  const handleCreateTeam = (team: Team) => {
    setTeams([...teams, team]);
  };

  const handleCreateProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleCreateTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AppLayout title="Workspace">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f0ff]"></div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  if (!workspace) {
    return (
      <ProtectedRoute>
        <AppLayout title="Workspace">
          <div className="text-center py-12">
            <p className="text-gray-400">Workspace not found</p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="mt-4 bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppLayout title={workspace.name}>
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="mb-4 text-gray-400 hover:text-[#00f0ff]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-white neon-text">
                {workspace.name}
              </h1>
              <p className="text-gray-400 mt-2">
                {workspace.description || "No description"}
              </p>
            </div>
            <Button
              onClick={() => setIsCreateTeamOpen(true)}
              className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Teams</h2>
            </div>
            {teams.length === 0 ? (
              <div className="text-center py-8 bg-white/5 rounded-lg border border-[#2a2a3e]">
                <p className="text-gray-400 mb-4">No teams yet</p>
                <Button
                  onClick={() => setIsCreateTeamOpen(true)}
                  className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
                >
                  Create your first team
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    onClick={() => setSelectedTeamId(team.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Projects</h2>
              <Button
                onClick={() => setIsCreateProjectOpen(true)}
                disabled={!selectedTeamId}
                className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-8 bg-white/5 rounded-lg border border-[#2a2a3e]">
                <p className="text-gray-400 mb-4">No projects yet</p>
                <Button
                  onClick={() => setIsCreateProjectOpen(true)}
                  disabled={!selectedTeamId}
                  className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
                >
                  Create your first project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProjectId(project.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Tasks</h2>
              <Button
                onClick={() => setIsCreateTaskOpen(true)}
                disabled={!selectedProjectId}
                className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
            {tasks.length === 0 ? (
              <div className="text-center py-8 bg-white/5 rounded-lg border border-[#2a2a3e]">
                <p className="text-gray-400 mb-4">No tasks yet</p>
                <Button
                  onClick={() => setIsCreateTaskOpen(true)}
                  disabled={!selectedProjectId}
                  className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
                >
                  Create your first task
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={() => {}} />
                ))}
              </div>
            )}
          </div>
        </div>

        <CreateTeamDialog
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          workspaceId={workspaceId}
          onSuccess={handleCreateTeam}
        />

        <CreateProjectDialog
          isOpen={isCreateProjectOpen}
          onClose={() => setIsCreateProjectOpen(false)}
          teamId={selectedTeamId || ""}
          onSuccess={handleCreateProject}
        />

        <CreateTaskDialog
          isOpen={isCreateTaskOpen}
          onClose={() => setIsCreateTaskOpen(false)}
          projectId={selectedProjectId || ""}
          onSuccess={handleCreateTask}
        />
      </AppLayout>
    </ProtectedRoute>
  );
}
