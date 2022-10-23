import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Layout } from "../../components/Layout";
import "./style.css";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
/**
 * @author
 * @function Home
 **/

export const ManagerUser = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

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
                <a href="/products" className="tm-link-black">
                  XEM TẤT CẢ
                </a>
              </div>
            </div>
            <ol className="tm-list-group tm-list-group-alternate-color tm-list-group-pad-big">
              {users.products.map((product, index) => (
                <li className="tm-list-group-item">{product.name}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};
