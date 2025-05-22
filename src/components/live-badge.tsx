import { cn } from '@/lib/utils';

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        'border-background rounded-md border bg-rose-500 p-0.5 px-1.5 text-center text-[10px] font-semibold uppercase tracking-wide',
        className
      )}
    >
      Live
    </div>
  );
};
