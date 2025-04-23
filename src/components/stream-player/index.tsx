"use client";

import { LiveKitRoom } from "@livekit/components-react";

import { useViewerToken } from "@/hooks/user-viewer-token";
import { UserResult, StreamResult } from "@/models/definitions";
import { Video } from "./video";

interface StreamPlayerProps {
  user: UserResult;
  stream: StreamResult;
  isFollowing: boolean;
}

export const StreamPlayer = ({user, stream, isFollowing}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.username);

  if (!token || !identity || !name){
    return (
      <div>
        You are NOT allowed to watch this stream.
      </div>
    )
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="grid grid-cols-1 gap-y-0 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video 
            hostName={user.username}
            hostIdentity={`id-${user.id}`}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}