import { Link } from "react-router-dom";

const Button = ({ to, onClick, variant, size, children }) => {
  const variants = {
    primary: "border-transparent text-white bg-primary hover:bg-teal-600",
    white:
      " border-white text-white bg-transparent hover:bg-white hover:text-primary",
    outline:
      " border-gray-400 text-gray-500 hover:border-primary hover:text-primary ",
  };

  const sizes = {
    small: "",
    medium: "py-2",
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`flex w-fit cursor-pointer items-center justify-center rounded-md border px-6 transition-colors ${variants[variant]} ${sizes[size]}`}
      >
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex w-fit cursor-pointer items-center justify-center rounded-md border px-6 transition-colors ${variants[variant]} ${sizes[size]}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
