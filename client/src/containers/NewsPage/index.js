import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Image, Pagination } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@material-ui/core";
import "./style.css";
function NewsPage() {
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const news = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    setTotalPage(news.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);
  }, []);
  const onChangePagination = (current, pageSize) => {
    setCurrent(current);
    setPageSize(pageSize);
    setMinIndex((current - 1) * pageSize);
    setMaxIndex(pageSize * current);
  };
  return (
    <div>
      <Layout>
        <div style={{ margin: "10px auto", width: "86%" }}>
          <Image
            src="https://gstatic.gvn360.com/2022/07/banner_xx-1.jpg"
            preview={false}
            style={{
              height: "70%",
              display: "flex",
            }}
          />
          <Typography
            variant="h4"
            component="div"
            style={{ marginTop: "20px" }}
          >
            Tin mới nhất
            <hr
              style={{
                background: "black",
                color: "black",
                borderColor: "lime",
                height: "3px",
                marginBottom: "20px",
              }}
            />
          </Typography>

          {news.map(
            (item, index) =>
              index >= minIndex &&
              index < maxIndex && (
                <Link style={{ textDecoration: "none" }} to={`/news/${item}`}>
                  <Card
                    sx={{
                      display: "flex",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: "20%", height: 200 }}
                      image="https://gstatic.gvn360.com/2022/07/banner_xx-1.jpg"
                      alt="Live from space album cover"
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h4"
                          className="headerNews"
                        >
                          Chơi game giỏi cũng đáng tự hào đấy, nhưng bạn đã từng
                          tự hào khi thấy newbie mình hướng dẫn giỏi lên chưa?
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          className="headerNews"
                        >
                          Mac Miller
                        </Typography>
                        <Typography
                          component="div"
                          variant="h5"
                          className="contentNews"
                        >
                          Hướng dẫn newbie chơi game đúng là có chút phiền thật
                          nhưng đối với mình thì nó chẳng là gì so với niềm vui
                          mà mình có được, đó là điều mình thích và mình làm nó
                          vì đam mê. Mỗi chúng ta, dù hiện tại chơi game giỏi
                          đến mấy thì cũng đã từng là newbie, từng chơi rất dở
                          và từng ăn hành vô số lần mới có thể giỏi lên, mình
                          cũng vậy. Vì thế mình luôn có cảm giác muốn được hướng
                          dẫn các newbie mà mình biết khi họ đặt chân đến những
                          tựa game mà mình chơi giỏi. Được thấy họ đỡ ăn hành,
                          đỡ sai lầm và có trải nghiệm tốt hơn mình khi xưa là
                          một thú vui nho nhỏ của mình. Nhìn họ, mình cứ có cảm
                          giác như được sửa những sai lầm cũ, được sống lại
                          những tháng ngày ngây dại năm xưa vậy.
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Link>
              )
          )}
        </div>
        <Pagination
          className="pagination"
          showSizeChanger
          onChange={onChangePagination}
          defaultCurrent={1}
          total={news.length}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 15, 20]}
        />
      </Layout>
    </div>
  );
}

export default NewsPage;
