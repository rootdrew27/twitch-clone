import { makeConn } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

import { StreamResult } from "@/models/definitions";

export const getStream = async () => {
  const db = await makeConn();
  
  try {
    const self = await getSelf();

    if (!self || !self.username) {
      throw new Error("Not Authorized!");
    }
  
    const [streams, fields] = await db.execute<StreamResult[]>("SELECT * FROM stream WHERE user_id = ?;", [self.id]);
  
    return streams[0];
  } catch (err) {
    console.log(err);
    throw new Error("Internal Error!");
  } finally {
    await db.end();
  }
}

export const getStreamByUsername = async (username: string) => {
  const db = await makeConn();

  try {
    const [streams, fields] = await db.execute<StreamResult[]>("SELECT * FROM stream JOIN tc_user ON stream.user_id = tc_user.id WHERE username = ?;", [username]);

    return streams[0];
  } catch (err) {
    console.log(err);
    throw new Error("Internal Error!");
  } finally {
    await db.end();
  }
} 