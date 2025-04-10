import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

// TODO: Block all IPs not verified by svix: https://docs.svix.com/webhook-ips.json

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET (provided at Clerk Dashboard) to .env")
    }

    const webh = new Webhook(WEBHOOK_SECRET);

    // Verify request
    const header = await headers();
    const svix_id =  header.get("svix-id") ?? "";
    const svix_timestamp = header.get("svix-timestamp") ?? "";
    const svix_signature = header.get("svix-signature") ?? "";
    const body = await req.text();

    let msg;

    try {
        msg = webh.verify(body, {"svix-id": svix_id, "svix-timestamp": svix_timestamp, "svix-signature": svix_signature});
    } catch (err) {
        return new Response("Bad Request", { status: 400 });   
    }


    // TODO: Handle events here

    return new Response("OK", { status: 200 });

}