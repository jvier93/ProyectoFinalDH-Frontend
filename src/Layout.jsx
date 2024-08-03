import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex h-[2000px] flex-col ">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
