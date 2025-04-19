import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockingUser, isBlockedByUser } from "@/lib/block-service";

import { Actions } from "./_components/actions";

interface UserPageProps {
    params: {
        username: string;
    };
};

const UserPage = async ({params}: UserPageProps) => {

    const { username } = await params;

    const user = await getUserByUsername(username);

    if (!user) {
        return (
            <div className="flex flex-col gap-y-4">
                <p>User Not Found!</p>                
            </div>
        )
    }

    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        return (
            <div className="flex flex-col gap-y-4">
                <p>User Not Found!</p>                
            </div>
        )
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocking = await isBlockingUser(user.id);

    return (
        <div className="flex flex-col gap-y-4">
            <p>Username: {user.username}</p>
            <p>User id: {user.id}</p>
            <p>Is Following: {JSON.stringify(isFollowing)}</p>
            <Actions isFollowing={isFollowing} isBlocking={isBlocking} id={user.id} username={user.username} />
        </div>
    )
}

export default UserPage;