import { RowDataPacket } from "mysql2/promise";
import { makeConn } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { UserResult } from "@/models/definitions";

export const isFollowingUser = async (id: string) => {
  const db = await makeConn();
  try {
    const self = await getSelf();

    if (self.id === id){
        return true;
    }

    const [results, fields] = await db.execute<RowDataPacket[]>("SELECT COUNT(*) AS 'is_following' FROM follow WHERE follower_id = ? AND following_id = ?", [self.id, parseInt(id)]);

    await db.end();

    if (results[0].is_following == false){    
        return false;
    }

    return true;

  } catch (err) {
    await db.end();
    return false;
  }
};

export const followUser = async (id: string) => {
  const db = await makeConn(true);
  const self = await getSelf();

  // Check if user trying to follow themselves
  if (self.id === id){
    await db.end();
    throw new Error("Can not follow yourself!")
  }

  const [results, fields] = await db.query<RowDataPacket[][]>("INSERT INTO follow (follower_id, following_id) VALUES (?, ?); SELECT * FROM tc_user WHERE id = ?;", [parseInt(self.id), parseInt(id), parseInt(id)]);

  await db.end();
  return results[1][0];
};


export const unfollowUser = async (id: string) => {
  const db = await makeConn(true);
  
  const curUser = await getSelf();

  if (curUser.id === id){
    throw new Error("Cannot unfollow yourself.");
  }

  const [result, fields] = await db.query<RowDataPacket[][]>(["DELETE FROM follow WHERE follower_id = ? AND following_id = ?;", "SELECT * FROM tc_user WHERE id = ?"].join(' '), [parseInt(curUser.id), parseInt(id), parseInt(id)]);

  db.end();
  return result[1][0];
}