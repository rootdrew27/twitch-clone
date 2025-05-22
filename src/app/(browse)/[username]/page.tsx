import { notFound, redirect } from 'next/navigation';

import { getUserWithFollowerCount } from '@/lib/user-service';
import { isFollowingUser } from '@/lib/follow-service';
import { isBlockedByUser } from '@/lib/block-service';

import { StreamPlayer } from '@/components/stream/player';
import { getStreamByUsername } from '@/lib/stream-service';
import { getCurrentChats } from '@/actions/chat';
import { getSelf } from '@/lib/auth-service';

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;

  const self = await getSelf();
  const user = await getUserWithFollowerCount(username);
  if (self && self.id === user.id) {
    redirect(`/u/${self.username}`);
  }
  const stream = await getStreamByUsername(username);

  if (!user || !stream) {
    notFound();
  }

  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  // const isBlocking = await isBlockingUser(user.id);

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
  );
};

export default UserPage;
