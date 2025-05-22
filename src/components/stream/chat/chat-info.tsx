import { useMemo, FC } from 'react';
import { Info } from 'lucide-react';
import { Hint } from '@/components/hint';

interface ChatInfoProps {
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const ChatInfo: FC<ChatInfoProps> = (props) => {
  const hint = useMemo(() => {
    if (props.isChatFollowersOnly && !props.isChatDelayed) {
      return 'Only followers can chat';
    }

    if (props.isChatDelayed && !props.isChatFollowersOnly) {
      return 'Messages are delayed.';
    }

    if (props.isChatDelayed && props.isChatFollowersOnly) {
      return 'Only followers can chat. Messages are delayed.';
    }
  }, [props.isChatDelayed, props.isChatFollowersOnly]);

  const label = useMemo(() => {
    if (props.isChatFollowersOnly && !props.isChatDelayed) {
      return 'Followers Only';
    }

    if (props.isChatDelayed && !props.isChatFollowersOnly) {
      return 'Slow Mode.';
    }

    if (props.isChatDelayed && props.isChatFollowersOnly) {
      return 'Followers Only & Slow Mode.';
    }
  }, [props.isChatDelayed, props.isChatFollowersOnly]);

  return (
    <div className="text-muted-foreground border-white-10 mb-2 flex w-full items-center gap-x-2 rounded-md border bg-white/5 p-2">
      <Hint label={hint!}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
