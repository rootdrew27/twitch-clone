import { Suspense } from "react";
import { getRecommended } from "@/lib/recommended-service";

import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";


export const Sidebar = async () => {
    const recommended = getRecommended();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 md:pt-0">
                <Suspense fallback={<RecommendedSkeleton/>}>
                    <Recommended data={recommended}/>
                </Suspense>
            </div>
        </Wrapper>
    )
}