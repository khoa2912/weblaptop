import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Layout } from '../../components/Layout'
import './style.css'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css';
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { LayoutNV } from '../../components/LayoutNhavVien'
/**
* @author
* @function Home
**/

export const Home = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    const order = useSelector((state) => state.order);
    const renderData = (orders) => {
        let ordernew = 0, orderPacked = 0, orderShipping = 0, orderCompleted = 0;

        for (let orderItem of orders) {
            if (orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === false && orderItem.orderStatus[2].isCompleted === false && orderItem.orderStatus[3].isCompleted == false) {
                ordernew++;
            }
            if (orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === true && orderItem.orderStatus[2].isCompleted === false && orderItem.orderStatus[3].isCompleted == false) {
                orderPacked++;
            }
            if (orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === true && orderItem.orderStatus[2].isCompleted === true && orderItem.orderStatus[3].isCompleted == false) {
                orderShipping++;
            }
            if (orderItem.orderStatus[0].isCompleted === true && orderItem.orderStatus[1].isCompleted === true && orderItem.orderStatus[2].isCompleted === true && orderItem.orderStatus[3].isCompleted == true) {
                orderCompleted++;
            }
        }
        return [ordernew, orderPacked, orderShipping, orderCompleted]
    }


    return (
        <Layout>
            <div className="row tm-content-row tm-mt-big ">
                <div className="tm-col tm-col-big">
                    <div className="bg-white tm-block h-100 report__border-leftb">
                        <div className="row">
                            <div className="col-8">
                                <h2 className="tm-block-title d-inline-block">SẢN PHẨM BÁN CHẠY</h2>

                            </div>
                            <div className="col-4 text-right">
                                <a href="/products" className="tm-link-black">XEM TẤT CẢ</a>
                            </div>
                        </div>
                        <ol className="tm-list-group tm-list-group-alternate-color tm-list-group-pad-big">
                            {product.products.map((product, index) => (
                                <li className="tm-list-group-item">
                                    {product.name}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                {/* <div className="tm-col tm-col-big" >
                    <div className="bg-white tm-block h-100">
                        <h2 className="tm-block-title">Các đơn hàng</h2>
                        <Bar data={{
                            // Name of the variables on x-axies for each bar
                            labels: ["Đơn hàng mới", "Đơn hàng đã đóng gói", "Đơn hàng đang giao", "Đơn hàng đã giao"],
                            datasets: [
                                {
                                    // Label for bars
                                    label: "Tất cả đơn hàng",
                                    // Data or value of your each variable
                                    data: renderData(order.orders)|| null,
                                    // Color of each bar
                                    backgroundColor: ["aqua", "green", "red", "yellow"],
                                    // Border color of each bar
                                    borderColor: ["aqua", "green", "red", "yellow"],

                                },
                            ],
                        }} options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Các đơn hàng"
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }} />
                    </div>
                </div> */}
                <div className="tm-col tm-col-big">
                    <div className="bg-white tm-block h-100">
                        <h2 className="tm-block-title">LỊCH</h2>
                        <Calendar />
                    </div>
                </div>

            </div>
        </Layout>
    )

}