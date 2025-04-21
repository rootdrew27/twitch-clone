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
    db.end();
  }
}