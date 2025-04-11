import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
import { ModeToggle } from "@/app/(browse)/_components/navbar/lighting-mode-dropdown-menu";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 flex w-full h-20 z-[49] px-2 lg:px-4 shadow-sm border-bottom border-1 items-center">
      <div className="flex w-1/4 h-full gap-x-4 items-center">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="block md:hidden">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 6h18M3 12h18M3 18h18"
                            />
                        </svg></MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Home</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>      
        </div>

        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
      <div className="flex w-1/2 h-full items-center justify-center">
        <Search />
      </div>
      <div className="flex w-1/4 justify-end space-x-3">
        <Actions />
      </div>
    </nav>
  );
};
