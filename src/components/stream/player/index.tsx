'use client';

import { LiveKitRoom } from '@livekit/components-react';

import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';

import { useViewerToken } from '@/hooks/user-viewer-token';
import { UserResult, StreamResult } from '@/models/definitions';
import { Video, VideoSkeleton } from './video';
import { Header, HeaderSkeleton } from './header';
import { Chat, ChatSkeleton } from '../chat/chat';
import { ChatToggle } from '../chat/chat-toggle';
import { useMediaQuery } from 'usehooks-ts';
import { InfoCard } from './info-card';
import { AboutCard } from './about-card';
import { ReceivedChatMessageModel } from '@/models/mongo';
interface StreamPlayerProps {
  user: UserResult;
  stream: StreamResult;
  livekit_url: string;
  isFollowing: boolean;
  chatMessages: ReceivedChatMessageModel[];
}

export const StreamPlayer = ({
  user,
  stream,
  livekit_url,
  isFollowing,
  chatMessages,
}: StreamPlayerProps) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { token, name, identity } = useViewerToken(user.username);
  const { collapsed } = useChatSidebar();

  if (!token || !identity || !name) {
    return <StreamPlayerSkeleton />;
  } else {
    return (
      <>
        {collapsed && (
          <div className="fixed right-2 top-[100px] z-50">
            <ChatToggle />
          </div>
        )}
        <LiveKitRoom
          token={token}
          serverUrl={livekit_url}
          connect={true}
          className="relative flex h-full flex-col lg:flex-row"
        >
          <div className="hidden-scrollbar overflow-y-auto lg:flex-1">
            <div className="bg-black">
              <Video hostName={user.username} hostIdentity={`id-${user.id}`} />
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
                <AboutCard
                  hostName={user.username}
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  bio={user.bio}
                  followedByCount={user.follower_count!}
                />
              </>
            )}
          </div>

          <div
            className={cn(
              'flex min-h-0 w-full flex-1 lg:max-w-80',
              collapsed && 'hidden'
            )}
          >
            <Chat
              viewerName={name}
              hostName={user.username}
              hostIdentity={user.id}
              isFollowing={isFollowing}
              isChatEnabled={stream.is_chat_enabled}
              isChatDelayed={stream.is_chat_delayed}
              isChatFollowersOnly={stream.is_chat_followers_only}
              chatMessages={chatMessages}
            />
          </div>
        </LiveKitRoom>
      </>
    );
  }
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="lg:flex-1">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="flex min-h-0 w-full flex-1 lg:max-w-80">
        <ChatSkeleton />
      </div>
    </div>
  );
};
