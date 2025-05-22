'use client';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        'bg-background fixed left-0 z-50 flex h-full w-[70px] flex-col border-r md:w-60',
        collapsed && 'md:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
