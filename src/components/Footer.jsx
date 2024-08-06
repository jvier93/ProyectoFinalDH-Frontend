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
    <footer className="bg-secondary  w-full  ">
      <div className=" flex flex-col gap-2   lg:flex-row items-center justify-between px-12 py-7 text-white">
        <Logo />

        <span className="hidden lg:block  w-0.5 bg-white h-48"></span>

        <div className="flex flex-col my-8 items-center gap-4 lg:gap-8">
          <Link to="/">
            <p>Términos y condiciones</p>
          </Link>
          <Link to="/">
            <p>Aviso de privacidad</p>
          </Link>
          <Link to="/">
            <p>Política de privacidad</p>
          </Link>
        </div>

        <span className="hidden lg:block w-0.5 h-48 bg-white "></span>

        <div className="flex flex-col items-center gap-5 px-10">
          <p>Seguinos</p>
          <div className=" space-x-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                size="2x"
                className="text-black"
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
                className=" text-black"
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
                className="text-black"
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
                className="text-black"
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
