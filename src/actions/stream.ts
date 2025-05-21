"use server";

import { revalidatePath } from "next/cache";

import { makeConn } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

import { StreamConfig } from "@/models/definitions";

export const updateStream  = async ({field, value}: StreamConfig) => {

  const db = await makeConn();

  try {
    const self = await getSelf();

    if (!self || !self.id){
      throw new Error("User not found in Database");
    }

    const values = [value, self.id]

    if (field === "is_chat_enabled") {
      await db.execute("UPDATE stream SET is_chat_enabled = ? WHERE user_id = ?;", values);
    } else if (field === "is_chat_delayed") {
      await db.execute("UPDATE stream SET is_chat_delayed = ? WHERE user_id = ?;", values);
    } else if (field === "is_chat_followers_only") {
      await db.execute("UPDATE stream SET is_chat_followers_only = ? WHERE user_id = ?;", values);
    } else if (field == "name") {
      await db.execute("UPDATE stream SET name = ? WHERE user_id = ?;", values);
    } else {
      throw new Error("Internal Error: The field parameter does not match a valid case.");
    }

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/${self.username}`); // revalidate so that every one watching the stream sees the updated settings 

    return;

  } catch (err) {
    console.log(err);
    throw new Error("Internal Error!")
  } finally {
    await db.end();
  }
}