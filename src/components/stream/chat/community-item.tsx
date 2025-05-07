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
        'flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/3',
        isPending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color: color }}>{props.participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block User" asChild>
          <Button
            disabled={isPending}
            variant="ghost"
            onClick={handleBlock}
            className="h-auto w-auto opacity-0 group-hover:opacity-100 text-white hover:bg-gray-300 transition"
          >
            <MinusCircle className="h-4 w-4"/>
          </Button>
        </Hint>
      )}
    </div>
  );
};
