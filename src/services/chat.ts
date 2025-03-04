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
  fromMe: boolean;
  content: string;
  createdTime: string;
  isRead: boolean;
}

export async function listChat() {
  const headers = await getHeaders();
  const resp = await instance.get<ListChatResponse[]>(`/api/chats`, {
    headers,
  });
  console.log(resp);
  return resp.data;
}

export interface TargetUser {
  name: string;
  avatar: string;
}

export interface GetChatResponse {
  target: TargetUser;
  messages: Record<string, ChatMessage[]>;
}

export async function getChat(chatId: string) {
  const headers = await getHeaders();
  const resp = await instance.get<GetChatResponse>(`/api/chats/${chatId}`, {
    headers,
  });
  console.log(resp);
  return resp.data;
}
