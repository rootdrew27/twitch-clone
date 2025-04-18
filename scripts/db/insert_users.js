const mysql = require("mysql2/promise");

const connOpts = {
  host: "127.0.0.1",
  port: 3306,
  database: "twitch_clone",
  user: "tc_dev",
  password: "password",
};

async function insertUsers() {
  try {
    const db = await mysql.createConnection(connOpts);
    const [result] = await db.execute(
      "INSERT INTO tc_user (username) VALUES ('theSteve'), ('JoeyXYX'), ('Alec_Baldwinner');"
    );
    console.log(result);
    await db.end();
  } catch (err) {
    console.log(err);
    throw new Error("Error inserting users!");
  }
}

insertUsers();
