import { SearchResult } from "@/models/definitions";
import { getSelf } from "./auth-service";
import { makeConn } from "./db";
import { RowDataPacket } from "mysql2";


export const getSearchResults = async (term?: string) => {
  let userId;

  try {
    const self = await getSelf()
    if (!self) {
      userId = null
    } else {
      userId = self.id;
    }
  } catch {
    userId = null
  }
  const searchTerm = '%' + term + '%';

  const db = await makeConn(true);

  try {
    const [results, feilds] = await db.execute<RowDataPacket[]>("SELECT stream.name as name, tc_user.username as username, stream.updated_at updated_at, stream.is_live as is_live, tc_user.image_url as image_url, stream.user_id as user_id FROM stream LEFT JOIN block on stream.user_id = blocker_id JOIN tc_user ON stream.user_id = tc_user.id WHERE stream.is_live = true AND (blocked_id IS NULL OR blocked_id != ?) AND (stream.name LIKE ? OR tc_user.username LIKE ?) ORDER BY stream.updated_at DESC;", [userId, searchTerm, searchTerm]);

    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    return results as SearchResult[]

  } catch (err) {
    console.log(err);
    throw new Error("Internal Error")
  } finally {
    await db.end();
  }

}