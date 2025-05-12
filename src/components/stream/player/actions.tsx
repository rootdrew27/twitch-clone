'use client';

import { FC, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';

import { onFollow, onUnfollow } from '@/actions/follow';

import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions: FC<ActionsProps> = (props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    onFollow(props.hostIdentity)
      .then((data) => toast.success(`You are now following ${data.username}`))
      .catch(() => toast.error('Something went wrong!'));
  };

  const handleUnfollow = () => {
    onUnfollow(props.hostIdentity)
      .then((data) =>
        toast.success(`You are no longer following ${data.username}`)
      )
      .catch(() => toast.error('Something went wrong!'));
  };

  const toggleFollow = () => {
    if (!userId) {
      //Redirect User
      return router.push('/sign-in');
    }
    if (props.isHost) {
      return;
    }
    if (props.isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending}
      onClick={toggleFollow}
      variant="outline"
      size="sm"
      className={cn('w-full lg:w-auto', props.isHost && 'hidden')}
    >
      <Heart
        className={cn(
          'mr-2 h-4 w-4',
          props.isFollowing ? 'fill-white' : 'fill-none'
        )}
      />
      {props.isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
