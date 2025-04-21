import { getStream } from '@/lib/stream-service';

import { ToggleCard } from './_components/toggle-card';

const ChatPage = async () => {
  const stream = await getStream();

  if (!stream) {
    throw new Error('Stream not found!');
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="is_chat_enabled"
          label="Enable Chat"
          value={stream.is_chat_enabled}
        />
        <ToggleCard
          field="is_chat_delayed"
          label="Enable Chat Delay"
          value={stream.is_chat_delayed}
        />
        <ToggleCard
          field="is_chat_followers_only"
          label="Enable Follower Only Chat"
          value={stream.is_chat_follower_only}
        />
      </div>
    </div>
  );
};

export default ChatPage;
