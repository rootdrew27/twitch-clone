'use client';

import { useMediaQuery } from 'usehooks-ts';

import { useChatSidebar, ChatVariant } from '@/store/use-chat-sidebar';

import { ConnectionState, ParticipantKind } from 'livekit-client';
import {
  ReceivedChatMessage,
  useRoomContext,
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { useEffect, useMemo, useState } from 'react';

import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatList, ChatListSkeleton } from './chat-list';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { ChatCommunity } from './chat-community';
import { getCurrentChats, storeChat } from '@/actions/chat';
import { ReceivedChatMessageModel } from '@/models/mongo';

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  chatMessages: ReceivedChatMessageModel[];
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  chatMessages,
}: ChatProps) => {
  const matches = useMediaQuery('(max-width: 768px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const host = useRemoteParticipant({
    kind: ParticipantKind.INGRESS,
    identity: `id-${hostIdentity}`,
  });

  const isOnline = host && connectionState == ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<ReceivedChatMessageModel[]>(
    chatMessages || []
  );
  const { chatMessages: lkMessages, send } = useChat();
  const room = useRoomContext();

  room.on('participantDisconnected', (p) => {
    if (p.identity === host?.identity) {
      setMessages([]);
    }
  });

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const onSubmit = async () => {
    if (!send) return;

    // const newMessage = {timestamp: new Date(), from: viewerName, message: value };
    // setMessages([...messages, newMessage]);
    const newMessage = await send(value);
    await storeChat(hostName, {
      timestamp: newMessage.timestamp,
      message: newMessage.message,
      fromName: newMessage.from.name,
    });
    setValue('');

    // setMessages(messages.concat({ timestamp: newMessage.timestamp, message: newMessage.message, fromName: newMessage.from.name }))
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (lkMessages.length > 0) {
      const newMessage = lkMessages[lkMessages.length - 1];
      setMessages(
        [
          {
            timestamp: newMessage.timestamp,
            message: newMessage.message,
            fromName: newMessage.from.name,
          },
        ].concat(messages)
      );
    }
  }, [lkMessages]);

  return (
    <div className="flex w-full flex-col border-l-0 bg-background lg:border-l">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList receivedChats={messages} isHidden={isHidden} />
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
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          hostName={hostName}
          viewerName={viewerName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex w-full flex-col border-l-0 lg:border-l">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
