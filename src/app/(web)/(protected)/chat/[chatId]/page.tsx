"use client";
import ChatLayout from "@/components/layout/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage, getChat, TargetUser } from "@/services/chat";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();

  const [isChatLoading, setIsChatLoading] = useState(true);
  const [chatData, setChatData] = useState<TargetUser | null>(null);
  const [messageLog, setMessageLog] = useState<Record<string, ChatMessage[]>>(
    {},
  );

  const { mutate: GetChatData } = useMutation({
    mutationKey: ["getChat"],
    mutationFn: () => getChat(chatId),
    onSuccess: (data) => {
      console.log(data);
      setIsChatLoading(false);
      setChatData(data.target);
      setMessageLog(data.messages);
    },
    onError: (error) => {
      console.error(error);
      //TODO: handle error
    },
  });

  let prevMinute = "";

  const [loadingHistory, setLoadingHistory] = useState(false);

  const isFirstLoad = useRef(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      if (chatContainerRef.current.scrollTop === 0 && !loadingHistory) {
        setLoadingHistory(true);

        // Simulate loading older messages
        setTimeout(() => {
          setLoadingHistory(false);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    GetChatData();
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      // Scroll instantly on first load
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      isFirstLoad.current = false;
    } else {
      // Smooth scroll for new messages
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageLog]);

  return (
    <ChatLayout
      title={chatData?.name || ""}
      backUrl="/chat"
      isLoading={isChatLoading}
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
        {Object.entries(messageLog).map(([date, messages]) => {
          return (
            <div key={date} className="space-y-2">
              <div className="sticky top-0 z-10 flex justify-center py-2">
                <p className="rounded-xl bg-gray-100 px-2 py-1 text-center text-xs text-gray-500 opacity-50">
                  {date}
                </p>
              </div>
              {messages.map((message) => {
                if (message.fromMe) {
                  return (
                    <div
                      key={message.id}
                      className="flex justify-end space-x-2"
                    >
                      <div className="flex flex-col self-end">
                        {message.isRead && (
                          <p className="text-xs text-gray-500">Read</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {message.createdTime.slice(11, 16)}
                        </p>
                      </div>
                      <div className="mt-1 rounded-xl rounded-tr-none bg-green-500 p-2">
                        <p className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  const messageMinute = message.createdTime.slice(14, 16);
                  const displayAvatar = prevMinute !== messageMinute;
                  prevMinute = messageMinute;
                  return (
                    <div key={message.id} className="flex space-x-2">
                      {displayAvatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={chatData?.avatar} />
                          <AvatarFallback>{chatData?.name[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="min-w-8" />
                      )}
                      <div className="mt-1 rounded-xl rounded-tl-none bg-gray-100 p-2">
                        <p className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </p>
                      </div>
                      <p className="self-end text-xs text-gray-500">
                        {message.createdTime.slice(11, 16)}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ChatLayout>
  );
}
