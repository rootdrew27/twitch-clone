import { notFound } from 'next/navigation';

import { getUserByUsername } from '@/lib/user-service';
import { isFollowingUser } from '@/lib/follow-service';
import { isBlockingUser, isBlockedByUser } from '@/lib/block-service';

import { Actions } from './_components/actions';
import { StreamPlayer } from '@/components/stream/player';
import { getStreamByUsername } from '@/lib/stream-service';
import { getCurrentChats } from '@/actions/chat';

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;

  const user = await getUserByUsername(username);
  const stream = await getStreamByUsername(username);

  if (!user || !stream) {
    return (
      <div className="flex flex-col gap-y-4">
        <p>User Not Found!</p>
      </div>
    );
  }

  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    return (
      <div className="flex flex-col gap-y-4">
        <p>User Not Found!</p>
      </div>
    );
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);

  const chatMessages = await getCurrentChats(user.username);

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={stream}
        isFollowing={isFollowing}
        livekit_url={process.env.LIVEKIT_WS_URL!}
        chatMessages={chatMessages}
      />
    </div>

  )
};

export default UserPage;
