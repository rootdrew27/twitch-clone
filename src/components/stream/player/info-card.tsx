"use client";

import { FC } from "react";

import Image from "next/image";

import { Separator } from "radix-ui";
import { Pencil } from "lucide-react";
import { InfoModal } from "./info-modal";

interface InfoCardsProps {
  streamName: string;
  thumbnailUrl: string;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard: FC<InfoCardsProps> = (props) => {
  const isHost = props.viewerIdentity === props.hostIdentity;

  return (
    <div className="px-4 py-4">
      <div className="rounded-xl border">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md p-2 h-auto w-auto">
            <Pencil className="h-5 w-5"/>
          </div>
          <div>
            <h2 className="text-sm font-semibold capitalize">
              Maximize Visibility
            </h2>
          </div>
          <InfoModal
            initialName={props.streamName}
            initialThumbnailUrl={props.thumbnailUrl}
          />
        </div>
        <Separator.Root className="data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-11/12 data-[orientation=horizontal]:mx-auto bg-white/10" />
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">
            Name
          </h3>
          <p className="text-sm font-semibold">
            {props.streamName}
          </p>
          <h3 className="text-sm text-muted-foreground mb-2">
            Thumbnail
          </h3>
          {props.thumbnailUrl && (
            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
              <Image
                fill
                src={props.thumbnailUrl}
                alt={props.streamName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}