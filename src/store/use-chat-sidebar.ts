import { create } from "zustand";

export enum ChatVariant {
    CHAT = "Chat",
    COMMUNITY = "Community"
}

interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void
};

export const useChatSidebar = create<ChatSidebarStore>()(
        (set, get) => ({ 
            collapsed: false,
            variant: ChatVariant.CHAT,
            onExpand: () => set(() => ({ collapsed: false })),
            onCollapse: () => set(() => ({ collapsed: true })),
            onChangeVariant: (variant: ChatVariant) => set(() => ({ variant }))
        }),
)