'use client';

import { Maximize, Minimize } from 'lucide-react';

import { Hint } from '@/components/hint';

interface FullScreenProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullscreenControl = ({
  isFullscreen,
  onToggle,
}: FullScreenProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} side="top" align="center" asChild>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
