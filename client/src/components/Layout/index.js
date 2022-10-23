import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Footer";
import Header from "../Header/index";
import { MenuHeader } from "../MenuHeader";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  return (
    <>
      <div className="headerImage">
        <img
          src="https://res.cloudinary.com/shoplaptop/image/upload/v1657688316/backgroudheader_lautej.webp"
          style={{ height: "50px", width: "100%" }}
        ></img>
        <Header className="header" />
      </div>
      {/* <MenuHeader/>  */}
      {props.children}
      <Footer />
    </>
  );
};
