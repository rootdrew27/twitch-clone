import { makeConn } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';
import { type HomeResult } from '@/models/definitions';
import { RowDataPacket } from 'mysql2';

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    if (!self) {
      userId = null;
    } else {
      userId = self.id;
    }
  } catch (err) {
    userId = null;
  }

  const db = await makeConn();

  try {
    if (userId) {
      const [streams, field] = await db.execute<RowDataPacket[]>(
        'SELECT stream.name AS name, stream.is_live AS is_live, tc_user.username AS username, tc_user.image_url AS image_url FROM stream LEFT JOIN block ON user_id = blocker_id JOIN tc_user ON stream.user_id = tc_user.id WHERE is_live=true AND (blocked_id != ? OR blocked_id IS NULL) AND user_id != ? ORDER BY stream.updated_at DESC;',
        [userId, userId]
      );

      await new Promise((resolve, reject) =>
        setTimeout(() => {
          resolve('');
        }, 1000)
      );

      return streams as HomeResult[];
    } else {
      const [streams, fields] = await db.execute<RowDataPacket[]>(
        'SELECT stream.name AS name, stream.is_live AS is_live, stream.user_id as user_id, tc_user.username AS username, tc_user.image_url AS image_url FROM stream JOIN tc_user ON stream.user_id = tc_user.id WHERE is_live=true ORDER BY stream.updated_at DESC;'
      );

      return streams as HomeResult[];
    }
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error!');
  } finally {
    await db.end();
  }
};
