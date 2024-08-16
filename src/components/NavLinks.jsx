import { Link } from "react-router-dom";

export const NavLinks = () => {
  const links = [
    { id: 1, name: "Crear cuenta", path: "/signup" },
    { id: 2, name: "Iniciar sesion", path: "#" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          className="rounded-full bg-white px-6 text-tertiary"
          key={link.id}
          to={link.path}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};
