import { Link } from "react-router-dom";

export const Logo = ({ logoUrl }) => {
  return (
    <div className="w-fit">
      <Link to="/">
        <img src={logoUrl} alt="logo app" className="w-44 md:w-80" />
      </Link>
    </div>
  );
};
