import { RowDataPacket, Connection } from 'mysql2/promise';

import { makeConn } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';
import { UserResult } from '@/models/definitions';
// import { MySQLContextManager } from './utils';

export const isBlockingUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    return false;
  }

  if (self.id === id) {
    throw new Error('Can not block yourself!');
  }

  const db = await makeConn();
  const [users, fields] = await db.execute<UserResult[]>(
    'SELECT * FROM block WHERE blocker_id = ? AND blocked_id = ?',
    [self.id, id]
  );

  if (users.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const isBlockedByUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    return false;
  }

  const db = await makeConn();

  const is_blocked = (
    await db.execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS is_blocked FROM block WHERE blocker_id = ? AND blocked_id = ?;',
      [id, self.id]
    )
  )[0][0]['is_blocked'];

  if (is_blocked == true) {
    return true;
  } else {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error('User not found by Clerk!');
  }

  const db = await makeConn();

  try {
    // const mysqlConn = await MySQLContextManager.init();

    // await mysqlConn.execute(async (db: Connection) => {
    const res = await db.execute(
      'INSERT INTO block (blocker_id, blocked_id) VALUES (?, ?);',
      [self.id, id]
    );
    // });

    return true;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error');
  } finally {
    await db.end();
  }
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (!self) {
    throw new Error('User not found by Clerk!');
  }

  const db = await makeConn();

  // const mysqlConn = await MySQLContextManager.init();

  // await mysqlConn.execute(async (db: Connection) => {
  try {
    const res = await db.execute(
      'DELETE FROM block WHERE blocker_id = ? AND blocked_id = ?;',
      [self.id, id]
    );

    return true;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error!');
  } finally {
    await db.end();
  }

  // })
};
