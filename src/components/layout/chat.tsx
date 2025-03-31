import { Profile } from "@/services/profile";
import { ChevronLeft, InfoIcon, Navigation2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import ProfileMore from "../profile-more";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

type ChatLayoutProps = {
  title: string;
  backUrl: string;
  isLoading?: boolean;
  handleSendMessage: (content: string) => void;
  children: React.ReactNode;
  profile?: Profile;
};

export default function ChatLayout({
  title,
  backUrl,
  isLoading,
  children,
  handleSendMessage,
  profile,
}: ChatLayoutProps) {
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(`${window.visualViewport?.height}px`);
    };

    window.visualViewport?.addEventListener("resize", updateHeight);
    updateHeight();

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="flex flex-col" style={{ height: viewportHeight }}>
      <header className="pt-safe sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="header-safe flex place-content-center justify-between px-4 text-center align-middle">
          {backUrl && (
            <Link href={backUrl}>
              <ChevronLeft />
            </Link>
          )}
          {isLoading ? (
            <Skeleton className="col-span-6 col-start-5 h-4 w-[180px] self-center" />
          ) : (
            <h1 className="col-span-6 col-start-4 text-lg font-bold md:text-xl">
              {title}
            </h1>
          )}
          {profile ? (
            <ProfileMore profile={profile} visibility="connected">
              <InfoIcon className="text-muted-foreground" />
            </ProfileMore>
          ) : (
            <Skeleton className="h-6 w-6 rounded-full" />
          )}
        </div>
      </header>

      {isLoading ? (
        <main className="flex h-full w-full flex-1 items-center justify-center">
          <ThreeDot color="#bbf7d0" size="medium" />
        </main>
      ) : (
        <main className="flex-1 overflow-y-auto">{children}</main>
      )}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleSend = () => {
    onSend(message);
    setMessage("");
  };
  return (
    <div className="mb-0 border-t border-gray-100 bg-white pb-4 shadow-sm md:pb-0">
      <div className="z-10 flex gap-4 px-4 pb-4 pt-4">
        <Textarea
          maxLength={150}
          className="min-h-9 resize-none text-base"
          rows={1}
          value={message}
          onChange={handleChange}
          placeholder="Type a message ..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend} className="h-auto">
          <Navigation2 className="rotate-90" />
        </Button>
      </div>
    </div>
  );
};
