import { makeConn } from "@/lib/db";
import { UserResult } from "@/models/definitions";

export const getUserByUsername = async (username: string) => {
    const db = await makeConn();
    const [results, fields] = await db.execute<UserResult[]>("SELECT * FROM tc_user WHERE username = ?;", [username]);
    const user = results[0];
    await db.end();

    return user;
}