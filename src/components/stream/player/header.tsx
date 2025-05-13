'use client';

import { FC } from 'react';
import { UserIcon } from 'lucide-react';

import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';

import { ParticipantKind } from 'livekit-client'; 

import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { VerifiedMark } from '@/components/verified-mark';
import { Actions, ActionsSkeleton } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  streamName: string;
}

export const Header: FC<HeaderProps> = (props) => {
  const participants = useParticipants();
  const host = useRemoteParticipant({kind: ParticipantKind.INGRESS, identity:`id-${props.hostIdentity}`});

  const viewerCount = participants.length - 1;
  const isLive = !!host;

  const isHost = props.viewerIdentity === `host-${props.hostIdentity}`;

  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 pt-3 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={props.imageUrl}
          username={props.hostName}
          size="md"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{props.hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{props.streamName}</p>
          {isLive ? (
            <div className="flex items-center gap-x-1 text-xs font-semibold">
              <UserIcon className="h-4 w-4" />
              <p>
                {viewerCount} {viewerCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className="text-xs font-semibold text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={props.isFollowing}
        hostIdentity={props.hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 pt-3 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size="md" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
