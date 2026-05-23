import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
