import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';
import Image from 'next/image';
import { FC, Suspense } from 'react';

interface ThumbnailProps {
  src: string;
  fallback: string;
  username: string;
}

export const Thumbnail: FC<ThumbnailProps> = (props) => {
  let content;

  const { src, fallback, username }: ThumbnailProps = props;

  if (!src) {
    content = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-gray-800 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 z-50">
        <Suspense fallback={<div className="bg-white/10 rounded-xl"></div>}>
          <UserAvatar
            size="md"
            showBadge
            username={username}
            imageUrl={fallback}
            />
        </Suspense>
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:translate-y-2 rounded-md"
      />
    )
  }

  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div className="absolute inset-0 rounded-md bg-primary opacity-0 group-hover:opacity-90 z-0"/>{content}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  )
}