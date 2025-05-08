"use client";

import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";

import { useViewerToken } from "@/hooks/user-viewer-token";
import { UserResult, StreamResult } from "@/models/definitions";
import { Video } from "./video";
import { Chat } from "../chat/chat";
import { ChatToggle } from "../chat/chat-toggle";
import { useMediaQuery } from "usehooks-ts";

interface StreamPlayerProps {
  user: UserResult;
  stream: StreamResult;
  livekit_url: string;
  isFollowing: boolean;
}

export const StreamPlayer = ({user, stream, livekit_url, isFollowing}: StreamPlayerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)")
  const { token, name, identity } = useViewerToken(user.username);
  const { collapsed } = useChatSidebar();

  if (!token || !identity || !name){
    return (
      <div>
        You are NOT allowed to watch this stream.
      </div>
    )
  }

  console.log(matches)

  return (
    <>
      {collapsed && (
        <div className="hidden md:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={livekit_url}
        className={cn("flex flex-col lg:flex-row h-full", collapsed && "")}
      >
        <div className={cn("lg:flex-1 lg:w-full hidden-scrollbar h-fit", matches && "")}>
          <div className="bg-black h-fit">
            <Video
              hostName={user.username}
              hostIdentity={`id-${user.id}`}
            />
          </div>
        </div>
        <div className={cn("lg:max-w-80 w-full flex flex-1 min-h-0", collapsed && "hidden", matches && "")}>
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