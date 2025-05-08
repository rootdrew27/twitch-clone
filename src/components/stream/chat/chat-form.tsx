"use client";

import { FC, useState } from "react";

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"

import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
}

export const ChatForm : FC<ChatFormProps> = (props) => {

  if (props.isHidden) {
    return null;
  }

  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyANDNotFollowing = props.isChatFollowersOnly && !props.isFollowing;
  const isDisabled = props.isHidden || isDelayBlocked || isFollowersOnlyANDNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!props.value || isDisabled) return;

    if (props.isChatDelayed && !isDelayBlocked){
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        props.onSubmit();
      }, 3000)
    } else {
      props.onSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo isChatDelayed={props.isChatDelayed} isChatFollowersOnly={props.isChatFollowersOnly}/>
        <Input
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
          disabled={isDisabled}
          placeholder="Send a message."
          className="border-white/10"
        >
        </Input>
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  )
}

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  )
}