import { makeConn } from "@/lib/db";
import { UserResult, StreamResult } from "@/models/definitions";

export const getUserByUsername = async (username: string) => {
    const db = await makeConn();
    const [results, fields] = await db.execute<UserResult[]>("SELECT tc_user.id as id, username, is_live, clerk_id, bio FROM tc_user JOIN stream ON tc_user.id = stream.user_id WHERE username = ?;", [username]);
    const user = results[0];
    await db.end();

    return user;
}

// export const getUserById = async (id: string) => {
//     const db = await makeConn();
//     const user = await db.execute<UserResult[]>("SELECT * FROM tc_user JOIN stream ON tc_user.id = stream.user_id WHERE tc_user.id = ?;", [id]);

//     return user[0][0];
// }