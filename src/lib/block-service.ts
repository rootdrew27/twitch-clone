import { makeConn } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { UserResult } from "@/models/definitions";

export const isBlockingUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not found by Clerk!");
  }

  if (self.id === id) {
    throw new Error("Can not block yourself!");
  }

  const db = await makeConn();
  const [users, fields] = await db.execute<UserResult[]>(
    "SELECT * FROM block WHERE blocker_id = ? AND blocked_id = ?",
    [self.id, id]
  );

  if (users.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const blockUser = async (id: string) => {
    const self = await getSelf();

    if (!self){
        throw new Error("User not found by Clerk!");
    }

    const db = await makeConn();

    const res = await db.execute("INSERT INTO block (blocker_id, blocked_id) VALUES (?, ?);", [self.id, id]);

    return true
} 

export const unblockUser = async (id: string) => {
    const self = await getSelf();

    if (!self){
        throw new Error("User not found by Clerk!");
    }

    const db = await makeConn();

    const res = await db.execute("DELETE FROM block WHERE blocker_id = ? AND blocked_id = ?;", [self.id, id]);

    return true
}