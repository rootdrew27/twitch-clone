'use client';

import { useMediaQuery } from 'usehooks-ts';

import { useChatSidebar, ChatVariant } from '@/store/use-chat-sidebar';

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';

import { ChatHeader } from './chat-header';
import { ChatForm } from './chat-form';
import { ChatList } from './chat-list';
import { ChatCommunity } from './chat-community';

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery('(max-width: 768px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const host = useRemoteParticipant('id-' + hostIdentity);

  const isOnline = host && connectionState == ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  return (
    <div className="flex flex-col w-full bg-background border-l-0 lg:border-l">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowing={isFollowing}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatEnabled={isChatEnabled}
            isChatDelayed={isChatDelayed}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && <ChatCommunity 
        hostName={hostName}
        viewerName={viewerName}
        isHidden={isHidden}
      />}
    </div>
  );
};
