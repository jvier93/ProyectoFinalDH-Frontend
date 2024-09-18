import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Logo } from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary">
      <div className="mx-auto flex max-w-[1366px] flex-col items-center justify-between gap-2 py-7 text-white lg:flex-row">
        <div className="flex flex-col items-center gap-2">
          <Logo logoUrl={"/images/logo-white.png"} />
          <p className="text-center">
            {`© ${new Date().getFullYear()} Homehelper. Todos los derechos reservados`}{" "}
          </p>
        </div>

        <span className="hidden h-48 w-0.5 bg-white lg:block"></span>

        <div className="my-8 flex flex-col items-center gap-4 lg:gap-8">
          <Link to="/">
            <p className="hover:underline hover:duration-300">Términos y condiciones</p>
          </Link>
          <Link to="/">
            <p className="hover:underline hover:duration-300">Aviso de privacidad</p>
          </Link>
          <Link to="/">
            <p className="hover:underline">Política de privacidad</p>
          </Link>
        </div>

        <span className="hidden h-48 w-0.5 bg-white lg:block"></span>

        <div className="flex flex-col items-center gap-5 px-10">
          <p>Seguinos</p>
          <div className="space-x-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                size="2x"
                className="text-white transition-colors hover:text-textPrimary"
                icon={faXTwitter}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                size="2x"
                className="text-white hover:text-textPrimary"
                icon={faInstagram}
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                size="2x"
                className="text-white hover:text-textPrimary"
                icon={faYoutube}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                size="2x"
                className="text-white hover:text-textPrimary"
                icon={faLinkedin}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
