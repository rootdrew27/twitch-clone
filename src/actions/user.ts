'use server';

import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import { makeConn } from '@/lib/db';

export const updateUser = async (values: { bio: string }) => {
  const self = await getSelf();

  if (!self) {
    throw new Error('Unauthorized!');
  }

  const validData = {
    bio: values.bio,
  };

  const db = await makeConn();

  try {
    const [result, fields] = await db.execute(
      'UPDATE tc_user SET bio = ? WHERE id = ?;',
      [validData.bio, self.id]
    );

    revalidatePath(`${self.username}`);
    revalidatePath(`/u/${self.username}`);
  } catch (error) {
    console.log(error);
    throw new Error('Internal Error!');
  } finally {
    db.end();
  }
};
