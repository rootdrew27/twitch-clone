import { RowDataPacket } from 'mysql2';

export interface UserResult extends RowDataPacket {
    id: string;
    username: string;
    image_url: string;
    external_user_id: string
    bio: string | null;

    is_live: boolean;
    clerk_id: string;

    created_at: Date;
    updated_at: Date;
}

export interface StreamResult extends RowDataPacket {
    id: string;
    name: string;
    thumbnail_url: string;
    ignress_id: string;
    server_url: string;
    stream_key: string;
    is_live: boolean;
    is_chat_enabled: boolean;
    is_chat_delayed: boolean;
    is_chat_followers_only: boolean;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface RecommendedResult extends UserResult, StreamResult {};

export interface FollowingResult extends UserResult, StreamResult {};

export type FieldType = "name" | "is_chat_enabled" | "is_chat_delayed" | "is_chat_followers_only";
export interface StreamConfig {
    field: FieldType;
    value: boolean | string;
}
