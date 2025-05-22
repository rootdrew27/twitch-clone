'use client';

import { Users, MessageSquare } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useChatSidebar, ChatVariant } from '@/store/use-chat-sidebar';

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const label = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  return (
    <Hint label={`Switch to ${label}`} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="hover:text-primary h-auto bg-transparent p-2 hover:bg-white/10"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
