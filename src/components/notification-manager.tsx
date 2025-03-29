"use client";

import { subscribeNotification } from "@/services/notification";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { LoadingScreen } from "./loading";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function NotificationManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const mutation = useMutation({
    mutationFn: subscribeNotification,
  });

  useEffect(() => {
    // subscribe to push noti
    if ("serviceWorker" in navigator && "PushManager" in window) {
      // setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    console.log("start register service worker");
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });

    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });

    // @ts-ignore
    mutation.mutate(sub);

    console.log("finish register service worker");
  };

  if (mutation.isPending) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
