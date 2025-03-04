import { instance } from "@/utils/axios";
import { getHeaders } from "./services";

export interface Chat {
  chat_id: string;
  name: string;
  avatar: string;
  last_message: ChatMessage | null;
  unread_count: number;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  authorId: string;
  content: string;
  createdTime: string;
  updatedTime: string;
  isRead: boolean;
}

export async function listChat() {
  const headers = await getHeaders();
  const resp = await instance.get<Chat[]>(`/api/chats`, {
    headers,
  });
  console.log(resp);
  return resp.data;
}
