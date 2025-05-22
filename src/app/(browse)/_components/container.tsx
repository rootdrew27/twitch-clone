'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery('(max-width: 768px)');
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn('ml-[70px] flex-1 md:ml-60', collapsed && 'md:ml-[70px]')}
    >
      {children}
    </div>
  );
};
