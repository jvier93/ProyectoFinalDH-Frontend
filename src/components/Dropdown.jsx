import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import DropdownItem from "@/components/DropdownItem";

export const Dropdown = ({ isSmallScreen }) => {
  const { user, logout } = useAuth();
  const nameInitials = `${user.name.charAt(0)}${user.surname.charAt(
    0
  )}`.toUpperCase();

  const dropdownItems = [
    { type: "link", text: "Profile", link: "/profile" },
    { type: "link", text: "Dashboard", link: "/" },
    {
      type: "button",
      text: "Logout",
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
        <span className="">{nameInitials}</span>

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
          {dropdownItems.map((item, index) => (
            <DropdownItem
              item={item}
              key={index}
              closeDropdown={closeDropdown}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
