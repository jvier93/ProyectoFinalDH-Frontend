import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="h-[3000px] w-full font-normal font-Inter bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
}
