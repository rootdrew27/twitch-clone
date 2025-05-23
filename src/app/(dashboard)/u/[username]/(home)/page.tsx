import { currentUser } from '@clerk/nextjs/server';

import { getUserWithFollowerCount } from '@/lib/user-service';

import { StreamPlayer } from '@/components/stream/player';
import { getStream } from '@/lib/stream-service';
import { getCurrentChats } from '@/actions/chat';

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const { username } = await params;

  const externalUser = await currentUser();
  const user = await getUserWithFollowerCount(username);
  const stream = await getStream();

  if (!user || !externalUser || externalUser.id !== user.clerk_id || !stream) {
    throw new Error('Unauthorized!');
  }

  const chatMessages = await getCurrentChats(user.username);

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={stream}
        livekit_url={process.env.LIVEKIT_WS_URL!}
        isFollowing={true}
        chatMessages={chatMessages}
      />
    </div>
  );
};

export default CreatorPage;
