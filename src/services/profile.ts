import { ProfileForm } from "@/data/form";
import { instance } from "@/utils/axios";
import { getHeaders } from "./services";

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
	const response = await instance.get(`/api/profiles?page=${page}&size=${size}`, {
		headers,
	});

	return response.data;
};

export const getProfile = async (id: string) => {
	const headers = await getHeaders();
	const response = await instance.get(`/api/profiles/${id}`, {
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

export const updateProfile = async (id: string, profile: ProfileForm) => {
	const headers = await getHeaders();
	const response = await instance.put(`/api/profiles/`, profile, {
		headers,
	});

	return response.data;
};

export const getMyInterests = async () => {
	const headers = await getHeaders();
	const response = await instance.get(`/api/profiles/me/interests`, {
		headers,
	});

	return response.data;
};

export const updateMyInterests = async (interests: string[]) => {
	const headers = await getHeaders();
	const response = await instance.put(`/api/profiles/me/interests`, interests, {
		headers,
	});

	return response.data;
};

export const getKUConnectInterests = async () => {
	const headers = await getHeaders();
	const response = await instance.get(`/api/interests`, {
		headers,
	});

	return response.data;
};

