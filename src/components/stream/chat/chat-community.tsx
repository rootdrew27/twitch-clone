"use client";

import { FC, useState, useMemo } from "react";

import { useDebounceValue } from "usehooks-ts";

import { RemoteParticipant, LocalParticipant } from "livekit-client";
import { useParticipants } from "@livekit/components-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity: FC<ChatCommunityProps> = (props) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>(value, 500)
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  }

  if (props.isHidden) {
    <div className="flex flex-1 items-center justify-center">
      <p className="text-sm text-muted-foreground">
        
      </p>
    </div>
  }

  console.log(`Participatns: ${participants}`)

  const filteredParticipants = useMemo(() => {

    const deduped = participants.reduce((acc, p) => {
      console.log(p)
      const hostAsViewer = p.identity.replace('id', 'host');
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(p)
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[])

    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    });

  }, [participants, debouncedValue])

  return (
    <div className="p-4">
      <Input 
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground p-2 hidden last:block">
          No results.
        </p>
        {filteredParticipants.map((p) => (
          <CommunityItem 
            key={p.identity}
            hostName={props.hostName}
            viewerName={props.viewerName}
            participantName={p.name || ""}
            participantIdentity={p.identity}
          />
        ))}
      </ScrollArea>
    </div>
  )
}