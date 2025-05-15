"use client";

import { FC } from "react";

import Image from "next/image";

import { Separator } from "radix-ui";
import { Pencil, Image as ImageIcon } from "lucide-react";
import { InfoModal } from "./info-modal";
import { cn } from "@/lib/utils";

interface InfoCardsProps {
  streamName: string;
  thumbnailUrl: string;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard: FC<InfoCardsProps> = (props) => {
  const isHost = props.viewerIdentity === `host-${props.hostIdentity}`;

  return (
    <div className="px-4 py-4">
      <div className="rounded-xl border">
        <div className={cn("flex items-center gap-x-2.5 p-4", isHost ? "" : "hidden")}>
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
          {/* Disabled to avoid incurring AWS costs during development.
          TODO: Enable for production. */}
          {/* <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
            <Image
              fill
              src={`https://twitch-clone-thumbnail-bucket.s3.us-east-2.amazonaws.com/${props.hostIdentity}`}
              alt={props.streamName}
              
            />
            </div> */}
            <div>
              <ImageIcon />
            </div>
        </div>
      </div>
    </div>
  )
}