"use server";

import { revalidatePath } from 'next/cache';

import { blockUser } from "@/lib/block-service";

export const onBlock = async (id: string) => {
    const blockedUser = await blockUser(id);

}