"use server";

import { revalidatePath } from 'next/cache';

import { blockUser, unblockUser } from "@/lib/block-service";

export const onBlock = async (id: string) => {
    
    try {
        const blockedUser = await blockUser(id);

        if (blockedUser) {
            revalidatePath('/(browse)/[username]', 'page');
        }
    
        return;

    } catch (err) {
        console.log(err)
        throw new Error("Internal error!");
    }

}

export const onUnblock = async (id: string) => {
    try {
        const success = await unblockUser(id);

        if (success) {
            revalidatePath('/(browse)/[username]', 'page');
        }
        
        return;

    } catch (err) {
        console.log(err);
        throw new Error("Internal");
    }
}