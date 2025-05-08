"use-client";

import { FC, useState, useTransition } from "react";


import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "radix-ui";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";

interface InfoModalProps {
  initialName:string;
  initialThumbnailUrl: string | null;
}

export const InfoModal: FC<InfoModalProps> = (props) => {
  const [name, setName] = useState(props.initialName);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ field: "name", value: name})
      .then(() => toast.success("Stream Name Updated."))
      .catch(() => toast.error("Something went wrong!"));
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Stream Info
          </DialogTitle>
        </DialogHeader>
        <Separator.Root className="data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=horizontal]:mx-auto bg-white/10"/>
        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-2">
            <Label className="pb-1 pl-1">
              Name
            </Label>
            <Input 
              placeholder="Stream Name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}