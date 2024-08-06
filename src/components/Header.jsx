import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";

const Header = () => {
  return (
    <header className="bg-secondary  sticky top-0 w-full flex-wrap z-[20]  flex items-center justify-between px-2 md:px-12 py-2">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
