"use client";

import {cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);

    return (
        <aside className={cn("absolute left-0 flex flex-col w-[70px] h-full bg-background border-r z-50", !collapsed && "w-60")}>
            {children}
        </aside>
    )

}

export { Wrapper };