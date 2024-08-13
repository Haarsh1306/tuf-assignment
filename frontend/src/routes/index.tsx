import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "../pages/Banner";
import Error from "../pages/Error";
import Admin from "../pages/Admin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/banner/:id" element={<Banner />} />
        <Route path="/*" element={<Error message="404 - Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
