import { instance } from "@/utils/axios";
import { getHeaders } from "./services";

export type Settings = {
	id: string;
	userId: string;
	profileVisibility: string;
	contactInfoVisibility: string;
	notiNewMessage: boolean;
	notiNewConnectionRequest: boolean;
	notiNewConnectionRequestAccept: boolean;
	createdTime: string;
	updatedTime: string;
};

export const getSettings = async () => {
	const headers = await getHeaders();
	const response = await instance.get<Settings>("/api/settings/me", {
		headers,
	});
	
	return response.data;
};

export const updateSettings = async (settings: any) => {
	const headers = await getHeaders();
	console.log(settings);
	const response = await instance.patch<Settings>("/api/settings", settings, {
		headers,
	});

	return response.data;
};