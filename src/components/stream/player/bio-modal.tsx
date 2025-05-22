'use client';

import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useState,
  useTransition,
} from 'react';
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal: FC<BioModalProps> = (props) => {
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => toast.success('User bio updated.'))
        .catch(() => toast.error('Something went wrong!'));
    });
  };

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <textarea
            placeholder="Something about you..."
            onChange={onTextAreaChange}
            value={value}
            disabled={isPending}
            className="w-full resize-none rounded-md border border-white/10 p-2"
          />
          <div className="flex items-center justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
