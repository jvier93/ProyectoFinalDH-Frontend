import { useState, useEffect } from "react";

import { NavLinks } from "./NavLinks";
import ToggleMenuIcon from "./ToggleMenuIcon";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = width <= 768;

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="pl-12 md:pl-4">
        <div className="hidden w-full justify-end gap-2 md:flex">
          <NavLinks isSmallScreen={isSmallScreen} />
        </div>
        <div>
          <ToggleMenuIcon open={isOpen} setOpen={toggleNavbar}></ToggleMenuIcon>
        </div>
      </nav>
      {isOpen && isSmallScreen && (
        <div className="flex basis-full flex-col items-center gap-2 pb-2 pt-4">
          <NavLinks isSmallScreen={isSmallScreen} />
        </div>
      )}
    </>
  );
};
