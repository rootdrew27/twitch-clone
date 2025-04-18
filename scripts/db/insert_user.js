const mysql = require("mysql2/promise");
//const { connOpts } = require("../../src/lib/db");
// const { User } = require('../../src/models/definitions');

const connOpts = {
  host: "127.0.0.1",
  port: 3306,
  database: "twitch_clone",
  user: "tc_dev",
  password: "password",
};

async function insertUser() {
  try {
    const db = await mysql.createConnection(connOpts);
    const [result] = await db.execute(
      "INSERT INTO tc_user (username, image_url, external_user_id, bio) VALUES (?, ?, ?, ?);",
      ["test_username", "", "", ""]
    );
    console.log(result);
    await db.end();
  } catch (err) {
    console.log(err);
    throw new Error("Error inserting user!");
  }
}

insertUser();
