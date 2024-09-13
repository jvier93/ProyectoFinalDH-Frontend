import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import DropdownItem from "@/components/DropdownItem";
export const Dropdown = ({ isSmallScreen }) => {
  const { user, logout } = useAuth();

  // The 'show' property in the dropdownItems array is an expression. When rendering those items,
  // we evaluate the 'show' expression, and if it's true, the corresponding link is rendered.
  const dropdownItems = [
    { show: true, type: "link", text: "Mi perfil", link: "/profile" },
    {
      show: user.roles[0] === "ADMIN",
      type: "link",
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      show: true,
      type: "button",
      text: "Cerrar sesión",
      action: (event) => {
        event.stopPropagation();
        logout();
      },
    },
  ];

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const closeDropdown = () => {
    setDropDownOpen(false);
  };

  return (
    <div
      onMouseLeave={() => {
        if (isSmallScreen) {
          return;
        }
        closeDropdown();
      }}
      className={`relative rounded-md border-white text-white transition duration-200 ease-in-out md:border`}
    >
      <div
        onClick={() => setDropDownOpen(!dropDownOpen)}
        className="w-full cursor-pointer select-none rounded-md px-3 md:w-full"
      >
        <span className="px-3">{user.username || "no name"}</span>

        <FontAwesomeIcon size="lg" className="ml-2" icon={faChevronDown} />
      </div>

      <div className="right-0 top-5 z-10 w-full md:absolute md:w-44">
        <ul
          className={`"bg-transparent animate-fadeIn py-2 pl-2 text-white transition-all md:mt-8 md:bg-white/95 md:pl-0 md:text-primary md:shadow-lg ${
            dropDownOpen ? "block" : "hidden"
          }`}
        >
          {dropdownItems.map(
            (item, index) =>
              item.show && (
                <DropdownItem
                  item={item}
                  key={index}
                  closeDropdown={closeDropdown}
                />
              ),
          )}
        </ul>
      </div>
    </div>
  );
};
