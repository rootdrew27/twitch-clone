"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useSidebar } from "@/store/use-sidbar"
import { Button } from "@/components/ui/button"

const Toggle = () => {
    const { collapsed, onExpand, onCollapse} = useSidebar((state) => state)

    const label = collapsed ? "Expand" : "Collapsed";

    return (
        <>
            {collapsed && (
                <div className="hidden md:flex w-full items-center justify-center pt-4 mb-4">
                    <Button onClick={onExpand} className="h-auto p-2">
                        <ArrowRightFromLine className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary">Hi</p>
                    <Button onClick={onCollapse} className="h-auto p-2 ml-auto">
                        <ArrowLeftFromLine className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    )
}

export { Toggle };