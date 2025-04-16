"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { onFollow, onUnfollow } from "@/actions/follow";



interface ActionProps {
    isFollowing: boolean;
    id: string;
    username: string;
}

export const Actions = ({ isFollowing, id, username}: ActionProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(id)
            .then(() => toast.success("Now following " + username + "."))
            .catch(() => toast.error('Something went wrong.'))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(id)
            .then(() => toast.success("Unfollowed " + username + "."))
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