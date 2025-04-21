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
    `CREATE TABLE IF NOT EXISTS tc_user (
	    id INT AUTO_INCREMENT,
        username VARCHAR(32) NOT NULL UNIQUE,
        image_url VARCHAR(500),
        external_user_id VARCHAR(32),
        bio VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );`;
    const res = await db.execute(create_user_sql);
    const create_follow_sql = 
    `CREATE TABLE IF NOT EXISTS follow (
        follower_id INT,
        following_id INT,
        PRIMARY KEY (follower_id, following_id),
        FOREIGN KEY (follower_id) 
            REFERENCES tc_user(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        FOREIGN KEY (following_id) 
            REFERENCES tc_user(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    );`;
    const res2 = await db.execute(create_follow_sql);
    const create_block_sql =  
    `CREATE TABLE IF NOT EXISTS block (
        blocker_id INT,
        blocked_id INT,
        PRIMARY KEY (blocker_id, blocked_id),
        FOREIGN KEY (blocker_id) 
            REFERENCES tc_user(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        FOREIGN KEY (blocked_id) 
            REFERENCES tc_user(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    );`;
    const res3 = await db.execute(create_block_sql);
    const create_stream_sql = 
    `CREATE TABLE IF NOT EXISTS stream (
        id INT AUTO_INCREMENT,
        name VARCHAR(64) NOT NULL,
        thumbnail_url VARCHAR(500),
        ingress_id VARCHAR(64) UNIQUE,
        server_url VARCHAR(64),
        stream_key VARCHAR(64),
        is_live BOOLEAN DEFAULT FALSE,
        is_chat_enabled BOOLEAN DEFAULT TRUE,
        is_chat_delayed BOOLEAN DEFAULT FALSE,
        is_chat_followers_only BOOLEAN DEFAULT FALSE,
        user_id INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX(ingress_id),
        FOREIGN KEY (user_id)
            REFERENCES tc_user(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    );`;
    const res4 = await db.execute(create_stream_sql);
    await db.end();
}

main();