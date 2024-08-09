import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex-grow mt-[120px]">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
