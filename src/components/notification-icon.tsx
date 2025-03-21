import { Heart, HeartHandshake } from "lucide-react";

export type NotificationType = "INTERACTION" | "NEW_CONNECTION" | "WELCOME";

type NotificationIconProps = {
  type: NotificationType;
};

export function NotificationIcon({ type }: NotificationIconProps) {
  switch (type) {
    case "INTERACTION":
      return <Heart className="my-auto mr-2 w-12" />;
    case "WELCOME":
      return <img src="/ku-connect.svg" className="my-auto mr-2 w-12" />;
    case "NEW_CONNECTION":
      return <HeartHandshake className="my-auto mr-2 w-12" />;
  }
}
