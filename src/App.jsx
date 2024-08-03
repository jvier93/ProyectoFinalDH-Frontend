import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Routes/Login";
import Register from "./Routes/Register.jsx";

export default function App() {
  return (
    <div className="h-[3000px] w-full font-normal font-Inter bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}
