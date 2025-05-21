import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
};

export const useSidebar = create<SidebarStore>()(
        (set, get) => ({ 
            collapsed: true,
            onExpand: () => set(() => ({ collapsed: false })),
            onCollapse: () => set(() => ({ collapsed: true })),
        }),
)