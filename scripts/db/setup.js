const mysql = require('mysql2/promise');

const connOpts = {
    host: "127.0.0.1",
    port: 3306,
    database: "twitch_clone",
    user: "tc_dev",
    password: "password"
}

console.log(connOpts);

async function main() {
    const db = await mysql.createConnection(connOpts);

    // create User table (TC_ is added because 'user' is a reserved mysql keyword)
    const create_user_sql = 
    `CREATE TABLE IF NOT EXISTS TC_User (
	    id int AUTO_INCREMENT,
        username VARCHAR(32) NOT NULL UNIQUE,
        image_url VARCHAR(500),
        external_user_id VARCHAR(32),
        bio VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )`
    const res = await db.execute(create_user_sql);
    console.log(res);
    await db.end();
}

main();