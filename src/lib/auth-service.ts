import { currentUser } from '@clerk/nextjs/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

import { UserResult } from '@/models/definitions';

import { makeConn } from '@/lib/db';

export const getSelf = async () => {
  const self = await currentUser(); // <- Dynamic API

  if (!self || !self.username) {
    return null;
  }

  const db = await makeConn();

  try {
    const user = (
      await db.query<UserResult[]>('SELECT * FROM tc_user WHERE username = ?', [
        self.username,
      ])
    )[0][0];

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting user from Database!');
  } finally {
    await db.end();
  }
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('Unauthorized');
  }

  const db = await makeConn();

  try {
    const user = (
      await db.execute<UserResult[]>(
        'SELECT * FROM tc_user WHERE username = ?;',
        [username]
      )
    )[0][0];

    if (!user) {
      throw new Error('Error: User not found in Database!');
    }

    if (self.username !== user.username) {
      throw new Error('Unauthorized');
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting user from Database!');
  } finally {
    await db.end();
  }
};
