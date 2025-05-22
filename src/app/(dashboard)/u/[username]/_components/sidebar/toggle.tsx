'use client';

import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 md:flex">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="outline" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 md:flex">
          <p className="text-primary font-semibold">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="outline"
              className="h-auto p-2"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};
