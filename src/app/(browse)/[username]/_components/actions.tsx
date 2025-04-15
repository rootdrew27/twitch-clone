"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { onFollow, onUnfollow } from "@/actions/follow";



interface ActionProps {
    isFollowing: boolean;
    id: string;
}

export const Actions = ({ isFollowing, id}: ActionProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(id)
            .then((followedUsername) => toast.success("Now following " + followedUsername + "."))
            .catch(() => toast.error('Something went wrong.'))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(id)
            .then((unfollowedUsername) => toast.success("Unfollowed " + unfollowedUsername + "."))
            .catch(() => toast.error("Something went wrong."))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return (
        <Button disabled={isPending} onClick={onClick}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}