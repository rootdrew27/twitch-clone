"use client";

import { FC } from "react";
import { ReceivedChatMessage } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import { ChatMessage } from "./chat-message";
import { ReceivedChatMessageModel } from "@/models/mongo";

interface ChatListProps {
  receivedChats: ReceivedChatMessageModel[];
  isHidden: boolean;
}

export const ChatList: FC<ChatListProps> = (props) => {
  if (props.isHidden || !props.receivedChats || props.receivedChats.length === 0){
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {props.isHidden ? "Chat is disabled" : "Welcome to the Chat!"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse overflow-y-auto hidden-scrollbar p-3 h-full max-h-full">
      {props.receivedChats.map((receivedChat) => (
        <ChatMessage 
          key={receivedChat.timestamp}
          data={receivedChat}
        />
      ))}
    </div>
  )
}

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  )
}