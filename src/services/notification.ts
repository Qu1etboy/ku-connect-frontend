import { instance } from "@/utils/axios";
import { getHeaders } from "./services";

export async function fetchMyNotification(page: number, size: number) {
  const headers = await getHeaders();
  const resp = await instance.get(
    `/api/notifications?page=${page}&size=${size}`,
    {
      headers,
    },
  );

  console.log(resp, page, size);

  return resp.data;
}

export async function readNotifications(notificationIds: string[]) {
  const headers = await getHeaders();

  await instance.patch(
    `/api/notifications/read`,
    {
      notificationIds,
    },
    {
      headers,
    },
  );

  return notificationIds;
}
