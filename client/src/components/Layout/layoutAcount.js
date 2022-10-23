import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import Header from "../Header/index";
import { MenuHeader } from "../MenuHeader";
import "./style.css";
import { FaUserTie, FaUser, FaFileAlt, FaBell } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { Badge } from "antd";
/**
 * @author
 * @function LayoutAccount
 **/

export const LayoutAccount = (props) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const pathname = window.location.pathname;

  return (
    <>
      <Header />
      <div class="account__content-wrap" style={{ display: "flex" }}>
        <div class="account__content">
          {/* <!-- Thông tin bên trái ứng với column 2 --> */}
          <div class="account__content-2">
            {/*  <!-- Tên và ảnh --> */}
            <div class="user__info">
              <span class="user__info-img">
                <Avatar
                  alt="Remy Sharp"
                  src="https://newsmd2fr.keeng.net/tiin/archive/images/20211122/092825_khanh_huyen_2k4_1.jpg"
                />
              </span>
              <div class="user__info-name">
                {auth.user.firstName + " " + auth.user.lastName}
                <a class="user__info-edit-wrap">
                  <span class="user__info-edit-icon">
                    <i class="fas fa-edit"></i>
                  </span>
                  Sửa Hồ Sơ
                </a>
              </div>
            </div>

            <div class="my__account">
              <span class="my__account-icon">
                <FaUser />
              </span>
              Tài Khoản Của Tôi
            </div>

            <div class="wrap__account-info">
              <a
                href="/account"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span
                  className={`account-info--title account__title-blue${
                    window.location.pathname === "/account" && "-active"
                  }`}
                >
                  Hồ Sơ
                </span>
              </a>
              <a
                href="/account/address"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span
                  class={`account-address-title${
                    window.location.pathname === "/account/address" && "-active"
                  }`}
                >
                  Địa Chỉ
                </span>
              </a>
            </div>
            <Badge size="small" count={user.orders.length}>
              <a
                href="/account/orders"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  class={`wrap__purchase-orders${
                    window.location.pathname === "/account/orders" && "-active"
                  }`}
                  style={{ fontSize: "1.5rem", padding: "7px 0" }}
                >
                  <span class="purchase-orders-icon">
                    <FaFileAlt />
                  </span>
                  Quản Lý Đơn Hàng
                </div>
              </a>
            </Badge>
            <div class="wrap__notify">
              <span class="notify-icon">
                <FaBell />
              </span>
              Thông Báo
            </div>
          </div>
          {props.children}
        </div>

        {/* <MenuHeader/>  */}
      </div>

      <Footer />
    </>
  );
};
