import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

const Page404 = () => (
  <Layout>
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi trang bạn truy cập không tôn tại!!!"
      extra={
        <Link to="/">
          <Button type="primary">Trang chủ</Button>
        </Link>
      }
    />
  </Layout>
);

export default Page404;
