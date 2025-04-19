"use client";

import { Hint } from "@/components/hint";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useSidebar } from "@/store/use-sidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";

const Toggle = () => {
    const { collapsed, onExpand, onCollapse} = useSidebar((state) => state)

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden md:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button variant="outline" onClick={onExpand} className="h-auto p-2 text-muted-foreground hover:text-primary">
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-bold">For You</p>
                    <Hint label={label} side="right" asChild>
                        <Button variant="outline" onClick={onCollapse} className="h-auto p-2 ml-auto text-muted-foreground hover:text-primary">
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export { Toggle };