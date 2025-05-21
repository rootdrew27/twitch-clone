import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";
import { Menu } from "./menu";
import { ModeToggle } from "@/components/lighting-mode-dropdown-menu";

export const Navbar = () => {
  return (
    <nav className="absolute top-0 flex w-full h-20 z-40 px-2 lg:px-4 shadow-sm border-b-1 items-center">
      <div className="flex w-1/4 h-full gap-x-4 items-center">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="block md:hidden">
          <Menu MenuItems={["Home", "Dashboard"]}/>
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
