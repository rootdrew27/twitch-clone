import { Logo } from './logo';
import { Search } from './search';
import { Actions } from './actions';
import { Menu } from './menu';
import { ModeToggle } from '@/components/lighting-mode-dropdown-menu';

export const Navbar = () => {
  return (
    <nav className="border-b-1 absolute top-0 z-40 flex h-20 w-full items-center px-2 shadow-sm lg:px-4">
      <div className="flex h-full w-1/4 items-center gap-x-4">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="block md:hidden">
          <Menu MenuItems={['Home', 'Dashboard']} />
        </div>
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
      <div className="flex h-full w-1/2 items-center justify-center">
        <Search />
      </div>
      <div className="flex w-1/4 justify-end space-x-3">
        <Actions />
      </div>
    </nav>
  );
};
