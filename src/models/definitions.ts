import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string
    bio?: string;

    createdAt: Date;
    updatedAt: Date;
} 