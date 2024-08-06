import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex h-[2000px] flex-col ">
      <Navbar />

      <Outlet />

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
