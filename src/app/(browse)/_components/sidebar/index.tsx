import { Suspense } from "react";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";

import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";
import { Following, FollowingSkeleton } from "./following";

export const Sidebar = async () => {
    const recommended = getRecommended();
    const following = getFollowedUsers();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 md:pt-0">
                <Suspense fallback={<FollowingSkeleton />}>
                    <Following data={following} />
                </Suspense>
                <Suspense fallback={<RecommendedSkeleton/>}>
                    <Recommended data={recommended}/>
                </Suspense>

            </div>
        </Wrapper>
    )
}