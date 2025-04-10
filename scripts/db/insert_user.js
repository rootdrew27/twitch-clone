const mysql =  require("mysql2/promise");
//const { connOpts } = require("../../src/lib/db");
// const { User } = require('../../src/models/definitions');

const connOpts = {
  host: "127.0.0.1",
  port: 3306,
  database: "twitch_clone",
  user: "tc_dev",
  password: "password"
}

async function insertUser() {
    try{
        const dbConn = await mysql.createConnection(connOpts);
        const [result] = await dbConn.execute("INSERT INTO tc_user (username, image_url, external_user_id, bio) VALUES (?, ?, ?, ?);", ["test_username", "", "", ""]);
        console.log(result);
        await dbConn.end();
    } catch (err) {
        console.log(err);
    }
}

insertUser();