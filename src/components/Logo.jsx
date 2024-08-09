import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img
          src="./public/images/logo.svg"
          alt="logo app"
          className="w-40 md:w-full"
        />
      </Link>
    </div>
  );
};
