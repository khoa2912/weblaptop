import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  addOrder,
  addToCart,
  getAddress,
  getCartItems,
  removeCartItem,
  resetCart,
  updateCart,
} from "../../actions";
import { Layout } from "../../components/Layout";
import {
  Anchor,
  Input,
  MaterialButton,
  MaterialInput,
  Modal,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import formatThousand from "../../utils/formatThousans";
import { CartPage } from "../CartPage/index";
import AddressForm from "./AddressForm";
import { FaEdit, FaCheck, FaDotCircle } from "react-icons/fa";
import slugify from "react-slugify";
import "./style.css";

import {
  Alert,
  Tag,
  Spin,
  Select,
  message,
  Popconfirm,
  Result,
  Button,
} from "antd";
import { Link } from "react-router-dom";
/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const [spinning, setSpinning] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [id, setId] = useState("");
  const { Option } = Select;
  const { initialData } = props;
  const [listTinh, setListTinh] = useState([]);
  const [listHuyen, setListHuyen] = useState([]);
  const [listXa, setListXa] = useState([]);
  const [tinh, setTinh] = useState("");
  const [tinhName, setTinhName] = useState("");
  const [huyen, setHuyen] = useState("");
  const [huyenName, setHuyenName] = useState("");
  const [xa, setXa] = useState("");
  const [xaName, setXaName] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [checkoutSuccess, SetCheckoutSuccess] = useState(false);
  const [shipAmount, setShipAmount] = useState(10);
  const [methodShip, setMethodShip] = useState([]);
  const onAddressSubmit = (e) => {
    if (validationForm()) {
      const payload = {
        address: {
          name: name,
          mobileNumber,
          address: addressDetail,
          provinceID: tinh,
          provinceName: tinhName,
          districtID: huyen,
          districtName: huyenName,
          wardID: xa,
          wardName: xaName,
        },
      };
      if (id) {
        payload.address._id = id;
      }
      dispatch(addAddress(payload));
      setAddAddressModal(false);
      message.success("Thêm mới địa chỉ thành công!");
      dispatch(getAddress());
      handleResetForm();
    } else {
      message.warning("Vui lòng điền đầy đủ thông tin!");
    }
  };
  const validationForm = () => {
    if (
      name === "" ||
      mobileNumber === "" ||
      address === "" ||
      tinh === "" ||
      huyen === "" ||
      xa === ""
    ) {
      return false;
    }
    return true;
  };
  const handleResetForm = () => {
    setName("");
    setMobileNumber("");
    setAddress("");
    setTinh("");
    setHuyen("");
    setXa("");
    setTinhName("");
    setHuyenName("");
    setXaName("");
  };
  useEffect(() => {
    document.title = "Thanh toán";
  }, []);
  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
    getApiTinh();
  }, [auth.authenticate]);
  const handleChangeTinh = (e) => {
    setTinhName(listTinh[e].ProvinceName);
    setTinh(listTinh[e].ProvinceID);
    getApiHuyen(listTinh[e].ProvinceID);
  };
  const handleChangeHuyen = (value) => {
    getApiXa(listHuyen[value].DistrictID);
    setHuyen(listHuyen[value].DistrictID);
    setHuyenName(listHuyen[value].DistrictName);
  };
  const handleChangeXa = (value) => {
    setXa(listXa[value].WardCode);
    setXaName(listXa[value].WardName);
  };
  const getApiTinh = async () => {
    const response = await fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "cors",
          Host: "api.producthunt.com",
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
        },
      }
    ).then((response) => response.json());

    // update the state
    if (response.code === 200) {
      console.log(response.data);
      setListTinh(response.data);
    }
  };
  const getMethodShip = async (to_district) => {
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=3076334&from_district=1442&to_district=${to_district}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "cors",
          Host: "api.producthunt.com",
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
        },
      }
    ).then((response) => response.json());
    console.log(response);

    // update the state
    if (response.code === 200) {
      //console.log(response)
      setMethodShip(response.data[0].service_id);
      return response.data[0].service_id;
    }
  };
  const getApiHuyen = async (value) => {
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "cors",
          Host: "api.producthunt.com",
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
        },
      }
    ).then((response) => response.json());

    // update the state
    if (response.code === 200) {
      console.log(response);
      setListHuyen(response.data);
    }
  };
  const getApiXa = async (value) => {
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "cors",
          Host: "api.producthunt.com",
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
        },
      }
    ).then((response) => response.json());

    // update the state
    if (response.code === 200) {
      console.log(response);
      setListXa(response.data);
    }
  };
  const selectAddress = (addr) => {
    setSpinning(true);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    // console.log(addr);
    setAddress(updatedAddress);
    getMethodShip(addr.districtID).then((data) => {
      getShipOrder(data, addr).then(() => {
        setSpinning(false);
      });
    });
    // getShipOrder(methodShip, addr).then(() => {
    //   setSpinning(false);
    // });
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        return (
          totalPrice + cart.cartItems[key].salePrice * cart.cartItems[key].qty
        );
      },
      shipAmount
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
      shipAmount,
    };
    console.log(payload);
    dispatch(addOrder(payload)).then(() => {
      SetCheckoutSuccess(true);
      dispatch(resetCart());
    });
    // setConfirmOrder(true);
  };
  const getShipOrder = async (value, address, number = 1) => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        return (
          totalPrice + cart.cartItems[key].salePrice * cart.cartItems[key].qty
        );
      },
      0
    );
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${value}&insurance_value=${totalAmount}&to_ward_code=${
        address.wardID
      }&to_district_id=${address.districtID}&from_district_id=1442&weight=${
        2000 * number
      }&length=50&width=50&height=7&to_district=${value}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "cors",
          Host: "api.producthunt.com",
          token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
          shop_id: "3076334",
        },
      }
    ).then((response) => response.json());
    console.log(response);
    // update the state
    if (response.code === 200) {
      //console.log(response)
      setShipAmount(response.data.total);
    }
  };

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    user.address.length === 0 && setNewAddress(false);
    confirmDeliveryAddress(address[0]);
    if (address[0]) {
      address[0].selected = true;
      setAddress(address);
      console.log(address[0]);
      getMethodShip(address[0].districtID).then((data) => {
        getShipOrder(data, address[0]);
      });
    }
  }, [user.address]);

  // useEffect(() => {
  //   if (confirmOrder && user.placedOrderId) {
  //     props.history.push(`/order_details/${user.placedOrderId}`);
  //   }
  // }, [user.placedOrderId]);
  const renderAddAddress = () => (
    <Modal
      visible={addAddressModal}
      onClose={() => setAddAddressModal(false)}
      title="Thêm địa chỉ"
    >
      <div id="modal__address">
        <div id="modal__overlay-address"></div>
        <div id="modal__overlay-address-bold"></div>
        <div class="modal__body-address">
          <div class="show__input-address">
            <h2 class="show__address-title">Thông tin người nhận hàng</h2>
            <span class="input__info-name-title">Họ và tên</span>
            <Input
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div class="wrap__phone-and-email" style={{ padding: "20px 0" }}>
              <div class="wrap__phone-inf">
                <div class="input__info-phone-title">Số điện thoại</div>
                <Input
                  placeholder="Số điện thoại"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <h2 class="show__address-title">Địa chỉ nhận hàng</h2>
            <div
              class="content__transport1"
              style={{ display: "flex", marginTop: "10px" }}
            >
              <Select
                defaultValue={""}
                style={{
                  width: 180,
                  marginRight: "20px",
                }}
                onChange={(e) => handleChangeTinh(e)}
              >
                {listTinh &&
                  listTinh.map((item, index) => (
                    <Option value={index} key={index}>
                      {item.ProvinceName}
                    </Option>
                  ))}
              </Select>
              <Select
                defaultValue={""}
                style={{
                  width: 180,
                  marginRight: "20px",
                }}
                onChange={handleChangeHuyen}
                disabled={tinh ? false : true}
              >
                {listHuyen &&
                  listHuyen.map((item, index) => (
                    <Option value={index}>{item.DistrictName}</Option>
                  ))}
              </Select>
              <Select
                defaultValue={""}
                style={{
                  width: 180,
                }}
                disabled={huyen ? false : true}
                onChange={handleChangeXa}
              >
                {listXa &&
                  listXa.map((item, index) => (
                    <Option value={index}>{item.WardName}</Option>
                  ))}
              </Select>
            </div>
            <div class="wrap__address-detail">
              <Input
                placeholder="Địa chỉ nhận hàng"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </div>
            <div class="save__address-wrap" style={{ padding: "10px" }}>
              <a
                onClick={() => setAddAddressModal(false)}
                class="btn btn__normal btn__cancel-address"
              >
                Hủy bỏ
              </a>
              <a
                onClick={onAddressSubmit}
                class="btn btn__primary btn__save-address"
              >
                Lưu địa chỉ
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
  return (
    <Layout>
      <Spin tip="Loading..." spinning={spinning}>
        <div
          className="cartContainer"
          style={{
            alignItems: "flex-start",
            paddingTop: "30px",
            width: "1200px",
            margin: "0 auto",
          }}
        >
          {checkoutSuccess === false ? (
            <div>
              <div className="cart__header">Thanh toán</div>
              <div class="payment__content">
                <div class="payment__method-address">
                  <div class="payment__content-wrap">
                    {/* check if user logged in or not */}
                    <div class="payment__address-wrap">
                      <div class="payment__address-titel-wrap">
                        <span class="receive-at-home">Nhận hàng tại nhà</span>
                        <span class="receive-at-shop">Nhận hàng tại Shop</span>
                      </div>
                      <div class="receive__info-wrap">
                        <span class="receive__info-title">
                          Thông tin nhận hàng
                        </span>
                        <div class="receive__address-add-wrap">
                          {address &&
                            address.map((adr) => (
                              <div
                                class="receive__address-active-current"
                                key={adr._id}
                                onClick={() => confirmDeliveryAddress(adr)}
                              >
                                <div class="receive__name-wrap">
                                  <div class="receive__name-wrap-wrap">
                                    <span class="receive__name">
                                      {adr.name}
                                    </span>
                                    <span class="receive__edit-name-icon">
                                      <FaEdit />
                                    </span>
                                  </div>
                                  <span class="icon__active-when-click">
                                    <input
                                      className="fas fa-check"
                                      checked={adr.selected}
                                      name="address"
                                      onClick={() => selectAddress(adr)}
                                      type="radio"
                                      style={{ height: "15px", width: "15px" }}
                                    />
                                  </span>
                                </div>
                                <span class="receive__phone">
                                  {adr.mobileNumber}
                                </span>
                                <div class="receive__address-detail">
                                  {/*  <!-- Phần địa chỉ --> */}
                                  <span class="address__apartment-num">
                                    {adr.address}, {adr.wardName},{" "}
                                    {adr.districtName}, {adr.provinceName}
                                  </span>
                                  {/* <span class="address__commune">Xã Hòa Lộc</span>,
                                    <span class="address__district">Huyện Bình Thái</span>,
                                    <span class="address__city">Tỉnh Bắc Ninh</span> */}
                                </div>
                              </div>
                            ))}
                          <div
                            class="receive__address-addnew"
                            onClick={() => setAddAddressModal(true)}
                          >
                            <div class="addnew__add-icon">+</div>
                            <span class="addnew__add-title">Thêm địa chỉ</span>
                          </div>
                        </div>
                        <span class="delivery__method-title">
                          Phương thức giao hàng
                        </span>
                        <div class="delivery__method-wrap">
                          <div class="delivery__method">
                            <span class="delivery__method-icon">
                              <FaDotCircle class="far fa-dot-circle" />
                            </span>
                            Giao hàng tiêu chuẩn
                          </div>
                          <span class="delivery__title-free">Miễn phí</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="payment__list-item-inf">
                    <div class="inf__orders-wrap">
                      Thông tin đơn hàng
                      <a href="" class="inf__orders-edit">
                        Chỉnh sửa
                      </a>
                    </div>
                    <ul class="list__orders">
                      {Object.keys(cart.cartItems).map((key) => {
                        return (
                          <li class="private__orders" key={key}>
                            <span class="img__private-orders">
                              <img src={cart.cartItems[key].img} alt="" />
                            </span>
                            <div class="detail__private-orders">
                              <a
                                class="title__private-orders"
                                href={`/${slugify(cart.cartItems[key].name)}/${
                                  cart.cartItems[key]._id
                                }/p`}
                              >
                                {cart.cartItems[key].name}
                              </a>
                              <div class="quantity__private-orders-wrap">
                                Số lượng
                                <span class="quantity__private-orders">
                                  {" "}
                                  {cart.cartItems[key].qty}
                                </span>
                              </div>
                              <div class="price__private-orders-wrap">
                                <div class="price__private-orders-new">
                                  {formatThousand(
                                    cart.cartItems[key].salePrice
                                  )}{" "}
                                  ₫
                                </div>
                                <div class="price__private-orders-old">
                                  {formatThousand(
                                    cart.cartItems[key].regularPrice
                                  )}{" "}
                                  ₫
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {/* Price Component and product item */}
                <div
                  class="payment__list-item"
                  style={{
                    top: "175px",
                    right: "0",
                    marginleft: "auto",
                    display: "flex",
                  }}
                >
                  <div class="payment__method-wrap">
                    <h2 class="title__payment-method">
                      Phương thức thanh toán
                    </h2>
                    <h4 class="title-info__payment-method">
                      Thông tin thanh toán của bạn sẽ luôn được bảo mật
                    </h4>
                    <div class="wrap__payment-method">
                      <div class="payment__method-banking">
                        <div class="payment__method-at-home-title">
                          Thanh toán khi nhận hàng
                          <span class="icon__click-method"></span>
                        </div>
                        <span class="payment__method-at-home-note">
                          Thanh toán bằng tiền mặt khi nhận hàng tại nhà
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="sum__payment-wrap">
                    <div class="sum__price-wrap">
                      Tạm tính
                      <span class="sum__price">
                        {formatThousand(
                          Object.keys(cart.cartItems).reduce(
                            (totalPrice, key) => {
                              return (
                                totalPrice +
                                cart.cartItems[key].salePrice *
                                  cart.cartItems[key].qty
                              );
                            },
                            0
                          )
                        )}{" "}
                        ₫
                      </span>
                    </div>
                    <div class="ship__price-wrap">
                      Phí vận chuyển
                      <span class="ship__price">
                        {formatThousand(shipAmount)} ₫
                      </span>
                    </div>
                    <div class="real__price-wrap">
                      Thành tiền
                      <span class="real__price">
                        {formatThousand(
                          Object.keys(cart.cartItems).reduce(
                            (totalPrice, key) => {
                              return (
                                totalPrice +
                                cart.cartItems[key].salePrice *
                                  cart.cartItems[key].qty
                              );
                            },
                            shipAmount
                          )
                        )}{" "}
                        ₫
                      </span>
                    </div>
                    <div class="note__vat">(Đã bao gồm VAT)</div>
                    <a
                      class="btn btn__primary btn__payment"
                      onClick={onConfirmOrder}
                    >
                      Đặt hàng ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Result
              status="success"
              title="Đặt hàng thành công!!! Cảm ơn quý khách đã tin tưởng chúng tôi."
              subTitle={`Mã đơn hàng: ${user.placedOrderId}`}
              extra={[
                <Link to={"/"}>
                  <Button type="primary" key="console">
                    Trở về trang chủ
                  </Button>
                </Link>,
                <Link to={`/order_details/${user.placedOrderId}`}>
                  <Button key="buy">Xem chi tiết đơn hàng</Button>
                </Link>,
              ]}
            />
          )}
          {renderAddAddress()}
        </div>
      </Spin>
    </Layout>
  );
};

export default CheckoutPage;
