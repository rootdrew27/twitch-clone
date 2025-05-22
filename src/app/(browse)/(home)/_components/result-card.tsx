import { FC } from 'react';
import Link from 'next/link';
import { HomeResult } from '@/models/definitions';
import { Thumbnail, ThumbnailSkeleton } from './thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultCardProps {
  data: HomeResult;
}

export const ResultCard: FC<ResultCardProps> = (props) => {
  return (
    <div>
      <Link href={`/${props.data.username}`}>
        <div className="h-full w-full space-y-4">
          <Thumbnail
            src={''} //{`https://twitch-clone-thumbnail-bucket.s3.us-east-2.amazonaws.com/${props.data.user_id}`}
            fallback={props.data.image_url}
            username={props.data.username}
          />
          <div className="flex w-full gap-x-2">
            <UserAvatar
              username={props.data.username}
              imageUrl={props.data.image_url}
              isLive={props.data.is_live}
              showBadge
              size="sm"
            />
            <div className="flex flex-col truncate">
              <Hint label={props.data.name}>
                <p className="overflow-hidden text-ellipsis text-sm">
                  {props.data.name}
                </p>
              </Hint>
              <p className="text-muted-foreground text-xs">
                {props.data.username}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full">
      <ThumbnailSkeleton />
      <div className="space-y-1 pt-1">
        <UserAvatarSkeleton />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
