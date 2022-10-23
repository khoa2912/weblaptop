import React, { useEffect, useState } from "react";
import {
  IoCartOutline,
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoInstagram,
  IoSearchOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Notification/Notification";
import {
  FaLuggageCart,
  FaGooglePlusG,
  FaFacebook,
  FaGooglePlay,
  FaApple,
  FaUserTie,
} from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import {
  getAllCategory,
  getAllProducts,
  getCartItems,
  getOrders,
  getToken,
  getUser,
  login,
  searchProduct,
  signout,
  signup,
} from "../../actions";
import "../../../node_modules/antd/dist/antd.css";

import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { Anchor, Button, Modal } from "../MaterialUI";
import logo from "../../images/img/logo_shop.svg";
import qrcode from "../../images/img/qr_code.png";
import qrAppStore from "../../images/img/app_store.png";
import qrGooglePlay from "../../images/img/google_play.png";
import formatThousand from "../../utils/formatThousans";
import { addToCart, removeCartItem } from "../../actions";
import "./style.css";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { CartPage } from "../../containers/CartPage";
import { LoginPage } from "../../containers/LoginPage";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { message, notification } from "antd";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu as MenuANTD } from "antd";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const Header = (props) => {
  notification.config({
    placement: "topRight",
    top: 80,
    duration: 1.2,
    rtl: false,
    maxCount: 3,
  });
  const [signinModal, setSigninModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const searchQuery = useLocation().search;
  const { q } = queryString.parse(searchQuery);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [search, setSearch] = useState(q);
  const [CheckoutPage, SetCheckoutPage] = useState("0");
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { cartItems } = useSelector((state) => state.cart);
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const refreshtoken = localStorage.getItem("refreshtoken");

    if (firstLogin && refreshtoken) {
      dispatch(getToken(refreshtoken));
    }
  }, [dispatch]);
  // useEffect(()=>{
  //   if(auth.token){
  //     message.success('Đăng nhập thành công!')
  //   }
  // },[auth.token,auth.error])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser(token, props.history));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".header");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 50
        ? header.classList.add("is-sticky")
        : header.classList.remove("is-sticky");
    }
  };
  const items = [
    {
      label: "Laptop",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Bàn phím",
      key: "app",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Màn hình",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          PC
        </a>
      ),
      key: "alipay",
    },
  ];
  // useEffect(() => {
  //   if(token){
  //     dispatch(getCartItems());
  //     dispatch(getOrders());
  //   }
  //   console.log('app')
  // }, [token]);

  const handleLogin = () => {
    dispatch(login({ email, password }));
    setSigninModal(false);
  };
  const handleSignUp = () => {
    dispatch(signup({ email, password, firstName, lastName }));
    setSignupModal(false);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(signout()).then(() => {
      notification["success"]({
        message: "Đăng xuất",
        description: "Đăng xuất thành công!",
      });
    });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e) => {
    if (search === "" || search === undefined) {
      return;
    } else {
      const payload = {
        stringQuery: search,
      };
      dispatch(searchProduct(payload));
      history.push(`/search?q=${search}&page=1`);
    }
  };
  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      if (search === "" || search === undefined) {
        e.preventDefault();
      } else {
        const payload = {
          stringQuery: search,
        };
        console.log(payload);
        dispatch(searchProduct(payload));
        history.push(`/search?q=${search}&page=1`);
        console.log(123);
      }
    }
  };
  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };
  const renderSigninModal = () => (
    <Modal
      visible={signinModal}
      onClose={() => setSigninModal(false)}
      title="Đăng nhập"
    >
      <div className="row">
        <div className="col sm-12 md-12 lg-12">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="col sm-12 md-12 lg-12 mt-16">
          <Input
            placeholder="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="col sm-12 md-12 lg-12 mt-16 text-align-right">
          <Anchor title="Quên mật khẩu ?" />
        </div>
        <br />
        <div className="col sm-12 md-12 lg-12 mt-16">
          <Button black="yes" title="Đăng nhập" onClick={handleLogin} />
        </div>
        <br />
        <div className="col sm-12 md-12 lg-12 mt-16">
          <Anchor
            title="Bạn chưa có tài khoản? Đăng ký tại đây"
            onClick={() => {
              setSigninModal(false);
              setSignupModal(true);
            }}
          />
        </div>
        <br />
        <div className="col sm-12 md-12 lg-12 mt-16 socials flex-center">
          <p className="socials__label">Kết nối tài khoản mạng xã hội</p>
          <div className="socials__icons mt-8">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="socials__icons--facebook"
            >
              <IoLogoFacebook />
            </a>
            <a
              href="http://google.vn"
              target="_blank"
              rel="noreferrer"
              className="socials__icons--google"
            >
              <IoLogoGoogle />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
  const renderSignupModal = () => (
    <Modal
      visible={signupModal}
      onClose={() => setSignupModal(false)}
      title="Đăng ký"
    >
      <div className="">
        <div className="sm-12 md-12 lg-12">
          <Input
            placeholder="Họ"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <br />
        <div className="sm-12 md-12 lg-12 mt-16">
          <Input
            placeholder="Tên"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <br />
        <div className="sm-12 md-12 lg-12 mt-16">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="sm-12 md-12 lg-12 mt-16">
          <Input
            placeholder="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="sm-12 md-12 lg-12 mt-16 ">
          <Button black="yes" title="Đăng ký" onClick={handleSignUp} />
        </div>
        <br />
        <div className="sm-12 md-12 lg-12 mt-16">
          <Anchor
            title="Bạn đã có tài khoản ? Đăng nhập tại đây"
            onClick={() => {
              history.push("/login");
              setSignupModal(false);
            }}
          />
        </div>
        <br />
        <div className="sm-12 md-12 lg-12 mt-16 socials flex-center">
          <p className="socials__label">Kết nối tài khoản mạng xã hội</p>
          <div className="socials__icons mt-8">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="socials__icons--facebook"
            >
              <IoLogoFacebook />
            </a>
            <a
              href="http://google.vn"
              target="_blank"
              rel="noreferrer"
              className="socials__icons--google"
            >
              <IoLogoGoogle />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
  const renderSignedInHeader = () => (
    <>
      <li className="header__navbar-item header__navbar--user">
        <FaUserTie className="img__navbar--user" />
        <span className="span_navbar--user" onClick={handleClick}>
          {auth.user.lastName}
        </span>

        {/* <ul className="navbar__user-list">
        <li className="navbar__user-list-item" to="/account">
          <a href="/account">Tài khoản của tôi</a>
        </li>
        <li className="navbar__user-list-item">
          <a href="/account/address">Địa chỉ của tôi</a>
        </li>

        <li className="navbar__user-list-item" to="/account/orders">
          <a href="/account/orders">Đơn mua</a>
        </li>
        <li
          className="navbar__user-list-item navbar__user-list-item--separate"
          style={{ color: "black" }}
        >
          <a onClick={handleLogout}>Đăng xuất</a>
        </li>
      </ul> */}
      </li>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box> */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            fontSize: "17px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              fontSize: "17px",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 11,
            },
          },
        }}
        style={{ fontSize: "17px" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/account" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem style={{ fontSize: "15px" }}>
            <ListItemIcon>
              <Avatar sizes="small" />
            </ListItemIcon>{" "}
            Thông tin tài khoản
          </MenuItem>
        </Link>
        <Link
          to="/account/orders"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem style={{ fontSize: "15px" }}>
            <ListItemIcon>
              <ShoppingBasketIcon
                fontSize="small"
                style={{ fontSize: "15px", marginRight: "10px" }}
              />
            </ListItemIcon>{" "}
            Đơn hàng của tôi
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem style={{ fontSize: "15px" }}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem style={{ fontSize: "15px" }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={handleLogout} style={{ fontSize: "15px" }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
  const renderUnSignedInHeader = () => (
    <>
      <Link to={"/login"}>
        <span className="header__navbar-item header__navbar-item--strong">
          Đăng nhập
        </span>
      </Link>

      <Link to={"/register"}>
        <span className="header__navbar-item header__navbar-item--strong">
          Đăng ký
        </span>
      </Link>
    </>
  );
  const getItemQuantity = () => {
    let sum = 0;
    if (!cartItems) return 0;
    Object.keys(cartItems).forEach((key) => {
      sum += cartItems[key].quantity;
    });
    return sum;
  };
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  const notifications = [
    { id: 0, color: "warning", message: "Check out this awesome ticket" },
    {
      id: 1,
      color: "success",
      type: "info",
      message: "What is the best way to get ...",
    },
    {
      id: 2,
      color: "secondary",
      type: "notification",
      message: "This is just a simple notification",
    },
    {
      id: 3,
      color: "primary",
      type: "e-commerce",
      message: "12 new orders has arrived today",
    },
  ];
  return (
    <>
      <header className="header">
        <div className="header__top">
          <div className="grid wide">
            <nav className="header__navbar">
              <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
                  Vào cửa hàng trên ứng dụng Shop Laptop
                  <div className="header__qr">
                    <img
                      src={qrcode}
                      alt="QR Code"
                      className="header__qr-img"
                    />
                    <div className="header__qr-apps">
                      <a href="" className="header__qr-link">
                        <img
                          src={qrGooglePlay}
                          alt="Google Play"
                          className="header__app-download"
                        />
                      </a>
                      <a href="" className="header__qr-link">
                        <img
                          src={qrAppStore}
                          alt="App Store"
                          className="header__app-download"
                        />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="header__navbar-item">
                  <span className="header__navbar-title--no-pointer">
                    Kết nối
                    <a
                      href="http://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="navbar__icon-link"
                    >
                      <FaFacebook className="navbar__item-icon fab" />
                    </a>
                    <a
                      href="http://google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="navbar__icon-link"
                    >
                      <FaGooglePlusG className="navbar__item-icon fab" />
                    </a>
                  </span>
                </li>
              </ul>

              <ul className="header__navbar-list">
                <Badge
                  badgeContent={4}
                  color="success"
                  sx={{ fontSize: 10, marginTop: "7px", marginRight: "10px" }}
                  onClick={(e) => {
                    setNotificationsMenu(e.currentTarget);
                    setIsNotificationsUnread(false);
                  }}
                >
                  <MailIcon fontSize="large" color="action" />
                </Badge>
                <Menu
                  id="notifications-menu"
                  open={notificationsMenu}
                  anchorEl={notificationsMenu}
                  onClose={() => setNotificationsMenu(null)}
                  // className={classes.headerMenu}
                  // disableAutoFocusItem
                >
                  {notifications.map((notification) => (
                    <MenuItem
                      key={notification.id}
                      onClick={() => setNotificationsMenu(null)}
                      // className={classes.headerMenuItem}
                    >
                      <Notification
                        {...notification}
                        typographyVariant="inherit"
                      />
                    </MenuItem>
                  ))}
                </Menu>
                {auth.authenticate
                  ? renderSignedInHeader()
                  : renderUnSignedInHeader()}
              </ul>
            </nav>
          </div>
        </div>
        <div className="header__middle">
          <div className="grid wide">
            <div className="header__middle-container">
              <div className="header__logo" style={{ width: "20%" }}>
                <Link className="backhome__with-logo" to={"/"}>
                  <img src={logo} alt="" className="img__logo-shop" />
                  <span
                    className="backhome__with-logo-name"
                    style={{ top: "-1px" }}
                  >
                    Shop Laptop
                  </span>
                </Link>
              </div>

              {/* <div
                className="search-bar col lg-6"
                style={{ height: "50%", width: "40%", marginRight: "14%" }}
              > */}
              <Search
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={handleSearch}
                size="large"
                enterButton
                style={{
                  width: "40%",
                  marginRight: "30%",
                }}
              />
              {/* <div>
                  <Input
                    value={search}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar__input"
                    placeholder="Nhập từ khóa cần tìm"
                  />
                  <button onClick={handleSearch} className="search-bar__button">
                    <IoSearchOutline className="search-bar__button-icon" />
                  </button>
                </div> */}
              {/* <button onClick={handleSearch} className="search-bar__button">
                  <LoyaltyIcon className="search-bar__button-icon"></LoyaltyIcon>
                </button> */}
              {/* </div> */}

              {/* <div className="cart__info">
                  <p className="cart__info-label">Giỏ hàng</p>
                  <span className="cart__info-count">
                    {getItemQuantity() > 1
                      ? getItemQuantity() + " items"
                      : getItemQuantity() + " item"}
                  </span>
                </div> */}
              {/* Cart */}
              <LoyaltyIcon
                fontSize="large"
                style={{
                  height: "50%",
                  color: "aliceblue",
                  width: "70px",
                  cursor: "pointer",
                }}
              ></LoyaltyIcon>
              <Link
                to={`${auth.authenticate ? "/cart" : "/login"}`}
                className="header__cart"
                onClick={() =>
                  auth.authenticate
                    ? history.push("/cart")
                    : history.push("/login")
                }
              >
                <div className="header__cart-wrap">
                  <FaLuggageCart className="header__cart-icon fas" />
                  <span className="header__cart-notice">
                    {Object.keys(cartItems).length}{" "}
                  </span>
                  {/* <!-- Use className  header__cart-list--no-cart When no item in cart--> */}
                  <div className="header__cart-list">
                    <img
                      src={"./assets/img/nocart.png"}
                      alt=""
                      className="img__no-cart"
                    />
                    <span className="span__no-cart-msg">Chưa có sản phẩm</span>

                    {/* <!-- Cart item --> */}
                    <h3 className="header__cart-heading">Sản phẩm đã thêm</h3>
                    <ul className="header__cart-list-item">
                      {cartItems &&
                        Object.keys(cartItems).map((key, index) => (
                          <li
                            className="cart-list-item"
                            key={cartItems[key]._id}
                          >
                            <img
                              src={cartItems[key].img}
                              alt=""
                              className="img__cart-item"
                            />
                            <div className="cart-list-item--info">
                              <div className="cart-list-item-head">
                                <h4 className="cart-list-item-title">
                                  {cartItems[key].name}
                                </h4>
                                <div className="cart-item-info-wrap">
                                  <span className="cart-item-price">
                                    {cartItems[key].salePrice &&
                                      formatThousand(
                                        cartItems[key].salePrice
                                      )}{" "}
                                    ₫
                                  </span>
                                  <span className="cart-item-multiply">x</span>
                                  <span className="cart-item-quantity">
                                    {cartItems[key].qty}
                                  </span>
                                </div>
                              </div>
                              <div
                                className="cart-list-item-body"
                                onClick={() =>
                                  onRemoveCartItem(cartItems[key]._id)
                                }
                              >
                                <span
                                  className="cart-item-remove"
                                  onClick={() =>
                                    onRemoveCartItem(cartItems[key]._id)
                                  }
                                >
                                  Xóa
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>

                    <button
                      href="/cart"
                      className="btn btn__primary  btn__cart-select-all"
                    >
                      Xem giỏ hàng
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* <MenuANTD
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="menuHeader"
        items={items}
        style={{
          // justifyContent: "center",
          backgroundColor: "#e6f3ff",
          fontSize: "14px",
          paddingLeft: "100px",
          // border: "1px",
          height: "45px",
        }}
      /> */}
      {renderSigninModal()}
      {renderSignupModal()}
    </>
  );
};

export default Header;
