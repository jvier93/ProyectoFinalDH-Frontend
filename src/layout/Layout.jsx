import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { useLayoutEffect } from "react";

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

      <Footer />
    </div>
  );
};

export default Layout;
