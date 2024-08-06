import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-secondary fixed top-0 w-full  h-[120px] flex items-center justify-between px-12 py-2">
      <Link to="/">
        <img src="./images/logo.svg" alt="logo app" className=" " />
      </Link>

      <nav className="flex gap-14">
        <Link to="/register">
          <button className="rounded-full bg-white px-6 text-primaryLight">
            Crear cuenta
          </button>
        </Link>

        <Link to="/login">
          <button className="rounded-full bg-white px-6 text-primaryLight">
            Iniciar sesión
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
