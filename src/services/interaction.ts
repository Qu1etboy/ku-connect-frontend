import { instance } from "@/utils/axios";
import { getHeaders } from "./services";

export interface UpdateInteractionRequest {
  toUserId: string;
  liked: boolean;
}

export interface UpdateInteractionResponse {
  connected: boolean;
}

export const updateInteraction = async (payload: UpdateInteractionRequest) => {
  const headers = await getHeaders();
  const response = await instance.post<UpdateInteractionResponse>(
    "/api/interactions",
    payload,
    {
      headers,
    },
  );
  return response.data;
};

export interface PendingInteractions {
  userId: string;
  displayName: string | null;
  image: string | null;
}

export interface GetPendingInteractionsResponse {
  pendingInteractions: PendingInteractions[];
  count: number;
}

export const getPendingInteractions = async () => {
  const headers = await getHeaders();
  const response = await instance.get<GetPendingInteractionsResponse>(
    "/api/interactions/pending",
    {
      headers,
    },
  );
  return response.data;
};
