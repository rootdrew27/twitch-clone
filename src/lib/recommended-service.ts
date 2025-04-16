import type { User } from "@clerk/backend";
import { RowDataPacket, FieldPacket } from "mysql2/promise";
import { makeConn } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

import { UserResult } from "@/models/definitions";

export const getRecommended = async () => {
  const db = await makeConn();
  const user = await getSelf();
  let users: UserResult[];
  let fields: FieldPacket[];
  if (!user) {
    [users, fields] = await db.query<UserResult[]>(
      "SELECT id, username, image_url FROM tc_user ORDER BY created_at DESC"
    );
  } else {
    [users, fields] = await db.query<UserResult[]>(
      `SELECT id, username, image_url 
            FROM tc_user
        WHERE username != ? 
            AND
        id NOT IN (SELECT following_id FROM follow WHERE follower_id = ?)
        ORDER BY created_at DESC;`,
      [user.username, user.id]
    );
  }

  await db.end();
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve("");
    }, 1000)
  );
  console.log(users);
  return users;
};
