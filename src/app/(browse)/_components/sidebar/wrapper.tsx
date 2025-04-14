"use client";

import { useState, useEffect } from "react";

import {cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
    const [isClient, setIsClient] = useState(false);
    let { collapsed } = useSidebar((state) => state);


    useEffect(() => {
        setIsClient(true);
        let stored = localStorage.getItem('sidebar-collapsed')
        console.log(stored)
        if (stored) {
            collapsed = JSON.parse(stored)['state']['collapsed']
        }
    }, []);

    // console.log(collapsed)
    // console.log(isClient)

    if (!isClient) {
        return (
            <aside className="fixed left-0 flex w-[70px] md:w-60 flex-col h-full bg-background border-r z-50">

            </aside>
        )
    
    } 
    else {
        console.log(collapsed)
        return (
            <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r z-50", collapsed && "w-[70px]")}>
                {children}
            </aside>
        )
    }

}

export { Wrapper };