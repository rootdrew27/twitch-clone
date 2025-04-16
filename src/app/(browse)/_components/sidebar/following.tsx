"use client";

import { use } from "react";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

import { UserResult } from "@/models/definitions";

export const Following = ({ data }: {data: Promise<UserResult[]>}) => {
    const { collapsed } = useSidebar((state) => state);

    const users = use(data);

    if (users.length === 0) {
        return null;
    }

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">
                    Following
                </p>
            </div>
            )}
            <ul className="space-y-2 px-2">
                {users.map((user) => (
                    <UserItem key={user.id} username={user.username} imageUrl={user.image_url} isLive={true}/>
                ))}
            </ul>

        </div>
    )
}

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 md:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}