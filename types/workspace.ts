export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description: string;
  ownerId: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  roleId: string;
  joinedAt: string;
}

export interface AddMemberRequest {
  workspaceId: string;
  userId: string;
  roleId: string;
}

export interface Team {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamRequest {
  workspaceId: string;
  name: string;
  description: string;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  roleId: string;
  joinedAt: string;
}

export interface Project {
  id: string;
  teamId: string;
  name: string;
  description: string | null;
  status: "active" | "completed" | "archived";
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  teamId: string;
  name: string;
  description: string;
  status?: "active" | "completed" | "archived";
  startDate?: string;
  endDate?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: "active" | "completed" | "archived";
  startDate?: string;
  endDate?: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  projectId: string;
  title: string;
  description: string;
  status?: "todo" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  assigneeId?: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "todo" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  assigneeId?: string;
  dueDate?: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}
