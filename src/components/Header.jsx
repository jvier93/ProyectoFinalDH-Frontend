import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";
import { useScroll } from "@/hooks/useScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Search from "@/components/Search";
import { useLocation } from "react-router-dom";
import { useScreenWidth } from "@/hooks/useScreenWidth";

const Header = () => {
  const { position } = useScroll();
  const isOnTop = position.y === 0;
  const location = useLocation();
  const isOnPrincipalPage = location.pathname === "/";

  const [searchOpen, setSearchOpen] = useState(false);
  const { isSmallScreen } = useScreenWidth();

  return (
    <header
      className={`${isOnTop && isOnPrincipalPage ? "bg-primary bg-opacity-100 md:bg-transparent" : "bg-primary bg-opacity-100"} fixed top-0 z-[20] w-full transition-colors duration-500`}
    >
      <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <div className="mx-auto flex max-w-[1366px] flex-wrap items-center justify-between px-2 py-2">
        <div className="flex-1">
          <Logo
            logoUrl={
              isOnTop && isOnPrincipalPage && !isSmallScreen
                ? "/images/logo-green.png"
                : "/images/logo-white.png"
            }
          />
        </div>

        <FontAwesomeIcon
          onClick={() => setSearchOpen(true)}
          icon={faMagnifyingGlass}
          className="cursor-pointer text-white"
          size="xl"
        ></FontAwesomeIcon>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
