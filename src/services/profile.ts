import { ProfileForm } from "@/data/form";
import { instance } from "@/utils/axios";
import { isNil, omitBy } from "lodash";
import { getHeaders } from "./services";

export type Profile = {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  faculty: string | null;
  department: string | null;
  year: number | null;
  createdTime: string;
  updatedTime: string;
  image: string | null;
  settings: {
    id: string;
    userId: string;
    profileVisibility: "public" | "connected" | "private";
    contactInfoVisibility: "public" | "connected" | "private";
    notiNewMessage: boolean;
    notiNewConnectionRequest: boolean;
    notiNewConnectionRequestAccept: boolean;
    createdTime: string;
    updatedTime: string;
  };
  similarity: number;
  interests: Interest[];
  line: string | null;
  facebook: string | null;
  instagram: string | null;
  other: string | null;
};

export type Interest = {
  id: string;
  name: string;
};

export const createProfile = async (profile: ProfileForm) => {
  const headers = await getHeaders();
  const response = await instance.post("/api/profiles", profile, {
    headers,
  });
  console.log("create profile", response.data);
  return response.data;
};

export const listProfiles = async (page: number, size: number) => {
  const headers = await getHeaders();
  const response = await instance.get<{ profiles: Profile[] }>(
    `/api/profiles?page=${page}&size=${size}`,
    {
      headers,
    },
  );

  return response.data;
};

export const getProfile = async (id: string) => {
  const headers = await getHeaders();
  const response = await instance.get<Profile>(`/api/profiles/${id}`, {
    headers,
  });

  return response.data;
};

export const getMyProfile = async () => {
  const headers = await getHeaders();
  const response = await instance.get(`/api/me/profile`, {
    headers,
  });

  return response.data;
};

export const updateProfile = async (profile: ProfileForm) => {
  const headers = await getHeaders();
  const response = await instance.put(
    `/api/profiles/`,
    omitBy(profile, isNil),
    {
      headers,
    },
  );

  return response.data;
};

export const getMyInterests = async () => {
  const headers = await getHeaders();
  const response = await instance.get<{ interests: Interest[] }>(
    `/api/profiles/me/interests`,
    {
      headers,
    },
  );

  return response.data.interests;
};

export const updateMyInterests = async (interests: string[]) => {
  const headers = await getHeaders();
  const response = await instance.put<{ interests: Interest[] }>(
    `/api/profiles/me/interests`,
    interests,
    {
      headers,
    },
  );

  return response.data;
};

export const getKUConnectInterests = async () => {
  const headers = await getHeaders();
  const response = await instance.get<Interest[]>(`/api/interests`, {
    headers,
  });

  return response.data;
};
