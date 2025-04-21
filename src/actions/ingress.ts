"use server";

import { revalidatePath } from "next/cache";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  TrackSource,
  IngressVideoOptions,
  IngressAudioOptions,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions
} from "livekit-server-sdk";

import { makeConn } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity])

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  if (!self || !self.username || !self.id){
    throw new Error("User not found!");
  }

  const id = self.username + "-" + self.id;
  const roomName = "room:" + id;

  await resetIngresses(roomName);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: roomName,
    participantName: self.username,
    participantIdentity: id
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true;
  } else {
    options.video = new IngressVideoOptions({
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
      } 
    });
    options.audio = new IngressAudioOptions({
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: "preset",
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
      }
    })
  }

  const ingress = await ingressClient.createIngress(
    ingressType,
    options,
  )

  if (!ingress || !ingress.url || !ingress.streamKey){
    throw new Error("Failed to create Ingress!")
  }

  const db = await makeConn();

  await db.execute("UPDATE stream SET ingress_id = ?, server_url = ?, stream_key = ? WHERE user_id = ?", [ingress.ingressId, ingress.url, ingress.streamKey, self.id]);

  revalidatePath(`/u/${self.username}/keys`);

  return;

}