import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col font-Inter ">
      <Header />
      <div className="flex-grow ">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
