'use server';

import { revalidatePath } from 'next/cache';

import { followUser, unfollowUser } from '@/lib/follow-service';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    // revalidatePath("/");

    if (followedUser) {
      revalidatePath('/(browse)/[username]', 'page');
    }

    return followedUser;
  } catch (err) {
    console.log(err);
    throw new Error('Internal error!');
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath('/');

    if (unfollowedUser) {
      revalidatePath('/(browse)/[username]', 'page');
    }

    return unfollowedUser;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Error!');
  }
};
