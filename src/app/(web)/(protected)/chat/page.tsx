"use client";
import MainLayout from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { listChat } from "@/services/chat";
import { formatChatTime } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const MAX_DISPLAY = 4;

const friends = {
  total: 3,
  avatars: [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
  ],
};

export default function ChatListPage() {
  const router = useRouter();

  const { data: chatList } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => listChat(),
  });

  const handleChatRoomClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };
  return (
    <MainLayout title="Chat">
      <div className="flex h-full flex-col">
        {/* Friends */}
        <div className="flex items-center space-x-4 px-4 py-7">
          {/* Avatar */}
          <div className="flex -space-x-5">
            {friends.avatars.slice(0, MAX_DISPLAY).map((avatar, index) => (
              <Avatar key={index} className="h-10 w-10">
                <AvatarImage src={avatar} alt="avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
            {/* More */}
            {friends.total > MAX_DISPLAY && (
              <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <p className="text-sm font-semibold text-gray-500">
                  {friends.total > 99 + MAX_DISPLAY
                    ? "99+"
                    : `+${friends.total - MAX_DISPLAY}`}
                </p>
              </div>
            )}
          </div>
          {/* Text */}
          <p className="text-base font-semibold">
            {friends.total} People want to be friend
          </p>
        </div>
        {/* Chat */}
        <p className="px-2 pb-1 text-sm font-semibold">Your Friends</p>
        {chatList && chatList.length > 0 ? (
          chatList.map((chat) => (
            <div
              key={chat.chat_id}
              className="flex cursor-pointer items-center gap-4 border-b p-4 hover:bg-gray-100"
              onClick={() => handleChatRoomClick(chat.chat_id)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{chat.name}</h2>
                  {chat.last_message && (
                    <p className="text-xs text-muted-foreground">
                      {formatChatTime(new Date(chat.last_message.createdTime))}
                    </p>
                  )}
                </div>
                {chat.last_message && (
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      {chat.last_message.content}
                    </p>
                    {chat.unread_count > 0 && (
                      <div className="flex h-5 items-center justify-center rounded-3xl bg-green-600 px-1 text-xs text-white">
                        {chat.unread_count > 99 ? "99+" : chat.unread_count}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-4">
            <p className="text-xl font-semibold">You have no connections</p>
            <p className="text-sm text-muted-foreground">
              If you connect with someone, it will appear here.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
