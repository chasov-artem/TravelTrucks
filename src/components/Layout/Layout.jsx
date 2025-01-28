import { Outlet } from "react-router-dom";
// import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
