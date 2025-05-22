import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { makeConn } from './db';
import { Connection } from 'mysql2/promise';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += value.toString(16).substring(-2);
  }
  return color;
};

// export class MySQLContextManager {
//   db: Connection

//   constructor(db: Connection) {
//     this.db = db
//   }
//   static async init() {
//     const db = await makeConn();
//     return new MySQLContextManager(db)
//   }
//   async execute(f:(db: Connection) => void, e?: (err: unknown) => void) {
//     try {
//       f(this.db)
//     } catch (err) {
//       if (e) {
//         e(err);
//       } else {
//         console.log(err)
//       }
//     } finally {
//       await this.db.end()
//     }
//   }
// }
