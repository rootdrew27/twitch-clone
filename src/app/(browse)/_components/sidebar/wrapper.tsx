'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { useMediaQuery } from 'usehooks-ts';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        'bg-background absolute left-0 z-50 flex h-full w-[70px] flex-col border-r',
        !collapsed && 'w-60'
      )}
    >
      {children}
    </aside>
  );
};

export { Wrapper };
