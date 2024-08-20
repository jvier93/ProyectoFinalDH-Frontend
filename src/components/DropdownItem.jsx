import { Link } from "react-router-dom";

const DropdownItem = ({ item, closeDropdown }) => {
  return (
    <li
      onClick={closeDropdown}
      className="  py-2 text-left md:mx-2 md:text-center "
    >
      {item.type === "link" && (
        <Link className=" hover:underline " to={item.link}>
          {item.text}
        </Link>
      )}

      {item.type === "button" && (
        <button onClick={item.action} className="  hover:underline ">
          {item.text}
        </button>
      )}
    </li>
  );
};

export default DropdownItem;
