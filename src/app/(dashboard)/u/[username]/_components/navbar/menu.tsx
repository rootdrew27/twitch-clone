import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

interface MenuProps {
  MenuItems: string[];
}

export const Menu = ({ MenuItems }: MenuProps) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </MenubarTrigger>
        <MenubarContent>
          {MenuItems.map((menuItem) => (
            <MenubarItem key={menuItem}>{menuItem}</MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
