export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  name: string;
  type: "direct" | "group";
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatRequest {
  name: string;
  type: "direct" | "group";
  workspaceId: string;
  participantIds: string[];
}

export interface SendMessageRequest {
  chatId: string;
  content: string;
}

export interface ChatParticipant {
  id: string;
  chatId: string;
  userId: string;
  joinedAt: string;
}
