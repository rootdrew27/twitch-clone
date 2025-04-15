"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service"

export const onFollow = async (id:string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`/${followedUser.username}`);
        }

        return followedUser.username;
    } catch (err) {
        console.log(err);
        throw new Error("Internal error!")
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        revalidatePath("/");

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.username}`);
        }

        return unfollowedUser.username

    } catch (err) {
        console.log(err);
        throw new Error("Internal Error!")
    }
}