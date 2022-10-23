import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cancalOrder, getOrders, updateCompleteOrder } from "../../actions";
import { Layout } from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { FaDonate } from "react-icons/fa";
import { Pagination } from "antd";
import { Breed } from "../../components/MaterialUI";
import { LayoutAccount } from "../../components/Layout/layoutAcount";
import formatThousand from "../../utils/formatThousans";
import "./style.css";
/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrders());
    setTotalPage(user.orders.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);
  }, []);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const getTotalPrice = (order) => {
    return order.items.reduce((totalPrice, item) => {
      return totalPrice + item.productId.salePrice * item.purchasedQty;
    }, 0);
  };
  const onChangePagination = (current, pageSize) => {
    setCurrent(current);
    setPageSize(pageSize);
    setMinIndex((current - 1) * pageSize);
    setMaxIndex(pageSize * current);
  };
  const handleStatus = (stt) => {
    switch (stt) {
      case "pending":
        return "Chờ xử lý";
        break;
      case "completed":
        return "Đã hoàn thành";
        break;
      case "cancelled":
        return "Đã hủy";
        break;
      case "refund":
        return "Đã hoàn tiền";
        break;
    }
  };
  const handlePayment = (orderStatus) => {
    if (
      orderStatus[0].isCompleted === true &&
      orderStatus[1].isCompleted === false &&
      orderStatus[2].isCompleted === false &&
      orderStatus[3].isCompleted === false
    ) {
      return "Đang đóng gói";
    } else if (
      orderStatus[0].isCompleted === true &&
      orderStatus[1].isCompleted === true &&
      orderStatus[2].isCompleted === false &&
      orderStatus[3].isCompleted === false
    ) {
      return "Đã đóng gói";
    } else if (
      orderStatus[0].isCompleted === true &&
      orderStatus[1].isCompleted === true &&
      orderStatus[2].isCompleted === true &&
      orderStatus[3].isCompleted === false
    ) {
      return "Đang giao hàng";
    } else {
      return "Đã giao hàng";
    }
  };
  return (
    <LayoutAccount>
      <div style={{ width: "80%", margin: "5px auto" }}>
        <ul class="all__orders-list">
          {user.orders.length !== 0 ? (
            user.orders.map(
              (order, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  <li class="purchase__item-info" key={order._id}>
                    <div class="purchase__item-info-wrap">
                      <div class="purchase__title-trademark-wrap">
                        Thương Hiệu:
                        <span class="purchase__title-trademark">Apple</span>
                      </div>
                      <div class="purchase__status-wrap">
                        <span class="purchase__status-icon">
                          <i class="fas fa-rocket"></i>
                        </span>
                        <span class="purchase__status">
                          {order.paymentStatus === "pending"
                            ? handlePayment(order.orderStatus)
                            : handleStatus(order.paymentStatus)}
                        </span>
                      </div>
                    </div>
                    {order.items.map((item, index) => {
                      return (
                        <a
                          href={`/order_details/${order._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div class="purchase__item-product-wrap">
                            <span class="purchase__item-product-img">
                              <img
                                src={item.productId.productPicture[0].img}
                                alt=""
                              />
                            </span>
                            <div
                              class="purchase__item-product"
                              style={{ width: "100%" }}
                            >
                              <div class="purchase__item-product-name-wrap">
                                <span class="purchase__item-product-name">
                                  {item.productId.name}
                                </span>
                                <div class="purchase__item-product-type-wrap">
                                  Phân loại hàng:
                                  <span class="purchase__item-product-type">
                                    Màu Bạc
                                  </span>
                                </div>
                                <div class="purchase__item-product-quantity-wrap">
                                  <div class="item-product-quantity-wrap">
                                    Số lượng:
                                    <span class="purchase__item-product-quantity">
                                      {" "}
                                      {item.purchasedQty}
                                    </span>
                                  </div>
                                  <span class="item-product-price">
                                    {formatThousand(item.productId.salePrice)} ₫
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                    <div class="sum__price-item-product-wrap">
                      <div class="sum__price-item">
                        <span class="sum__price-item-icon">
                          <FaDonate />
                        </span>
                        Tổng số tiền:
                      </div>
                      <span class="sum__price-item-product">
                        {formatThousand(getTotalPrice(order))} ₫
                      </span>
                    </div>
                    <div class="operation__other">
                      <a
                        style={{
                          marginRight: "20px",
                        }}
                        className={`btn btn__normal operation__return-cancel${
                          order.orderStatus[2].isCompleted === true
                            ? "--disable"
                            : ""
                        }${
                          order.paymentStatus === "completed" ? "--disable" : ""
                        }${
                          order.paymentStatus === "cancelled" ? "--disable" : ""
                        }`}
                        onClick={(e) => {
                          if (
                            order.orderStatus[2].isCompleted === true ||
                            order.paymentStatus === "completed" ||
                            order.paymentStatus === "cancelled"
                          ) {
                            e.preventDefault();
                            return;
                          }
                          const payload = {
                            orderId: order._id,
                          };
                          console.log(payload);
                          dispatch(cancalOrder(payload));
                        }}
                      >
                        Hủy
                      </a>
                      <a
                        class={`btn btn__primary operation__return-buy${
                          order.orderStatus[3].isCompleted === true
                            ? ""
                            : "--disable"
                        }${
                          order.paymentStatus === "completed" ? "--disable" : ""
                        }`}
                        onClick={(e) => {
                          if (order.orderStatus[3].isCompleted !== true) {
                            e.preventDefault();
                            return;
                          }
                          const payload = {
                            orderId: order._id,
                          };
                          console.log(payload);
                          dispatch(updateCompleteOrder(payload));
                        }}
                      >
                        Đã nhận được hàng
                      </a>
                    </div>
                  </li>
                )
            )
          ) : (
            <div>
              <h2>Quý khách chưa có đơn hàng nào</h2>
              <a href="/">Quay lại mua sắm</a>
            </div>
          )}
          <Pagination
            className="pagination"
            showSizeChanger
            onChange={onChangePagination}
            defaultPageSize={5}
            defaultCurrent={1}
            total={user.orders.length}
          />
        </ul>
      </div>
    </LayoutAccount>
  );
};

export default OrderPage;
