import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import DropdownItem from "@/components/DropdownItem";

export const Dropdown = ({ isSmallScreen }) => {
  const { user, logout } = useAuth();
  // const nameInitials = `${user.name.charAt(0)}${user.surname.charAt(
  //   0
  // )}`.toUpperCase();

  // The 'show' property in the dropdownItems array is an expression. When rendering those items,
  // we evaluate the 'show' expression, and if it's true, the corresponding link is rendered.
  const dropdownItems = [
    { show: true, type: "link", text: "Mi perfil", link: "/profile" },
    { show: user.role === "admin", type: "link", text: "Dashboard", link: "/" },
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
      className={` relative
   transition duration-200 ease-in-out  `}
    >
      <div
        onClick={() => setDropDownOpen(!dropDownOpen)}
        className=" cursor-pointer select-none w-36 md:w-full rounded-full bg-white px-6 text-primary    hover:text-brand-red hover:underline"
      >
        <span className="">{user.username || "no name"}</span>

        <FontAwesomeIcon
          size="lg"
          className=" text-primary ml-2"
          icon={faChevronDown}
        />
      </div>

      <div className="right-0 z-10 w-full md:absolute md:w-44">
        <ul
          className={` animate-fadeIn md:bg-secondaryLight md:text-primary py-2 pl-2 transition-all  md:mt-8  md:pl-0 md:shadow-lg  ${
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
              )
          )}
        </ul>
      </div>
    </div>
  );
};
