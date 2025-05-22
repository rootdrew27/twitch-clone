'use client';

import { FC, useState, useMemo } from 'react';

import { useDebounceValue } from 'usehooks-ts';

import { useParticipants } from '@livekit/components-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

import { CommunityItem } from './community-item';

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity: FC<ChatCommunityProps> = (props) => {
  const [value, setValue] = useState('');
  const [debouncedValue, _] = useDebounceValue<string>(value, 500);
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      if (participant.identity.includes('host')) {
        return false;
      } else {
        return participant.name
          ?.toLowerCase()
          .includes(debouncedValue.toLowerCase());
      }
    });
  }, [participants, debouncedValue]);

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea className="mt-4 gap-y-2">
        <p className="text-muted-foreground hidden p-2 text-center text-sm last:block">
          No results.
        </p>
        {filteredParticipants.map((p) => (
          <CommunityItem
            key={p.identity}
            hostName={props.hostName}
            viewerName={props.viewerName}
            participantName={p.name || ''}
            participantIdentity={p.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
