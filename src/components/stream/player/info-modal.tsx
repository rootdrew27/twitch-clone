'use-client';

import { FC, useState, useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// import { Image as ImageIcon, Trash } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from 'radix-ui';
import { updateStream } from '@/actions/stream';
import { updateThumbnail } from "@/actions/s3/thumbnail";
import { toast } from 'sonner';
// import { Hint } from '@/components/hint';

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal: FC<InfoModalProps> = (props) => {
  // const [thumbnailUrl, setThumbnailUrl] = useState(props.initialThumbnailUrl);
  // const hiddenInput = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(props.initialName);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const thumbnailEle = formElements.namedItem("thumbnail") as HTMLInputElement
    if (thumbnailEle.files?.length === 1) {
      updateThumbnail(thumbnailEle.files[0])
        .then(() => toast.success("Thumbnail updated."))
        .catch(() => toast.error("Unable to update Thumbnail."))
    }
    startTransition(() => {
      updateStream({ field: 'name', value: name })
        .then(() => toast.success("Stream Name updated."))
        .catch(() => toast.error("Unable to update Stream Name."))
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <Separator.Root className="bg-white/10 data-[orientation=horizontal]:mx-auto data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full" />
        <form 
          encType="multipart/form-data"
          onSubmit={onSubmit} 
          className="space-y-5"
        >
          <div className="pb-8 space-y-5">
            <div className="space-y-2">
              <Label className="pb-1 pl-1">Name</Label>
              <Input
                placeholder="Stream Name"
                name="streamname"
                onChange={onChange}
                value={name}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label className="pb-1 pl-1">Thumbnail</Label>
              <Input 
                type="file"
                name="thumbnail"
                className="hover:cursor-pointer"
                accept="image/*"
                size={2000000}
              />
              {/* <Hint label="Remove Thumbnail" asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </Hint> */}
            </div>
          </div>
          <div className="flex justify-between">
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
