import mysql, { ConnectionOptions } from 'mysql2/promise';

const connOpts: ConnectionOptions = {
    host: process.env.MYSQL_HOST!,
    port: parseInt(process.env.MYSQL_PORT!),
    database: process.env.MYSQL_DATABASE!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!
}

export { connOpts };
