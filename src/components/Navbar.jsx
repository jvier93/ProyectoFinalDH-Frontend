import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-secondary fixed top-0 w-full  h-[120px] flex items-center justify-between px-12 py-2">
      <Link to="/">
        <img src="./images/logo.svg" alt="logo app" className=" " />
      </Link>

      <div className="flex gap-14">
      <Link to="/register">
        <button className="rounded-full bg-white px-6 text-tertiary">
          Crear cuenta
        </button>
        </Link>
        
        <Link to="/login">
        <button className="rounded-full bg-white px-6 text-tertiary">
          Iniciar sesión
        </button>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
