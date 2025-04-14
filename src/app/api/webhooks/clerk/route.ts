import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

import { makeConn } from "@/lib/db";

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

    let msg : WebhookEvent;

    try {
        msg = webh.verify(body, {"svix-id": svix_id, "svix-timestamp": svix_timestamp, "svix-signature": svix_signature}) as WebhookEvent;
    } catch (err) {
        return new Response("Bad Request", { status: 400 });   
    }

    // id int AUTO_INCREMENT,
    // username VARCHAR(32) NOT NULL UNIQUE,
    // image_url VARCHAR(500),
    // external_user_id VARCHAR(32),
    // bio VARCHAR(500),
    // created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    // updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    // TODO: Handle events here
    const { id } = msg.data; //TODO: Log id of webhook
    const eventType = msg.type
    const {data: {username, image_url, external_id}} = JSON.parse(body)
    // Valid Events:
    // user.created
    // user.deleted
    // user.updated
    const db = await makeConn();
    try{
        if (eventType === "user.created") {
            let result = await db.query("INSERT INTO tc_user (username, image_url, external_user_id) VALUES (?, ?, ?);", [username, image_url, external_id]);
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
        return new Response("OK", { status: 200 });
    }


}