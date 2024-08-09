import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";

const Header = () => {
  return (
    <header className="bg-secondary h-[120px] fixed top-0 w-full flex-wrap z-[20] scroll-my-44 flex items-center justify-between px-2 md:px-12 py-2">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
