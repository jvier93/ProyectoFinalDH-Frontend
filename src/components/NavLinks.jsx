import { Dropdown } from "@/components/Dropdown";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const NavLinks = ({ isSmallScreen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  // The 'show' property in the links array is an expression. When rendering the links,
  // we evaluate the 'show' expression, and if it's true, the corresponding link is rendered.

  const links = [
    {
      id: 1,
      show: !user && currentPath !== "/signup",
      name: "Crear cuenta",
      path: "/signup",
    },
    {
      id: 2,
      show: !user && currentPath !== "/login",
      name: "Iniciar sesión",
      path: "/login",
    },
  ];

  return (
    <>
      {links.map(
        (link) =>
          link.show && (
            <Link
              className="rounded-md border px-6 text-white transition-colors hover:bg-white hover:text-primary"
              key={link.id}
              to={link.path}
            >
              {link.name}
            </Link>
          ),
      )}
      {user && <Dropdown isSmallScreen={isSmallScreen} />}
    </>
  );
};
