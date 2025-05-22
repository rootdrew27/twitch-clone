import { RowDataPacket } from 'mysql2';

export interface UserResult extends RowDataPacket {
  id: string;
  username: string;
  image_url: string;
  external_user_id: string;
  bio: string | null;
  clerk_id: string;

  is_live: boolean;

  follower_count?: number;

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

export interface RecommendedResult extends UserResult, StreamResult {}

export interface FollowingResult extends UserResult, StreamResult {}

interface PrivateStreamInfo {
  ingress_id: string;
  server_url: string;
  stream_key: string;
}

export type HomeResult = Pick<
  UserResult & StreamResult,
  'username' | 'image_url' | 'is_live' | 'name' | 'user_id'
>;

export type SearchResult = Pick<
  UserResult & StreamResult,
  'username' | 'image_url' | 'is_live' | 'name' | 'user_id' | 'updated_at'
>;

export type FieldType =
  | 'name'
  | 'is_chat_enabled'
  | 'is_chat_delayed'
  | 'is_chat_followers_only';
export interface StreamConfig {
  field: FieldType;
  value: boolean | string;
}
