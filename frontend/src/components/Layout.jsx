import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeContext } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      <Header />
      <main className={`pt-28 flex-grow ${theme === "dark" ? "bg-gray-900" : ""}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
