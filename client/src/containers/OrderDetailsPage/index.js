import React, { useEffect } from "react";
import { Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import { Layout } from "../../components/Layout";

import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import formatThousand from "../../utils/formatThousans";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  CodeSandboxOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./style.css";
const { Step } = Steps;
/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);
  useEffect(() => {
    document.title = "Đơn hàng";
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };
  const convertStatusType = (stt) => {
    switch (stt) {
      case "ordered":
        return "Đã đặt hàng";
        break;
      case "packed":
        return "Đã đóng gói";
        break;
      case "shipped":
        return "Đang giao hàng";
        break;
      case "delivered":
        return "Giao hàng thành công";
        break;
    }
  };
  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        <div class="app__orders-detail-wrap">
          <div class="app__orders-detail">
            <div class="app__orders-detail-body">
              <div
                class="app__orders-detail-body-info"
                style={{ padding: "30px 10px", margin: "10px 10px" }}
              >
                <Steps style={{ margin: "10x 10px" }}>
                  <Step
                    status={
                      orderDetails.orderStatus[0].isCompleted === true
                        ? "finish"
                        : "wait"
                    }
                    title="Đang chuẩn bị"
                    icon={<ShoppingOutlined />}
                  />
                  <Step
                    status={
                      orderDetails.orderStatus[1].isCompleted === true
                        ? "finish"
                        : "wait"
                    }
                    title="Đã đóng gói"
                    icon={<CodeSandboxOutlined />}
                  />
                  <Step
                    status={
                      orderDetails.orderStatus[2].isCompleted === true
                        ? "finish"
                        : "wait"
                    }
                    title="Đang giao hàng"
                    icon={<LoadingOutlined />}
                  />
                  <Step
                    status={
                      orderDetails.orderStatus[3].isCompleted === true
                        ? "finish"
                        : "wait"
                    }
                    title="Đã giao hàng"
                    icon={<SmileOutlined />}
                  />
                </Steps>
                <div
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    paddingRight: "20px",
                  }}
                >
                  {orderDetails.orderStatus[3].isCompleted &&
                    `Đã giao vào ngày ${formatDate2(
                      orderDetails.orderStatus[3].date
                    )}`}
                </div>
              </div>
            </div>
            <div class="app__orders-detail-header">
              <div class="app__orders-detail-header-address">
                <div class="header-address-title">Thông tin nhận hàng</div>
                <div class="header-address--name">
                  {orderDetails.address.name}
                </div>
                <div class="header-address--detail">
                  Địa chỉ nhận hàng: {orderDetails.address.address},
                  {orderDetails.address.wardName},{" "}
                  {orderDetails.address.districtName},{" "}
                  {orderDetails.address.provinceName}
                </div>
                <div class="header-address--phone">
                  Số điện thoại:
                  <span> {orderDetails.address.mobileNumber}</span>
                </div>
              </div>
              <div class="app__orders-detail-header-method">
                <div class="header-method--title">Phương thức thanh toán</div>
                <div class="header-method--detail">
                  Thanh toán khi nhận hàng
                </div>
              </div>
            </div>
            <div class="app__orders-detail-body">
              <div class="app__orders-detail-body-info">
                {orderDetails.items.map((item, index) => (
                  <div class="detail-body-info--orders">
                    <div class="detail-body-info--orders-img">
                      <img src={item.productId.productPicture[0].img} alt="" />
                    </div>
                    <div class="detail-body-info--orders-wrap">
                      <div class="detail-body-info--orders-name">
                        {item.productId.name}
                      </div>
                      <div class="detail-body-info--orders-price">
                        {formatThousand(item.productId.salePrice)} ₫ x{" "}
                        {item.purchasedQty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              class="app__orders-detail-footer"
              style={{ paddingTop: "20px" }}
            >
              <div class="detail-footer-3"></div>
              <div class="detail-footer-7">
                <table class="show__table-info">
                  <tr class="table__row-info">
                    <td class="table__row-field-title table__row-field-first">
                      Tổng tiền hàng
                    </td>
                    <td class="table__row-field-value table__row-field-first">
                      {formatThousand(
                        orderDetails.totalAmount - orderDetails.shipAmount
                      )}{" "}
                      ₫
                    </td>
                  </tr>
                  <tr class="table__row-info">
                    <td class="table__row-field-title">Phí vận chuyển</td>
                    <td class="table__row-field-value">
                      {formatThousand(orderDetails.shipAmount)} ₫
                    </td>
                  </tr>
                  <tr class="table__row-info">
                    <td class="table__row-field-title">
                      Giảm giá phí vận chuyển{" "}
                      <i class="fas fa-exclamation-circle"></i>
                    </td>
                    <td class="table__row-field-value">0 ₫</td>
                  </tr>
                  <tr class="table__row-info">
                    <td class="table__row-field-title">Tổng số tiền</td>
                    <td class="table__row-field-value table__row-field-value-bold">
                      {formatThousand(orderDetails.totalAmount)} ₫
                    </td>
                  </tr>
                  <tr class="table__row-info">
                    <td class="table__row-field-title">
                      <i class="fas fa-money-check-alt icon__table-row-method"></i>{" "}
                      Phương thức thanh toán
                    </td>
                    <td class="table__row-field-value">
                      Thanh toán khi nhận hàng
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
