'use client';

import { ConnectionState, Track } from 'livekit-client';

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';

import { Skeleton } from '@/components/ui/skeleton';

import { OfflineVideo } from './offline-video';
import { LoadingVideo } from './loading-video';
import { LiveVideo } from './live-video';

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    { source: Track.Source.Camera },
    { source: Track.Source.Microphone },
    { source: Track.Source.ScreenShare },
  ]);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return (
    <div className="relative mx-auto aspect-video max-w-[calc(1480px)] border-b">
      {content}
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
