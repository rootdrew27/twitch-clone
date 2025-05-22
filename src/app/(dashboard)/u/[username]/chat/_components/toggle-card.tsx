'use client';

import { useTransition } from 'react';

import { toast } from 'sonner';

import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';

import { updateStream } from '@/actions/stream';

import type { FieldType } from '@/models/definitions';

interface ToggleCardProps {
  field: FieldType;
  label: string;
  value: boolean;
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = async (checked: boolean) => {
    startTransition(() => {
      updateStream({ field: field, value: checked })
        .then(() => toast.success('Chat settings updated!'))
        .catch(() => toast.error('Error updating settings!'));
    });
  };

  return (
    <div className="bg-muted rounded-xl p-6">
      <div className="flex items-center justify-between">
        <p className="shrink-0 font-semibold">{label}</p>
        <div className="space-y-3">
          <Switch
            checked={value}
            onCheckedChange={(checked: boolean) => onChange(checked)}
            disabled={isPending}
            className="h-4 w-7"
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="w-full rounded-xl p-8" />;
};
