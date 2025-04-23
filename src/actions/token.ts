"use server";

import { v4 } from "uuid";
import { AccessToken, VideoGrant } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostUsername: string) => {
  let self;

  self = await getSelf();

  if (!self) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserByUsername(hostUsername)

  if (!host) {
    throw new Error("Streamer Not Found!");
  }

  const isHost = self.id === host.id;

  if (!isHost) {
    const isBlocked = await isBlockedByUser(host.id)

    if (isBlocked) {
      throw new Error("User is blocked!");
    }  
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : `id-${self.id}`,
      name: self.username
    }
  )

  const videoGrant: VideoGrant = {
    room: hostUsername,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  }

  token.addGrant(videoGrant);

  return await token.toJwt()

}