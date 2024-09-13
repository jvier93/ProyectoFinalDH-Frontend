import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="w-fit">
      <Link to="/">
        <img src="/images/logo.svg" alt="logo app" className="w-40 md:w-full" />
      </Link>
    </div>
  );
};
