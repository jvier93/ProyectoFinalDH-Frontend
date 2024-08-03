import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";

export default function App() {
  return (
    <div className="font-normal font-Inter bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
