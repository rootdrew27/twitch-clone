'use client';

import { useTransition, FC } from 'react';
import { toast } from 'sonner';
import { MinusCircle } from 'lucide-react';

import { Hint } from '@/components/hint';
import { onBlock } from '@/actions/block';
import { cn, stringToColor } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantIdentity: string;
  participantName: string;
}

export const CommunityItem: FC<CommunityItemProps> = (props) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(props.participantName);
  const isSelf = props.participantName === props.viewerName;
  const isHost = props.viewerName === props.hostName;

  const handleBlock = () => {
    if (!props.participantName || isSelf || isHost) return;

    startTransition(() => {
      onBlock(props.participantIdentity)
        .then(() => toast.success(`Blocked ${props.participantName}`))
        .catch(() => toast.error('Something went wrong!'));
    });
  };

  return (
    <div
      className={cn(
        'hover:bg-white/3 flex w-full items-center justify-between rounded-md p-2 text-sm',
        isPending && 'pointer-events-none opacity-50'
      )}
    >
      <p style={{ color: color }}>{props.participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block User" asChild>
          <Button
            disabled={isPending}
            variant="ghost"
            onClick={handleBlock}
            className="h-auto w-auto text-white opacity-0 transition hover:bg-gray-300 group-hover:opacity-100"
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
