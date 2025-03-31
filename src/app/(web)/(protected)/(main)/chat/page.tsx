"use client";
import MainLayout from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { listChat } from "@/services/chat";
import { getPendingInteractions } from "@/services/interaction";
import { formatChatTime } from "@/utils/date";
import { getProfileImageUrl } from "@/utils/url";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const MAX_DISPLAY = 4;

export default function ChatListPage() {
  const router = useRouter();

  const { data: chatList, isLoading: isChatLoading } = useQuery({
    queryKey: ["listChat"],
    queryFn: () => listChat(),
  });

  const { data: pendingInteractions, isLoading: isPendingInteractionsLoading } =
    useQuery({
      queryKey: ["pendingInteractions"],
      queryFn: () => getPendingInteractions(),
    });

  const handleChatRoomClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <MainLayout
      title="Chat"
      isLoading={isChatLoading || isPendingInteractionsLoading}
    >
      <div className="flex h-full flex-col">
        {/* Friends */}
        <div className="flex items-center space-x-4 px-4 py-7">
          {/* Avatar */}
          {(pendingInteractions?.count ?? 0) > 0 ? (
            <div className="flex -space-x-5">
              {pendingInteractions?.pendingInteractions
                .slice(0, MAX_DISPLAY)
                .map((interaction, index) => (
                  <Avatar key={index} className="h-10 w-10 bg-white shadow-md">
                    <AvatarImage
                      src={getProfileImageUrl(interaction.image ?? "")}
                      alt="avatar"
                      className="object-cover"
                    />
                    <AvatarFallback>interaction.name[0]</AvatarFallback>
                  </Avatar>
                ))}
              {/* More */}
              {(pendingInteractions?.count ?? 0) > MAX_DISPLAY && (
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <p className="text-sm font-semibold text-gray-500">
                    {(pendingInteractions?.count ?? 0) > 99 + MAX_DISPLAY
                      ? "99+"
                      : `+${(pendingInteractions?.count ?? 0) - MAX_DISPLAY}`}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/ku-connect-bg-white.svg"
                alt="avatar"
                className="object-cover"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
          {/* Text */}
          {(pendingInteractions?.count ?? 0) > 0 ? (
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">
                {pendingInteractions?.count ?? 0}
              </p>
              <p className="text-base font-semibold">
                {" "}
                People want to be friend
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">1</p>
              <p className="text-base font-semibold">
                People want to be friends
              </p>
            </div>
          )}
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
                <AvatarImage
                  src={getProfileImageUrl(chat.avatar)}
                  alt={chat.name}
                  className="object-cover"
                />
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
                  <div className="flex w-full items-center justify-between">
                    <p className="max-w-[calc(100dvw-100px)] overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
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
