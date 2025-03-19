import { ChevronLeft, Navigation2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

type ChatLayoutProps = {
  title: string;
  backUrl: string;
  isLoading?: boolean;
  handleSendMessage: (content: string) => void;
  children: React.ReactNode;
  onclick?: () => void;
};

export default function ChatLayout({
  title,
  backUrl,
  isLoading,
  children,
  handleSendMessage,
}: ChatLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="pt-safe sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="header-safe grid grid-cols-12 place-content-center text-center">
          {backUrl && (
            <Link href={backUrl} className="pl-4 pt-0.5">
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
        </div>
      </header>

      {isLoading ? (
        <main className="flex h-full w-full flex-1 items-center justify-center">
          <ThreeDot color="#bbf7d0" size="medium" />
        </main>
      ) : (
        <main className="flex-1">{children}</main>
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
    <div className="flex space-x-4 border-t border-gray-100 p-4 shadow-sm">
      <Textarea
        maxLength={150}
        className="min-h-9 resize-none"
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
      <Button onClick={handleSend}>
        <Navigation2 className="rotate-90" />
      </Button>
    </div>
  );
};
