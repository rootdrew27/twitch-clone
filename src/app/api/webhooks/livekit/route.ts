import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { makeConn } from "@/lib/db";
import { StreamResult } from "@/models/definitions";
import { deleteAllStreamChats } from "@/actions/chat";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request){
  const body = await req.text();
  const headerPayload = await headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("No authorization header!", {status: 400});
  }

  const event = await receiver.receive(body, authorization);

  const db = await makeConn();

  if (event.event === "ingress_started"){
    if (!event.ingressInfo) {
      return new Response("No ingress info available on 'ingress_ended' event.", {status: 400})
    }
    await db.execute("UPDATE stream SET is_live = true WHERE ingress_id = ?", [event.ingressInfo?.ingressId])
  }

  if (event.event === "ingress_ended"){
    if (!event.ingressInfo) {
      return new Response("No ingress info available on 'ingress_ended' event.", {status: 400})
    }
    await db.execute("UPDATE stream SET is_live = false WHERE ingress_id = ?", [event.ingressInfo.ingressId]);

    // delete the chats associated with the stream

    const [results, fields] = await db.execute<StreamResult[]>("SELECT username FROM stream JOIN tc_user ON stream.user_id = tc_user.id WHERE ingress_id = ?;", [event.ingressInfo.ingressId]);
    const hostName = results[0].username;

    await deleteAllStreamChats(hostName);
  }

  await db.end()

  return new Response("OK", { status: 200})

}
