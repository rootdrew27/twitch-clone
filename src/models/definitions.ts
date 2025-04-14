import { RowDataPacket } from 'mysql2';

export interface UserResult extends RowDataPacket {
    id: string;
    username: string;
    image_url: string;
    external_user_id: string
    bio?: string;

    created_at: Date;
    updated_at: Date;
} 

