import { RowDataPacket } from 'mysql2/promise';
import { makeConn } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';
import { FollowingResult } from '@/models/definitions';

export const getFollowedUsers = async () => {
  const db = await makeConn();
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('User not found in Clerk');
    }

    const [results, fields] = await db.execute<FollowingResult[]>(
      'SELECT tc_user.id, username, image_url, is_live ' +
        'FROM tc_user JOIN stream ON tc_user.id = stream.user_id ' +
      'WHERE tc_user.id IN ' +
        '(SELECT following_id FROM follow WHERE follower_id = ?);',
      [self.id]
    );

    await db.end();

    return results;
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  const db = await makeConn();
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error('User not found in Clerk');
    }

    if (self.id === id) {
      return true;
    }

    const [results, fields] = await db.execute<RowDataPacket[]>(
      "SELECT COUNT(*) AS 'is_following' FROM follow WHERE follower_id = ? AND following_id = ?",
      [self.id, id]
    );

    await db.end();

    if (results[0].is_following == false) {
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

  if (!self) {
    throw new Error('User not found in Clerk');
  }

  // Check if user trying to follow themselves
  if (self.id === id) {
    await db.end();
    throw new Error('Can not follow yourself!');
  }

  const [results, fields] = await db.query<RowDataPacket[][]>(
    'INSERT INTO follow (follower_id, following_id) VALUES (?, ?); SELECT username FROM tc_user WHERE id = ?;',
    [self.id, id, id]
  );

  await db.end();
  return results[1][0] as FollowingResult;
};

export const unfollowUser = async (id: string) => {
  const db = await makeConn(true);

  const self = await getSelf();

  if (!self) {
    throw new Error('User not found in Clerk');
  }

  if (self.id === id) {
    throw new Error('Cannot unfollow yourself.');
  }

  const [result, fields] = await db.query<RowDataPacket[][]>(
    [
      'DELETE FROM follow WHERE follower_id = ? AND following_id = ?;',
      'SELECT username FROM tc_user WHERE id = ?',
    ].join(' '),
    [self.id, id, id]
  );

  await db.end();
  return result[1][0] as FollowingResult;
};
