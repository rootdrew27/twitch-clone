'use client';

import { use } from 'react';

import { useSidebar } from '@/store/use-sidebar';

import { UserItem, UserItemSkeleton } from './user-item';

import { FollowingResult } from '@/models/definitions';

export const Following = ({ data }: { data: Promise<FollowingResult[]> }) => {
  const { collapsed } = useSidebar((state) => state);

  const users = use(data);

  if (users.length === 0) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="mb-4 pl-6">
          <p className="text-muted-foreground text-sm">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {users.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.image_url}
            isLive={user.is_live}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 md:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
