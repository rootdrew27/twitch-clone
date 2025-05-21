import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";

import Dashboard from "./dashboard";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button className="cursor-pointer hover:fade transition">
            Sign In
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:block">
            <Dashboard username={user.username ? user.username: ""} />
          </div>
          <UserButton />
        </div>
      )}
    </div>
  );
};
