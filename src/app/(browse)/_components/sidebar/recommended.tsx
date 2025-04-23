'use client';

import { use } from 'react';

import { useSidebar } from '@/store/use-sidebar';
import { UserItem, UserItemSkeleton } from './user-item';

import { RecommendedResult } from '@/models/definitions';

export const Recommended = ({
  data,
}: {
  data: Promise<RecommendedResult[]>;
}) => {
  const { collapsed } = useSidebar((state) => state);
  const users = use(data);
  const showLabel = !collapsed && users.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground underline-offset-1">
            Recommended
          </p>
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

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
