import mysql from "mysql2/promise";
import { connOpts } from "./db";
import { User } from '../models/definitions';

export async function getActors() {
    try{
        const dbConn = await mysql.createConnection(connOpts);
        const [result] = await dbConn.query<User[]>("SELECT * FROM TC_USER;");
        await dbConn.end();
    } catch {
        // TODO: Implement error handling
    }
}