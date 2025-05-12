"use client";

import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";

import { useViewerToken } from "@/hooks/user-viewer-token";
import { UserResult, StreamResult } from "@/models/definitions";
import { Video, VideoSkeleton } from "./video";
import { Header, HeaderSkeleton } from "./header";
import { Chat, ChatSkeleton } from "../chat/chat";
import { ChatToggle } from "../chat/chat-toggle";
import { useMediaQuery } from "usehooks-ts";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { InfoCard } from "./info-card";

interface StreamPlayerProps {
  user: UserResult;
  stream: StreamResult;
  livekit_url: string;
  isFollowing: boolean;
}

export const StreamPlayer = ({user, stream, livekit_url, isFollowing}: StreamPlayerProps) => {
  const matches = useMediaQuery('(max-width: 1024px)') 
  const { token, name, identity } = useViewerToken(user.username);
  const { collapsed } = useChatSidebar();

  if (!token || !identity || !name){
    return (
      <StreamPlayerSkeleton/>
    )
  }

  return (
    <>
      {collapsed && (
        <div className="fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={livekit_url}
        className="flex flex-col lg:flex-row h-full"
      >
        <div className="lg:flex-1 overflow-y-auto hidden-scrollbar ">
            <div className="bg-black">
              <Video
                hostName={user.username}
                hostIdentity={`id-${user.id}`}
              />
            </div>
            {(collapsed || !matches) && (
              <>
                <Header 
                  hostName={user.username}
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  imageUrl={user.image_url}
                  isFollowing={isFollowing}
                  streamName={stream.name}
                />
                <InfoCard
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  streamName={stream.name}
                  thumbnailUrl={stream.thumbnail_url}
                />
              </>
            )}
        </div>

        <div className={cn("lg:max-w-80 w-full flex flex-1 min-h-0", collapsed && "hidden")}>
          <Chat 
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.is_chat_enabled}
            isChatDelayed={stream.is_chat_delayed}
            isChatFollowersOnly={stream.is_chat_followers_only}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export const StreamPlayerSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="lg:flex-1">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="lg:max-w-80 w-full flex flex-1 min-h-0">
        <ChatSkeleton />
      </div>
    </div>
  )
}