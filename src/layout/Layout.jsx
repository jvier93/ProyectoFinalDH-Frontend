import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Layout = () => {
  // Sets up the main layout of the entire webpage.
  // Since React Router does not reset the scroll position by default, we use `useLocation` to detect route changes
  // and `useLayoutEffect` to reset the scroll position on route changes.

  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-Inter">
      <Header />

      <div className="flex-grow">
        <Outlet />
      </div>

      <a
        href="https://wa.me/59894852661"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366]"
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          style={{ color: "#fff", fontSize: "48" }}
          className="fixed bottom-12 right-8 h-16 w-16 rounded-full bg-[#25D366] transition delay-0 duration-500 ease-in-out hover:scale-125"
        />
      </a>

      <Footer />
    </div>
  );
};

export default Layout;
