import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { followUser, isFollowingUser } from "@/lib/follow-service";

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

    const isFollowing = await isFollowingUser(user.id);

    return (
        <div className="flex flex-col gap-y-4">
            <p>Username: {user.username}</p>
            <p>User id: {user.id}</p>
            <p>Is Following: {JSON.stringify(isFollowing)}</p>
            <Actions isFollowing={isFollowing} id={user.id} />
        </div>
    )
}

export default UserPage;