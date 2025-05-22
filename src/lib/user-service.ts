import { makeConn } from '@/lib/db';
import { UserResult } from '@/models/definitions';
import { RowDataPacket } from 'mysql2';

export const getUserByUsername = async (username: string) => {
  const db = await makeConn();
  try {
    const [results, fields] = await db.execute<UserResult[]>(
      'SELECT tc_user.id as id, username, is_live, clerk_id, bio FROM tc_user JOIN stream ON tc_user.id = stream.user_id WHERE username = ?;',
      [username]
    );

    const user = results[0];
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error!');
  } finally {
    await db.end();
  }
};

export const getUserWithFollowerCount = async (username: string) => {
  const db = await makeConn();
  try {
    // TODO: Test this query's reliability
    const [userResults, _] = await db.execute<UserResult[]>(
      'SELECT tc_user.id AS id, username, is_live, bio, clerk_id FROM tc_user JOIN stream ON tc_user.id = stream.user_id WHERE username = ?;',
      [username]
    );

    const user = userResults[0];

    const [followerCountResults, _fields] = await db.execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS follower_count FROM follow WHERE following_id = ?;',
      [user.id]
    );

    const followerCount = followerCountResults[0];

    user.follower_count = followerCount.follower_count;

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error!');
  } finally {
    await db.end();
  }
};
