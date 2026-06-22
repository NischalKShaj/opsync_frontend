"use client";

import { useState } from "react";
import { Team, CreateTeamRequest } from "@/types";
import { workspaceApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface CreateTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  onSuccess: (team: Team) => void;
}

export function CreateTeamDialog({
  isOpen,
  onClose,
  workspaceId,
  onSuccess,
}: CreateTeamDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data: CreateTeamRequest = {
        workspaceId,
        name,
        description,
      };
      const team = await workspaceApi.post<Team>("/teams", data);
      onSuccess(team);
      onClose();
      setName("");
      setDescription("");
    } catch {
      setError("Failed to create team. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Team</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Team Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Team"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
