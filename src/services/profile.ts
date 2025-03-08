import { ProfileForm } from "@/data/form";
import { instance } from "@/utils/axios";
import { getHeaders } from "./services";
import { omitBy, isNil } from "lodash";

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

export const updateProfile = async (profile: ProfileForm) => {
	const headers = await getHeaders();
	const response = await instance.put(`/api/profiles/`, omitBy(profile, isNil), {
		headers,
	});

	return response.data;
};

export const getMyInterests = async () => {
	const headers = await getHeaders();
	const response = await instance.get(`/api/profiles/me/interests`, {
		headers,
	});

	return response.data.interests;
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

