"use client";
import ChatLayout from "@/components/layout/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";

const chatData = {
  id: 1,
  avatar: "https://i.pravatar.cc/150?img=1",
  name: "John Doe",
};

const messageLog = [
  {
    createdDate: "2025-03-01",
    messages: [
      {
        id: 1,
        sender: "John Doe",
        message: "Hello there. My name is John Doe. Nice to meet you.",
        createAt: "2025-03-03T01:00:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 2,
        sender: "John Doe",
        message: "How are you?",
        createAt: "2025-03-03T01:00:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 3,
        sender: "John Doe",
        message: "Are you there?",
        createAt: "2025-03-03T01:01:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 4,
        sender: "John Doe",
        message: "I need your help",
        createAt: "2025-03-03T01:02:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 5,
        sender: "John Doe",
        message: "Please reply",
        createAt: "2025-03-03T01:02:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 6,
        sender: "Me",
        message: "What's up?",
        createAt: "2025-03-03T01:13:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 7,
        sender: "John Doe",
        message: "I need your help\n Please call me\n 0123456789",
        createAt: "2025-03-03T01:14:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 8,
        sender: "John Doe",
        message:
          "When I walked you home That's when I nearly said it But then said Forget it and froze Do you remember? You probably don't 'Cause the sparks in the sky Took a hold of your eyes while we spoke",
        createAt: "2025-03-03T01:14:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 9,
        sender: "Me",
        message:
          "Yesterday, drank way too much\nAnd stayed up too late\nStarted to write what I wanna say\nDeleted the message, but I still remember it said",
        createAt: "2025-03-03T01:15:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 10,
        sender: "Me",
        message: "I'm sorry, I'm not interested",
        createAt: "2025-03-03T01:16:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 11,
        sender: "John Doe",
        message: "Nooooo",
        createAt: "2025-03-03T01:16:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 12,
        sender: "Me",
        message: "I'm sorry",
        createAt: "2025-03-03T20:10:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
      {
        id: 13,
        sender: "Me",
        message: "T^T",
        createAt: "2025-03-03T20:10:00Z",
        readAt: "2025-03-03T01:00:00Z",
      },
    ],
  },
  {
    createdDate: "2025-03-02",
    messages: [
      {
        id: 14,
        sender: "John Doe",
        message: "000000000000000000 \n\n\n\n\n\n\n\n 1",
        createAt: "2025-03-04T09:10:00Z",
        readAt: null,
      },

      {
        id: 15,
        sender: "Me",
        message: "22222222222222\n\n\n\n\n\n\n\n3",
        createAt: "2025-03-04T09:10:00Z",
        readAt: null,
      },

      {
        id: 16,
        sender: "Me",
        message: "444444444444444\n\n\n\n\n\n\n\n5",
        createAt: "2025-03-04T09:10:00Z",
        readAt: null,
      },
      {
        id: 17,
        sender: "Me",
        message: "666666666666666\n\n\n\n\n\n\n\n7",
        createAt: "2025-03-04T09:10:00Z",
        readAt: null,
      },
      {
        id: 18,
        sender: "Me",
        message: "8888888888888888\n\n\n\n\n\n\n\n9",
        createAt: "2025-03-04T09:10:00Z",
        readAt: null,
      },
    ],
  },
];

export default function ChatPage() {
  // const { chatId } = useParams<{ chatId: string }>();
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
    <ChatLayout title={chatData.name} backUrl="/chat">
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
        {messageLog.map((log) => {
          return (
            <div key={log.createdDate} className="space-y-2">
              <div className="sticky top-0 z-10 flex justify-center py-2">
                <p className="rounded-xl bg-gray-100 px-2 py-1 text-center text-xs text-gray-500 opacity-50">
                  {log.createdDate}
                </p>
              </div>
              {log.messages.map((message) => {
                if (message.sender === "Me") {
                  return (
                    <div
                      key={message.id}
                      className="flex justify-end space-x-2"
                    >
                      <div className="flex flex-col self-end">
                        {message.readAt !== null && (
                          <p className="text-xs text-gray-500">Read</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {message.createAt.slice(11, 16)}
                        </p>
                      </div>
                      <div className="mt-1 rounded-xl rounded-tr-none bg-green-500 p-2">
                        <p className="whitespace-pre-wrap text-sm">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  );
                }

                const messageMinute = message.createAt.slice(14, 16);
                const displayAvatar = prevMinute !== messageMinute;
                prevMinute = messageMinute;
                return (
                  <div key={message.id} className="flex space-x-2">
                    {displayAvatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={chatData.avatar} />
                        <AvatarFallback>{chatData.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="min-w-8" />
                    )}
                    <div className="mt-1 rounded-xl rounded-tl-none bg-gray-100 p-2">
                      <p className="whitespace-pre-wrap text-sm">
                        {message.message}
                      </p>
                    </div>
                    <p className="self-end text-xs text-gray-500">
                      {message.createAt.slice(11, 16)}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ChatLayout>
  );
}
