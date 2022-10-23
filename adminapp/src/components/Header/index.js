import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";
import "./style.css";
import { FaUser } from "react-icons/fa";
import swal from "sweetalert";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { Alert, Avatar, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
/**
 * @author
 * @function Header
 **/
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    swal("Đăng xuất thành công", {
      icon: "success",
    });
    dispatch(signout());
  };
  const renderNonLoggerInLinks = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className={`nav-link ${
              window.location.pathname === "/signin" ? "active" : ""
            }`}
            href="/signin"
          >
            <FaUser className="far fa-user mr-2 tm-logout-icon" />
            <span>Đăng nhập</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              window.location.pathname === "/signup" ? "active" : ""
            }`}
            href="/signup"
          >
            <FaUser className="far fa-user mr-2 tm-logout-icon" />
            <span>Đăng ký</span>
          </a>
        </li>
      </ul>
    );
  };

  const renderLoggedInLinks = () => {
    return (
      <div style={{ display: "contents" }}>
        <Badge
          badgeContent={4}
          color="success"
          style={{ cursor: "pointer", marginRight: "20px" }}
        >
          <MailIcon color="action" />
        </Badge>

        <ul className="navbar-nav" onClick={logout}>
          <li className="nav-item">
            <a className="nav-link d-flex">
              {/* <FaUser className="far fa-user mr-2 tm-logout-icon" /> */}
              <Avatar
                alt="Remy Sharp"
                src="https://i.pinimg.com/originals/e3/a4/8c/e3a48c0ff8d963362741622ec7c155b5.jpg"
              />

              <span style={{ marginTop: "10px" }}>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <nav
          className="navbar navbar-expand-xl navbar-light bg-darkgray"
          style={{ backgroundColor: "darkgray" }}
        >
          <a className="navbar-brand" href="/">
            <HomeIcon sx={{ fontSize: 40 }} />
            <h1 className="tm-site-title mb-0">Trang chủ</h1>
          </a>
          <button
            className="navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    window.location.pathname === "/" ? "active" : ""
                  }`}
                  href="/"
                >
                  Trang chủ
                  <span className="sr-only"></span>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    window.location.pathname === "/products" ? "active" : ""
                  }`}
                  href="/products"
                >
                  Sản phẩm
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    window.location.pathname === "/category" ? "active" : ""
                  }`}
                  href="/category"
                >
                  Thương hiệu
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    window.location.pathname === "/orders" ? "active" : ""
                  }`}
                  href="/orders"
                >
                  Kiểm duyệt đơn hàng
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    window.location.pathname === "/user" ? "active" : ""
                  }`}
                  href="/user"
                >
                  Người dùng{" "}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    window.location.pathname === "/managerPost" ? "active" : ""
                  }`}
                  href="/managerPost"
                >
                  Quản lý bài giới thiệu{" "}
                </a>
              </li>
            </ul>
            {auth.authenticate
              ? renderLoggedInLinks()
              : renderNonLoggerInLinks()}
          </div>
        </nav>
      </div>
    </div>
  );
};
