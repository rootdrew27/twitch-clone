import { makeConn } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
    const db = await makeConn();
    try {
        const self = await getSelf();

        const otherUser = null // TODO FINISH ME !!!!!!!
    } catch (err) {
        
    }
}