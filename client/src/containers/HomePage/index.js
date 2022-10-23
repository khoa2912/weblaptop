import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { MenuHeader } from "../../components/MenuHeader";
import "../../components/Header/style.css";
import "antd/dist/antd.css";
import "./style.css";
import EditIcon from "@mui/icons-material/Edit";
import { FaShippingFast } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getToken, getUser } from "../../actions";
import formatThousand from "../../utils/formatThousans";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";
import Banner from "../../components/Carousel";
import { BackTop, Card, Rate, Spin, Alert } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import CardMUI from "../../components/UI/CardMUI/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
// modules styles
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Meta from "antd/lib/card/Meta";
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
} from "react-countdown";

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
  right: 40,
};
/**
 * @author
 * @function HomePage
 **/

export const HomePage = (props) => {
  const products = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);
  SwiperCore.use([Navigation, Pagination]);
  useEffect(() => {
    setSpinning(true);
    dispatch(getAllProducts()).then(() => {
      setSpinning(false);
    });
  }, [dispatch]);
  useEffect(() => {
    document.title = "SHOP LAPTOP";
  }, []);
  const item = {
    label: "test tin tuc",
    image:
      "https://static2.yan.vn/YanNews/202105/202105170245381604-7927e470-8557-4e90-94d8-5d4e95f20dca.jpeg",
  };
  const item1 = {
    label: "test tin tuc2",
    image:
      "https://static2.yan.vn/YanNews/202105/202105170245381604-7927e470-8557-4e90-94d8-5d4e95f20dca.jpeg",
  };
  const { allProducts } = useSelector((state) => state.product);
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const category = useSelector((state) => state.category);
  const [indexFilter, setIndexFilter] = useState(0);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      <Alert
        message="Flash Sale"
        description="Flash Sale đã kết thúc cảm ơn quý khách!!"
        type="success"
      />;
    } else {
      // Render a countdown
      return (
        <span>
          <span
            style={{
              backgroundColor: "black",
              padding: "1px 3px",
              color: "white",
              borderRadius: "3px",
              fontSize: "19px",
            }}
          >
            {zeroPad(hours)}
          </span>{" "}
          <span
            style={{
              fontSize: "19px",
              padding: "1px 3px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "3px",
            }}
          >
            {zeroPad(minutes)}
          </span>{" "}
          <span
            style={{
              fontSize: "19px",
              padding: "1px 3px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "3px",
            }}
          >
            {zeroPad(seconds)}
          </span>
        </span>
      );
    }
  };
  const panel = () => {
    return (
      <div class="grid__row12">
        <div class="trademark__content">
          {spinning === false ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              allowSlidePrev={true}
              allowSlideNext={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiperPanel"
              style={{ height: "390px" }}
            >
              {category.categories.map((item) => {
                return (
                  <SwiperSlide style={{ width: "100%", height: "100%" }}>
                    <Link
                      to={`/${item.slug}?cid=${item._id}&type=${item.type}`}
                    >
                      <img
                        src={item.image}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <Stack spacing={1}>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={100} />
              <Skeleton variant="rectangular" width={210} height={160} />
            </Stack>
          )}
          {/* {category.categories.length !== 0 ? (
            <Banner
              className="banner__category"
              category={category.categories}
            ></Banner>
          ) : (
            <Stack spacing={1}>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={100} />
              <Skeleton variant="rectangular" width={210} height={160} />
            </Stack>
          )} */}
        </div>
      </div>
    );
  };
  const flashSale = () => {
    return (
      <Card
        className="Cardflashsale"
        title={
          <>
            <div className="cardNameFlashSale"></div>
            <div className="timerFlashSale">
              <Countdown date={Date.now() + 50000000} renderer={renderer} />
            </div>
          </>
        }
        style={{ marginBottom: "20px", backgroundColor: "rgb(240, 248, 255)" }}
        extra={
          <Link style={{ textDecoration: "none" }} to="/search?q=&page=1">
            Xem tất cả >
          </Link>
        }
      >
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          slidesPerGroup={2}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiperProduct"
          style={{ height: "390px" }}
        >
          {allProducts.length !== 0 ? (
            allProducts.map((item) => (
              <SwiperSlide style={{ width: "17%" }}>
                <div
                  class="product__search-trademark-item"
                  style={{ width: "90%" }}
                  key={item._id}
                >
                  <div class="product__search-trademark-item-link-wrap">
                    <Link
                      to={`/${item.slug}/${item._id}/p`}
                      style={{
                        color: "#636363",
                        textDecoration: "none",
                      }}
                    >
                      <div class="product__search-trademark__img">
                        <img src={item.productPicture[0].img} alt="" />

                        <div class="product__search-trademark__promotion">
                          <div class="product__search-trademark__promotion-title">
                            TIẾT KIỆM
                          </div>
                          <div class="product__search-trademark__promotion-value">
                            {formatThousand(item.regularPrice - item.salePrice)}{" "}
                            ₫
                          </div>
                        </div>
                      </div>
                      <span
                        class="product__search-trademark-name"
                        style={{ color: "black", fontSize: "17px" }}
                      >
                        {item.name}
                      </span>
                      <span class="product__search-trademark-quantity">
                        {item.quantity < 10
                          ? `Chỉ còn ${item.quantity} sản phẩm`
                          : `Còn ${item.quantity} sản phẩm`}
                      </span>
                    </Link>
                  </div>
                  <div class="product__search-trademark-price">
                    <div class="product__search-trademark-price-new">
                      {formatThousand(item.salePrice)} ₫
                      <span class="product__search-trademark-price-span">
                        Free ship
                        <FaShippingFast class="fas fa-shipping-fast" />
                      </span>
                    </div>
                    <div class="product__search-trademark-price-old">
                      {formatThousand(item.regularPrice)} ₫
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <Stack spacing={1}>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={100} />
              <Skeleton variant="rectangular" width={210} height={160} />
            </Stack>
          )}
        </Swiper>
      </Card>
    );
  };
  const tintuc = () => {
    return (
      <div class="grid__row12 app__content-header1">
        <div class="trademark__content">
          <div class="trademark__title" style={{ position: "relative" }}>
            TIN TỨC
            <Link
              style={{
                fontSize: "15px",
                color: "black",
                textAlign: "right",
                position: "absolute",
                marginTop: "25px",
                right: 0,
              }}
              to="news"
            >
              Xem tất cả >
            </Link>
          </div>

          <div>
            <Swiper
              slidesPerView={5}
              spaceBetween={25}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              style={{ height: "350px" }}
            >
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item1} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item1} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item1} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item1} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item} />
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "calc(20% + 2.8px)", maxWidth: "220px" }}
              >
                <CardMUI item={item} />
              </SwiperSlide>
            </Swiper>
            {/* <CardMUI item={item} />
            <CardMUI item={item} />
            <CardMUI item={item} />
            <CardMUI item={item} />
            <CardMUI item={item} />
            <CardMUI item={item} />
            <CardMUI item={item} />
            <CardMUI item={item} /> */}
          </div>
        </div>
      </div>
    );
  };
  const productList = () => {
    return (
      <div class="grid__row1 app__content1">
        <div class="row">
          <div
            class=""
            style={{
              marginLeft: "20px",
              justifyContent: "space-between",
              display: "inline-flex",
            }}
          >
            <h1 className="title" style={{ color: "white", marginTop: "20px" }}>
              Laptop Gaming
            </h1>
            <Link
              style={{
                color: "white",
                marginTop: "20px",
                fontSize: "17px",
                marginRight: "30px",
              }}
              to="/search?q=&page=1"
            >
              Xem tất cả {">"}
            </Link>
          </div>
        </div>
        <Spin tip="Loading ..." spinning={spinning}>
          <div class="grid__column-10">
            <div class="home__product">
              <div class="grid__row2" style={{ margin: "20px 0" }}>
                {allProducts.length !== 0 ? (
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    slidesPerGroup={2}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                      clickable: true,
                      el: ".swiper-pagination",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiperProduct"
                    style={{ height: "390px" }}
                  >
                    {allProducts.length !== 0 ? (
                      allProducts.map((product) => (
                        <SwiperSlide style={{ width: "17%" }}>
                          <div class="grid__column-2-4" key={product._id}>
                            <Link
                              class="home__product-item"
                              to={`/${product.slug}/${product._id}/p`}
                            >
                              <div class="product__search-trademark__img">
                                <img
                                  src={product.productPicture[0].img}
                                  alt=""
                                />
                              </div>
                              <h4 class="home__product-item-title">
                                {product.name}
                              </h4>
                              <div class="home__product-item-price">
                                <span class="product__item-price--old">
                                  {formatThousand(product.regularPrice)} đ
                                </span>
                                <span class="product__item-price--current">
                                  {formatThousand(product.salePrice)} đ
                                </span>
                              </div>
                              <div class="home__product-item-action">
                                {/* <!-- Hiện like khi dùng class product__item-icon-like--liked --> */}
                                <span class="product__item-icon-like product__item-icon-like--liked">
                                  <i class="product__item-icon-empty far fa-heart"></i>
                                  <i class="product__item-icon-fill fas fa-heart"></i>
                                </span>
                                <div class="product__item-icon-rating">
                                  <Rating
                                    name="no-value"
                                    readOnly
                                    value={4}
                                    size="large"
                                    style={{ marginTop: "10px" }}
                                  />
                                  <span
                                    class="product__item--sold"
                                    style={{
                                      fontSize: "17px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {product.quantitySold} Đã bán
                                  </span>
                                </div>
                              </div>

                              <div class="home__product-item-origin">
                                <span>Hoa Kỳ</span>
                              </div>
                              <div class="home__product-item-favorite">
                                <i class="fas fa-check"></i>
                                <span>Yêu thích</span>
                              </div>
                              <div class="home__product-item-sale">
                                <span class="product__item-sale--value">
                                  {Math.floor(
                                    ((product.regularPrice -
                                      product.salePrice) /
                                      product.regularPrice) *
                                      100
                                  )}
                                  %
                                </span>
                                <span class="product__item-sale--lable">
                                  GIẢM
                                </span>
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={100} />
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={160}
                        />
                      </Stack>
                    )}
                  </Swiper>
                ) : (
                  <Skeleton
                    style={{ zIndex: 30 }}
                    variant="rectangular"
                    width={210}
                    height={118}
                  />
                )}
                {/* <!-- Product item --> */}
                {/* {allProducts.map((product) => (
                <div
                  class="grid__column-2-4"
                  style={{ backgroundColor: "rgb(246, 246, 246)" }}
                  key={product._id}
                >
                  <a
                    class="home__product-item"
                    href={`/${product.slug}/${product._id}/p`}
                  >
                    <div class="product__search-trademark__img">
                      <img src={product.productPicture[0].img} alt="" />
                    </div>
                    <h4 class="home__product-item-title">{product.name}</h4>
                    <div class="home__product-item-price">
                      <span class="product__item-price--old">
                        {formatThousand(product.regularPrice)} đ
                      </span>
                      <span class="product__item-price--current">
                        {formatThousand(product.salePrice)} đ
                      </span>
                    </div>
                    <div class="home__product-item-action">
                      <span class="product__item-icon-like product__item-icon-like--liked">
                        <i class="product__item-icon-empty far fa-heart"></i>
                        <i class="product__item-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="product__item-icon-rating">
                        <i class="icon-rating--gold fas fa-star"></i>
                        <i class="icon-rating--gold fas fa-star"></i>
                        <i class="icon-rating--gold fas fa-star"></i>
                        <i class="icon-rating--gold fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <span class="product__item--sold">
                        {product.quantitySold} Đã bán
                      </span>
                    </div>
                    <div class="home__product-item-origin">
                      <span>Hoa Kỳ</span>
                    </div>
                    <div class="home__product-item-favorite">
                      <i class="fas fa-check"></i>
                      <span>Yêu thích</span>
                    </div>
                    <div class="home__product-item-sale">
                      <span class="product__item-sale--value">
                        {Math.floor(
                          ((product.regularPrice - product.salePrice) /
                            product.regularPrice) *
                            100
                        )}
                        %
                      </span>
                      <span class="product__item-sale--lable">GIẢM</span>
                    </div>
                  </a>
                </div>
              ))} */}
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  };
  const productListHistory = () => {
    const viewedProduct = localStorage.getItem("viewedProduct");
    if (!viewedProduct) {
      return null;
    }
    const allProductsViewed = allProducts.filter((item) => {
      if (viewedProduct.includes(item._id)) return item;
    });
    return (
      <Card
        title="Sản phẩm vừa xem"
        style={{
          fontSize: "20px",
          backgroundColor: "#F0F8FF",
          marginBottom: "30px",
        }}
        className="card-main"
      >
        <div class="grid__column-10">
          <div class="home__product">
            <div class="grid__row2" style={{}}>
              {allProductsViewed.length !== 0 ? (
                <Swiper
                  slidesPerView={5}
                  spaceBetween={10}
                  slidesPerGroup={2}
                  loop={false}
                  loopFillGroupWithBlank={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                  style={{ height: "390px", width: "100%" }}
                >
                  {allProductsViewed.length !== 0 ? (
                    allProductsViewed.map((product) => (
                      <SwiperSlide style={{ width: "17%" }}>
                        <div class="grid__column-2-4" key={product._id}>
                          <Link
                            style={{ marginLeft: "0" }}
                            class="home__product-item"
                            to={`/${product.slug}/${product._id}/p`}
                          >
                            <div class="product__search-trademark__img">
                              <img src={product.productPicture[0].img} alt="" />
                            </div>
                            <h4 class="home__product-item-title">
                              {product.name}
                            </h4>
                            <div class="home__product-item-price">
                              <span class="product__item-price--old">
                                {formatThousand(product.regularPrice)} đ
                              </span>
                              <span class="product__item-price--current">
                                {formatThousand(product.salePrice)} đ
                              </span>
                            </div>
                            <div class="home__product-item-action">
                              {/* <!-- Hiện like khi dùng class product__item-icon-like--liked --> */}
                              <span class="product__item-icon-like product__item-icon-like--liked">
                                <i class="product__item-icon-empty far fa-heart"></i>
                                <i class="product__item-icon-fill fas fa-heart"></i>
                              </span>
                              <div class="product__item-icon-rating">
                                <Rating
                                  name="no-value"
                                  readOnly
                                  value={4}
                                  size="large"
                                  style={{ marginTop: "10px" }}
                                />
                                <span
                                  class="product__item--sold"
                                  style={{
                                    fontSize: "17px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {product.quantitySold} Đã bán
                                </span>
                              </div>
                            </div>

                            <div class="home__product-item-origin">
                              <span>Hoa Kỳ</span>
                            </div>
                            <div class="home__product-item-favorite">
                              <i class="fas fa-check"></i>
                              <span>Yêu thích</span>
                            </div>
                            <div class="home__product-item-sale">
                              <span class="product__item-sale--value">
                                {Math.floor(
                                  ((product.regularPrice - product.salePrice) /
                                    product.regularPrice) *
                                    100
                                )}
                                %
                              </span>
                              <span class="product__item-sale--lable">
                                GIẢM
                              </span>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <Stack spacing={1}>
                      <Skeleton variant="text" />
                      <Skeleton variant="circular" width={40} height={100} />
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={160}
                      />
                    </Stack>
                  )}
                </Swiper>
              ) : (
                <Skeleton
                  style={{ zIndex: 30 }}
                  variant="rectangular"
                  width={210}
                  height={118}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };
  const categoryRender = () => {
    return (
      <Card
        title="Thương hiệu nổi bật"
        style={{
          marginBottom: "20px",
          fontSize: "20px",
          backgroundColor: "#F0F8FF",
        }}
        className="card-main"
      >
        {category.categories.map((item) => (
          <Link
            style={{
              width: `${100 / category.categories.length}%`,
              cursor: "pointer",
              textDecoration: "none",
            }}
            className="card_children"
            to={`/${item.slug}?cid=${item._id}&type=${item.type}`}
          >
            <Card
              // className="card_children"
              // style={{
              //   width: `${100 / category.categories.length}%`,
              //   cursor: "pointer",
              // }}
              cover={
                <img className="image_Card" alt="example" src={item.image} />
              }
            >
              <Meta title={item.name} />
            </Card>
          </Link>
        ))}
      </Card>
    );
  };
  return (
    <div>
      <Layout>
        <div class="grid">
          {panel()}
          {/* {tintuc()} */}
          {flashSale()}
          {categoryRender()}
          {productList()}
          {productListHistory()}
          {tintuc()}
        </div>
      </Layout>
      <BackTop>
        <UpCircleOutlined style={style}></UpCircleOutlined>
      </BackTop>
    </div>
  );
};
