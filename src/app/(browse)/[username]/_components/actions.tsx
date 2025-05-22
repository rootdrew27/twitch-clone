'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { onFollow, onUnfollow } from '@/actions/follow';
import { onBlock, onUnblock } from '@/actions/block';

interface ActionProps {
  isFollowing: boolean;
  isBlocking: boolean;
  id: string;
  username: string;
}

export const Actions = ({
  isFollowing,
  isBlocking,
  id,
  username,
}: ActionProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(id)
        .then(() => toast.success('Now following ' + username + '.'))
        .catch(() => toast.error('Something went wrong.'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(id)
        .then(() => toast.success('Unfollowed ' + username + '.'))
        .catch(() => toast.error('Something went wrong.'));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(id)
        .then(() => toast.success('Blocked ' + username + '.'))
        .catch(() => toast.error('Something went wrong!'));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(id)
        .then(() => toast.success('Now unblocked ' + username + '.'))
        .catch(() => toast.error('Something went wrong!'));
    });
  };

  const onFollowClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const onBlockClick = () => {
    if (isBlocking) {
      handleUnblock();
    } else {
      handleBlock();
    }
  };

  return (
    <>
      <Button disabled={isPending} onClick={onFollowClick}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button disabled={isPending} onClick={onBlockClick}>
        {isBlocking ? 'Unblock' : 'Block'}
      </Button>
    </>
  );
};
