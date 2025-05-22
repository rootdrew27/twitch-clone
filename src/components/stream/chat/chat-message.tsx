'use client';

import { FC } from 'react';

import { format } from 'date-fns';

import { stringToColor } from '@/lib/utils';
import { ReceivedChatMessageModel } from '@/models/mongo';

interface ChatMessageProps {
  data: ReceivedChatMessageModel;
}

export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const color = stringToColor(props.data.fromName || '');

  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="hidden text-sm text-white/40">
        {format(props.data.timestamp, 'HH: MM')}
      </p>
      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="whitespace-nowrap text-sm font-semibold">
          <span className="truncate" style={{ color: color }}>
            {props.data.fromName}
          </span>
          :
        </p>
        <p className="text-sm">{props.data.message}</p>
      </div>
    </div>
  );
};
