import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="outline"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">Exit</Link>
      </Button>
      <UserButton />
    </div>
  );
};
