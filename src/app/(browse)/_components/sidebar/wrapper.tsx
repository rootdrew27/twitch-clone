"use client";

import {cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidbar";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);

    return (
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r z-50", collapsed && "w-[70px]")}>
            {children}
        </aside>
    )
}

export { Wrapper };