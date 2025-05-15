import { FC } from 'react';
import { VerifiedMark } from '@/components/verified-mark';
import { BioModal } from './bio-modal';
import { Separator } from 'radix-ui';

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const AboutCard: FC<AboutCardProps> = (props) => {
  const isHost = `host-${props.hostIdentity}` === props.viewerIdentity;

  const followedByLabel =
    props.followedByCount === 1 ? 'follower' : 'followers';

  return (
    <div className="px-4 py-4">
      <div className="flex flex-col gap-y-4 rounded-xl border bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
            About - {props.hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={props.bio} />}
        </div>
        <Separator.Root className="data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=horizontal]:mx-auto bg-white/10" />
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">
            {props.followedByCount}{' '}
          </span>{' '}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {props.bio || 'This user has not made a bio yet.'}
        </p>
      </div>
    </div>
  );
};
