"use client";
import ChatLayout from "@/components/layout/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/contexts/socket";
import { useUser } from "@/hooks/user";
import { ChatMessage, getChat, TargetUser } from "@/services/chat";
import { getProfile } from "@/services/profile";
import { getTime } from "@/utils/date";
import { getProfileImageUrl } from "@/utils/url";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { socket } = useSocket();
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useUser();

  const [isChatLoading, setIsChatLoading] = useState(true);
  const [chatData, setChatData] = useState<TargetUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  const { mutate: GetChatData } = useMutation({
    mutationKey: ["getChat"],
    mutationFn: () => getChat(chatId),
    onSuccess: (data) => {
      setIsChatLoading(false);
      setChatData(data.target);
      setMessages(data.messages);
    },
    onError: (error) => {
      console.error(error);
      //TODO: handle error
    },
  });

  const { data: profileData } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(chatData?.id || ""),
    enabled: !!chatData,
  });

  let prevMinute = "";
  let prevDate = "";

  const [loadingHistory, setLoadingHistory] = useState(false);
  // const [isScrolling, setIsScrolling] = useState(false);

  const isFirstLoad = useRef(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      // setIsScrolling(true);
      // setTimeout(() => {
      //   setIsScrolling(false);
      // }
      // , 1000);
      if (chatContainerRef.current.scrollTop === 0 && !loadingHistory) {
        setLoadingHistory(true);

        // TODO: fetch more history
        setTimeout(() => {
          setLoadingHistory(false);
        }, 1500);
      }
    }
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      chatId: chatId,
      content: content,
      authorId: user?.userId,
    };
    socket?.emit("send_message", newMessage);
  };

  useEffect(() => {
    if (!socket) return;
    // Window focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsWindowFocused(true);
      } else {
        setIsWindowFocused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Socket events
    const handleReceiveMessage = (newMessage: ChatMessage) => {
      console.log(
        user?.name,
        user?.userId === newMessage.authorId ? "Sent" : "Received",
        newMessage.content,
      );
      setMessages((prev) => [...prev, newMessage]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleReadMessage = (messageId: string) => {
      console.log("handleReadMessage", messageId);
      setMessages((prev) =>
        prev.map((message) => {
          return message.id === messageId
            ? { ...message, isRead: true }
            : message;
        }),
      );
    };
    GetChatData();

    socket.emit("join_chat", chatId);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("read_message", handleReadMessage);

    return () => {
      socket.off("receive_message");
      socket.off("read_message");
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // socket.disconnect();
    };
  }, [socket, GetChatData, chatId, user?.name, user?.userId]);

  useEffect(() => {
    if (isFirstLoad.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      isFirstLoad.current = false;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    console.log("messages", messages[messages.length - 1]);
  }, [messages]);

  useEffect(() => {
    if (isWindowFocused) {
      socket?.emit("mark_as_read", chatId, user?.userId);
    }
  }, [chatId, isWindowFocused, user?.userId, messages]);

  // TODO: add scroll to bottom button
  return (
    <ChatLayout
      title={chatData?.name || ""}
      backUrl="/chat"
      isLoading={isChatLoading}
      handleSendMessage={handleSendMessage}
      profile={profileData}
    >
      <div
        className="h-[calc(100vh-10rem)] overflow-y-auto px-3"
        onScroll={handleScroll}
        ref={chatContainerRef}
      >
        {loadingHistory && (
          <div className="flex justify-center p-2 transition-all duration-300">
            <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-500 border-t-transparent"></div>
          </div>
        )}
        {messages.map((message) => {
          const displayDate = prevDate !== message.createdTime.slice(0, 10);
          prevDate = message.createdTime.slice(0, 10);
          if (message.authorId === user?.userId) {
            return (
              <>
                <DateDivider
                  date={message.createdTime.slice(0, 10)}
                  visible={displayDate}
                  // sticky={isScrolling && displayDate}
                />
                <div key={message.id} className="flex justify-end space-x-2">
                  <div className="flex flex-col self-end">
                    {message.isRead && (
                      <p className="text-xs text-gray-500">Read</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {getTime(new Date(message.createdTime))}
                    </p>
                  </div>
                  <div className="mt-2 rounded-xl rounded-tr-none bg-green-500 p-2">
                    <p className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </p>
                  </div>
                </div>
              </>
            );
          }
          const messageMinute = message.createdTime.slice(14, 16);
          const displayAvatar = prevMinute !== messageMinute;
          prevMinute = messageMinute;
          return (
            <>
              <DateDivider
                date={message.createdTime.slice(0, 10)}
                visible={displayDate}
                // sticky={isScrolling && displayDate}
              />
              <div key={message.id} className="flex space-x-2">
                {displayAvatar ? (
                  <Avatar className="mt-2 h-8 w-8">
                    <AvatarImage
                      src={getProfileImageUrl(chatData?.avatar || "")}
                    />
                    <AvatarFallback>{chatData?.name[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="min-w-8" />
                )}
                <div className="mt-2 rounded-xl rounded-tl-none bg-gray-100 p-2">
                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                </div>
                <p className="self-end text-xs text-gray-500">
                  {getTime(new Date(message.createdTime))}
                </p>
              </div>
            </>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ChatLayout>
  );
}

// TODO: Hide date divider when scrolling

const DateDivider = ({
  date,
  visible,
  sticky = false,
}: {
  date: string;
  visible: boolean;
  sticky?: boolean;
}) => {
  if (!visible) return null;
  return (
    <div
      className={`top-0 z-10 flex justify-center py-2 ${sticky ? "sticky" : ""}`}
    >
      <p className="rounded-xl bg-gray-100 px-2 py-1 text-center text-xs text-gray-500 opacity-50">
        {date}
      </p>
    </div>
  );
};
