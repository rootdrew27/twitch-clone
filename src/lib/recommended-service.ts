import type { User } from '@clerk/backend';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';
import { makeConn } from '@/lib/db';

import { getSelf } from '@/lib/auth-service';

import { RecommendedResult } from '@/models/definitions';

export const getRecommended = async () => {
  const self = await getSelf();

  const db = await makeConn();

  let users: RecommendedResult[];
  let fields: FieldPacket[];

  try {
    if (!self) {
      [users, fields] = await db.query<RecommendedResult[]>(
        'SELECT tc_user.id, username, image_url, is_live FROM tc_user JOIN stream ON tc_user.id = stream.user_id ORDER BY tc_user.created_at DESC'
      );
    } else {
      [users, fields] = await db.query<RecommendedResult[]>(
        `SELECT tc_user.id, username, image_url, is_live
            FROM tc_user
            JOIN stream ON tc_user.id = stream.user_id
        WHERE username != ? 
            AND
        tc_user.id NOT IN (SELECT following_id FROM follow WHERE follower_id = ? UNION SELECT blocker_id FROM block WHERE blocked_id = ?)
        ORDER BY tc_user.created_at DESC;`,
        [self.username, self.id, self.id]
      );
    }
    // Uncomment to see Skeletons
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     resolve("");
    //   }, 1000)
    // );

    return users;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error!');
  } finally {
    await db.end();
  }
};
