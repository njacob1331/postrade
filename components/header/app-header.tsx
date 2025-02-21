
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "@/components/header/search-bar";
import Authentication from '../auth/auth';
import { NavigationMenuDemo } from '../nav-menu';
const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-sm px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[26px] font-bold max-sm:hidden">
              Lasso
            </p>
          </Link>

          <div className="flex items-center gap-4 flex-1 justify-center">
            <NavigationMenuDemo />
            <div className="w-[300px]">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center">
            <Authentication />
          </div>
        </div>
      </header>
    </>
  );
};

export { Navbar };