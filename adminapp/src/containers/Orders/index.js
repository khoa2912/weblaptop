
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderById, updateOrder } from "../../actions";
import { Layout } from "../../components/Layout";
import Card from "../../components/UI/Card";
import formatThousand from "../../util/formatThousans";
import "./style.css";
import {
  Cascader,
  ConfigProvider,
  Divider,
  List,
  Select,
  Switch,
  Table,
  Transfer,
  TreeSelect,
} from 'antd';
import 'antd/dist/antd.css';

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  }
  const convertOrderStt = (stt) => {
    switch (stt) {
      case 'ordered':
        return 'Đã đặt đơn';
        break;
      case 'packed':
        return 'Đã đóng gói';
        break;
      case 'shipped':
        return 'Đang giao hàng';
        break;
      case 'delivered':
        return 'Đã giao hàng';
        break;
    }
  }
  return (
    <Layout sidebar>
      <div className="orders__app-wrap">
        <div className="orders__app">
          <div className="orders__unconfirm" style={{backgroundColor:'darkgray',margin:'20px 0'}}>
            <div className="orders__unconfirm-title">Đơn hàng mới</div>

            <div className="orders__unconfirm-info-list">
              {order.orders.map((orderItem, index) => (
                orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === false && orderItem.orderStatus[2].isCompleted === false && orderItem.orderStatus[3].isCompleted == false ?
                  <Card
                    style={{
                      margin: "10px 0",
                    }}
                    key={index}
                    headerLeft={`Mã đơn hàng ${orderItem._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "50px 50px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="title">Các sản phẩm</div>
                        {orderItem.items.map((item, index) => (
                          <div className="value" key={index}>
                            {item.productId.name}
                          </div>
                        ))}
                      </div>
                      <div>
                        <span className="title">Tổng tiền</span>
                        <br />
                        <span className="value">{formatThousand(orderItem.totalAmount)} ₫</span>
                      </div>
                      <div>
                        <span className="title">Hình thức thanh toán</span> <br />
                        <span className="value">Thanh toán khi nhận hàng</span>
                      </div>
                      <div>
                        <span className="title">Trạng thái đơn hàng</span> <br />
                        <span className="value">{orderItem.orderStatus[3].isCompleted === true ? "Đã giao hàng" : 'Đang xử lý'}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        padding: "20px 100px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="orderTrack">
                        {orderItem.orderStatus.map((status) => (
                          <div
                            className={`orderStatus ${status.isCompleted ? "active" : ""
                              }`}
                          >
                            <div
                              className={`point ${status.isCompleted ? "active" : ""}`}
                            ></div>
                            <div className="orderInfo">
                              <div className="status">{convertOrderStt(status.type)}</div>
                              <div className="date">{formatDate(status.date)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* select input to apply order action */}
                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <select onChange={(e) => setType(e.target.value)}>
                          <option value={""}>Chọn trạng thái</option>
                          {orderItem.orderStatus.map((status) => {
                            return (
                              <>
                                {!status.isCompleted ? (
                                  <option key={status.type} value={status.type}>
                                    {convertOrderStt(status.type)}
                                  </option>
                                ) : null}
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {/* button to confirm action */}

                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <button onClick={() => onOrderUpdate(orderItem._id)}>
                          Xác nhận
                        </button>
                      </div>
                      <div
                        style={{
                          width:'50px',
                          
                          boxSizing: "border-box",
                        }}
                      >
                        <button onClick={() => {
                      const payload = {
                        orderId:orderItem._id,
                      };
                      dispatch(deleteOrderById(payload));
                    }}>
                          Xóa
                        </button>
                      </div>
                    </div>

                  </Card> : null
              )
              )
              }

            </div>


          </div>
          <div className="orders__unconfirm" style={{backgroundColor:'darkgray',margin:'20px 0'}}>
            <div className="orders__unconfirm-title">Đơn hàng đã đóng gói</div>

            <div className="orders__unconfirm-info-list">
              {order.orders.map((orderItem, index) => (
                orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === true && orderItem.orderStatus[2].isCompleted === false && orderItem.orderStatus[3].isCompleted == false ?
                  <Card
                    style={{
                      margin: "10px 0",
                    }}
                    key={index}
                    headerLeft={`Mã đơn hàng ${orderItem._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "50px 50px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="title">Các sản phẩm</div>
                        {orderItem.items.map((item, index) => (
                          <div className="value" key={index}>
                            {item.productId.name}
                          </div>
                        ))}
                      </div>
                      <div>
                        <span className="title">Tổng tiền</span>
                        <br />
                        <span className="value">{formatThousand(orderItem.totalAmount)} ₫</span>
                      </div>
                      <div>
                        <span className="title">Hình thức thanh toán</span> <br />
                        <span className="value">Thanh toán khi nhận hàng</span>
                      </div>
                      <div>
                        <span className="title">Trạng thái đơn hàng</span> <br />
                        <span className="value">{orderItem.orderStatus[3].isCompleted === true ? "Đã giao hàng" : 'Đang xử lý'}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        padding: "20px 100px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="orderTrack">
                        {orderItem.orderStatus.map((status) => (
                          <div
                            className={`orderStatus ${status.isCompleted ? "active" : ""
                              }`}
                          >
                            <div
                              className={`point ${status.isCompleted ? "active" : ""}`}
                            ></div>
                            <div className="orderInfo">
                              <div className="status">{convertOrderStt(status.type)}</div>
                              <div className="date">{formatDate(status.date)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* select input to apply order action */}
                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <select onChange={(e) => setType(e.target.value)}>
                          <option value={""}>Chọn trạng thái</option>
                          {orderItem.orderStatus.map((status) => {
                            return (
                              <>
                                {!status.isCompleted ? (
                                  <option key={status.type} value={status.type}>
                                    {convertOrderStt(status.type)}
                                  </option>
                                ) : null}
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {/* button to confirm action */}

                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <button onClick={() => onOrderUpdate(orderItem._id)}>
                          Xác nhận
                        </button>
                      </div>
                    </div>

                  </Card> : null
              )
              )
              }

            </div>


          </div>
          <div className="orders__unconfirm" style={{backgroundColor:'darkgray',margin:'20px 0'}}>
            <div className="orders__unconfirm-title">Đơn hàng đang giao hàng</div>

            <div className="orders__unconfirm-info-list">
              {order.orders.map((orderItem, index) => (
                orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === true && orderItem.orderStatus[2].isCompleted === true && orderItem.orderStatus[3].isCompleted == false ?
                  <Card
                    style={{
                      margin: "10px 0",
                    }}
                    key={index}
                    headerLeft={`Mã đơn hàng ${orderItem._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "50px 50px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="title">Các sản phẩm</div>
                        {orderItem.items.map((item, index) => (
                          <div className="value" key={index}>
                            {item.productId.name}
                          </div>
                        ))}
                      </div>
                      <div>
                        <span className="title">Tổng tiền</span>
                        <br />
                        <span className="value">{formatThousand(orderItem.totalAmount)} ₫</span>
                      </div>
                      <div>
                        <span className="title">Hình thức thanh toán</span> <br />
                        <span className="value">Thanh toán khi nhận hàng</span>
                      </div>
                      <div>
                        <span className="title">Trạng thái đơn hàng</span> <br />
                        <span className="value">{orderItem.orderStatus[3].isCompleted === true ? "Đã giao hàng" : 'Đang xử lý'}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        padding: "20px 100px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="orderTrack">
                        {orderItem.orderStatus.map((status) => (
                          <div
                            className={`orderStatus ${status.isCompleted ? "active" : ""
                              }`}
                          >
                            <div
                              className={`point ${status.isCompleted ? "active" : ""}`}
                            ></div>
                            <div className="orderInfo">
                              <div className="status">{convertOrderStt(status.type)}</div>
                              <div className="date">{formatDate(status.date)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* select input to apply order action */}
                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <select onChange={(e) => setType(e.target.value)}>
                          <option value={""}>Chọn trạng thái</option>
                          {orderItem.orderStatus.map((status) => {
                            return (
                              <>
                                {!status.isCompleted ? (
                                  <option key={status.type} value={status.type}>
                                    {convertOrderStt(status.type)}
                                  </option>
                                ) : null}
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {/* button to confirm action */}

                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <button onClick={() => onOrderUpdate(orderItem._id)}>
                          Xác nhận
                        </button>
                      </div>
                    </div>

                  </Card> : null
              )
              )
              }

            </div>


          </div>
          <div className="orders__unconfirm" style={{backgroundColor:'darkgray',margin:'20px 0'}}>
            <div className="orders__unconfirm-title">Đơn hàng đã giao</div>

            <div className="orders__unconfirm-info-list">
              {order.orders.map((orderItem, index) => (
                orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === true && orderItem.orderStatus[2].isCompleted === true && orderItem.orderStatus[3].isCompleted == true ?
                  <Card
                    style={{
                      margin: "10px 0",
                    }}
                    key={index}
                    headerLeft={`Mã đơn hàng ${orderItem._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "50px 50px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="title">Các sản phẩm</div>
                        {orderItem.items.map((item, index) => (
                          <div className="value" key={index}>
                            {item.productId.name}
                          </div>
                        ))}
                      </div>
                      <div>
                        <span className="title">Tổng tiền</span>
                        <br />
                        <span className="value">{formatThousand(orderItem.totalAmount)} ₫</span>
                      </div>
                      <div>
                        <span className="title">Hình thức thanh toán</span> <br />
                        <span className="value">Thanh toán khi nhận hàng</span>
                      </div>
                      <div>
                        <span className="title">Trạng thái đơn hàng</span> <br />
                        <span className="value">{orderItem.orderStatus[3].isCompleted === true ? "Đã giao hàng" : 'Đang xử lý'}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        padding: "20px 100px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="orderTrack">
                        {orderItem.orderStatus.map((status) => (
                          <div
                            className={`orderStatus ${status.isCompleted ? "active" : ""
                              }`}
                          >
                            <div
                              className={`point ${status.isCompleted ? "active" : ""}`}
                            ></div>
                            <div className="orderInfo">
                              <div className="status">{convertOrderStt(status.type)}</div>
                              <div className="date">{formatDate(status.date)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* select input to apply order action */}
                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <select onChange={(e) => setType(e.target.value)}>
                          <option value={""}>Chọn trạng thái</option>
                          {orderItem.orderStatus.map((status) => {
                            return (
                              <>
                                {!status.isCompleted ? (
                                  <option key={status.type} value={status.type}>
                                    {convertOrderStt(status.type)}
                                  </option>
                                ) : null}
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {/* button to confirm action */}

                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <button onClick={() => onOrderUpdate(orderItem._id)}>
                          Xác nhận
                        </button>
                      </div>
                    </div>

                  </Card> : null
              )
              )
              }

            </div>


          </div>

          <div className="orders__unconfirm" style={{backgroundColor:'darkgray',margin:'20px 0'}}>
            <div className="orders__unconfirm-title">Đơn hàng đã hủy</div>

            <div className="orders__unconfirm-info-list">
              {order.orders.map((orderItem, index) => (
                orderItem.paymentStatus=== "cancelled"?
                  <Card
                    style={{
                      margin: "10px 0",
                    }}
                    key={index}
                    headerLeft={`Mã đơn hàng ${orderItem._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "50px 50px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="title">Các sản phẩm</div>
                        {orderItem.items.map((item, index) => (
                          <div className="value" key={index}>
                            {item.productId.name}
                          </div>
                        ))}
                      </div>
                      <div>
                        <span className="title">Tổng tiền</span>
                        <br />
                        <span className="value">{formatThousand(orderItem.totalAmount)} ₫</span>
                      </div>
                      <div>
                        <span className="title">Hình thức thanh toán</span> <br />
                        <span className="value">Thanh toán khi nhận hàng</span>
                      </div>
                      <div>
                        <span className="title">Trạng thái đơn hàng</span> <br />
                        <span className="value">{orderItem.orderStatus[3].isCompleted === true ? "Đã giao hàng" : 'Đang xử lý'}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        padding: "20px 100px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      

                      {/* select input to apply order action */}
                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                      
                      </div>
                      {/* button to confirm action */}

                    </div>

                  </Card> : null
              )
              )
              }

            </div>


          </div>
        </div>
      </div>


    </Layout>
  );
};

export default Orders;