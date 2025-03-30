import { instance } from "@/utils/axios";
import { getHeaders } from "./services";

export interface ListChatResponse {
  chat_id: string;
  name: string;
  avatar: string;
  last_message: ChatMessage | null;
  unread_count: number;
}

export interface ChatMessage {
  id: string;
  authorId: string;
  content: string;
  isRead: boolean;
  createdTime: string;
}

export async function listChat() {
  const headers = await getHeaders();
  const resp = await instance.get<ListChatResponse[]>(`/api/chats`, {
    headers,
  });
  return resp.data;
}

export interface TargetUser {
  name: string;
  avatar: string;
  id: string;
}

export interface GetChatResponse {
  target: TargetUser;
  messages: ChatMessage[];
}

export async function getChat(chatId: string) {
  const headers = await getHeaders();
  const resp = await instance.get<GetChatResponse>(`/api/chats/${chatId}`, {
    headers,
  });
  return resp.data;
}
