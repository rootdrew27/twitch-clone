import type { User } from '@clerk/backend';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { makeConn } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";

import { UserResult } from "@/models/definitions";

export const getRecommended = async () => {
    const db = await makeConn();
    const user = (await getSelf());
    let users: UserResult[]
    if (!user){
        users = (await db.query<UserResult[]>("SELECT * FROM tc_user ORDER BY created_at DESC"))[0];
    } else {
        users = (await db.query<UserResult[]>("SELECT * FROM tc_user WHERE username != ? ORDER BY created_at DESC;", [user.username]))[0];
    }

    await db.end();
    await new Promise(resolve => setTimeout(resolve, 1000));
    return users;
}