import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
import Home from "@/routes/Home";

export default function App() {
  return (
    <div className="font-normal font-Inter bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
