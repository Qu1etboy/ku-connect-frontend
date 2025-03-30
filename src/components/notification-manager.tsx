"use client";

import { subscribeNotification } from "@/services/notification";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

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
  const [isOpen, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: subscribeNotification,
  });

  useEffect(() => {
    // subscribe to push noti
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log(
        "[notification manager] notification permission =",
        Notification.permission,
      );
      registerServiceWorker();
      if (isUserNotChecked()) {
        openRequestNotification();
      }
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      console.log("[notification manager] start register service worker");
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

      console.log("[notification manager] finish register service worker");
    } catch (error) {
      console.error(error);
    }
  };

  const openRequestNotification = () => {
    setOpen(true);
  };

  const isUserNotChecked = () => {
    return (
      localStorage.getItem("noti_permission_checked") !== "true" &&
      Notification.permission !== "granted"
    );
  };

  const requestNotification = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notifications enabled!");
    } else {
      console.log("User denied notifications.");
    }

    localStorage.setItem("noti_permission_checked", "true");
    setOpen(false);
  };

  const onCancel = () => {
    localStorage.setItem("noti_permission_checked", "true");
    setOpen(false);
  };

  if (mutation.isPending) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Allow Push Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Setup push notification to be send to your devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>No</AlertDialogCancel>
            <AlertDialogAction onClick={requestNotification}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {children}
    </>
  );
}
