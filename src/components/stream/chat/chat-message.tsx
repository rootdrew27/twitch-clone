"use client";

import { FC } from "react";

import { format } from "date-fns";

import { ReceivedChatMessage } from "@livekit/components-react";
import { stringToColor } from "@/lib/utils";

interface ChatMessageProps {
  data: ReceivedChatMessage
}

export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const color = stringToColor(props.data.from?.name || "");

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40">
        {format(props.data.timestamp, "HH: MM")}
      </p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {props.data.from?.name}
          </span>:
        </p>
        <p className="text-sm">
          {props.data.message}
        </p>
      </div>
    </div>
  )
}