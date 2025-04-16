import { currentUser } from "@clerk/nextjs/server";
import mysql, { RowDataPacket } from "mysql2/promise";

import { UserResult } from "@/models/definitions";

import { connOpts } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser(); // <- Dynamic API

  if (!self || !self.username) {
    return null;
  }

  const db = await mysql.createConnection(connOpts);
  const user = (
    await db.query<UserResult[]>("SELECT * FROM tc_user WHERE username = ?", [
      self.username,
    ])
  )[0][0];
  await db.end();

  if (!user) {
    throw new Error("User not found in database!");
  }

  return user;
};
