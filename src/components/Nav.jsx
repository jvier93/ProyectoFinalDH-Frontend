import { useState, useEffect } from "react";
import { NavLinks } from "@/components/NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

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
      <nav className="w-1/3 md:w-3/6 lg:w-2/6 2xl:w-3/12 flex justify-end ">
        <div className="hidden md:flex w-full  justify-between">
          <NavLinks />
        </div>
        <div>
          <button className="md:hidden" onClick={toggleNavbar}>
            {isOpen ? (
              <FontAwesomeIcon size="xl" className=" text-black" icon={faX} />
            ) : (
              <FontAwesomeIcon
                size="xl"
                className=" text-black"
                icon={faBars}
              />
            )}
          </button>
        </div>
      </nav>
      {isOpen && isSmallScreen && (
        <div className="flex gap-2 pt-4 pb-2  flex-col items-center basis-full">
          <NavLinks />
        </div>
      )}
    </>
  );
};
