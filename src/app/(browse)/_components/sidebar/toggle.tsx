'use client';

import { Hint } from '@/components/hint';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { useSidebar } from '@/store/use-sidebar';
import { Button } from '@/components/ui/button';

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 md:flex">
          <Hint label={label} side="right" asChild>
            <Button
              variant="outline"
              onClick={onExpand}
              className="text-muted-foreground hover:text-primary h-auto p-2"
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-bold">For You</p>
          <Hint label={label} side="right" asChild>
            <Button
              variant="outline"
              onClick={onCollapse}
              className="text-muted-foreground hover:text-primary ml-auto h-auto p-2"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export { Toggle };
