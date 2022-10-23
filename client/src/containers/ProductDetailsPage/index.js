import React, { useEffect, useState, createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  addToCart,
  getAllProducts,
  getComments,
  getProductDetailsById,
} from "../../actions";
import { Layout } from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee, BiDollarCircle } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton, Modal } from "../../components/MaterialUI";
import "./style.css";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaFacebookMessenger,
  FaFacebookF,
  FaHome,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import formatThousand from "../../utils/formatThousans";
import { Container, Form, Row, Col, FormGroup } from "react-bootstrap";
import { Alert, Tag, Select, Input, Spin } from "antd";
import { DislikeFilled, DislikeOutlined, LikeFilled } from "@ant-design/icons";
import { Avatar, Comment, Tooltip, Divider, Card } from "antd";
import moment from "moment";
import {
  FacebookOutlined,
  LikeOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Rating } from "@mui/material";
import { Button as ButtonANTD, Form as FormANTD, List } from "antd";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
const { TextArea } = Input;
/**
 * @author
 * @function ProductDetailsPage
 **/
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

notification.config({
  placement: "topRight",
  top: 80,
  duration: 1.2,
  rtl: false,
  maxCount: 3,
});
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <FormANTD.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </FormANTD.Item>
    <FormANTD.Item>
      <ButtonANTD
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Thêm câu hỏi
      </ButtonANTD>
    </FormANTD.Item>
  </>
);
const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { allProducts } = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const [productDesModal, setProductDesModal] = useState(false);
  const product = useSelector((state) => state.product);
  const [productPictureIndex, setProductPictureIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [numberProduct, setNumberProduct] = useState(1);
  const [listTinh, setListTinh] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [listHuyen, setListHuyen] = useState([]);
  const [listXa, setListXa] = useState([]);
  const [methodShip, setMethodShip] = useState([]);
  const [tinh, setTinh] = useState("");
  const [huyen, setHuyen] = useState("");
  const [xa, setXa] = useState("");
  const [shipOrder, setShipOrder] = useState("");
  const [timeShip, setTimeShip] = useState("");
  const [serviceid, setServiceId] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { Option } = Select;
  const handleChangeTinh = (value) => {
    setTinh(value);
    getApiHuyen(value);
  };
  const handleChangeHuyen = (value) => {
    getApiXa(value);
    setHuyen(value);
    getMethodShip(value);
  };
  const handleChangeXa = (value) => {
    setXa(value);
    console.log(value);
    getShipOrder(methodShip[0] ? methodShip[0].service_id : "", 1);
    handleMethodShip(methodShip[0].service_id);
  };
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
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
      setListTinh(response.data);
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
  useEffect(() => {
    const { productId } = props.match.params;
    setSpinning(true);
    const historyProduct =
      JSON.parse(localStorage.getItem("viewedProduct")) || [];
    if (historyProduct) {
      if (historyProduct.includes(productId) === false) {
        historyProduct.push(productId);
      }
      localStorage.setItem("viewedProduct", JSON.stringify(historyProduct));
    } else {
      localStorage.setItem("viewedProduct", JSON.stringify(historyProduct));
    }
    const payload = {
      params: {
        productId,
      },
    };

    dispatch(getComments(productId)).then(() => {
      product.comment.map((item) => {
        item.avatar = item.Avatar[0];
        item.content = <p>{item.content}</p>;
        item.datetime = moment(
          moment(item.datetime).format("MM DD YYYY")
        ).fromNow();
      });
      setComments(product.comment);
    });

    window.scrollTo(0, 0);
    dispatch(getProductDetailsById(payload)).then(() => {
      setSpinning(false);
    });
  }, [props.match.params]);
  // useEffect(() => {
  //   const { productId } = props.match.params;
  //   dispatch(getComments(productId)).then(() => {
  //     product.comment.map((item) => {
  //       item.avatar = item.Avatar[0];
  //       item.content = <p>{item.content}</p>;
  //       item.datetime = moment(
  //         moment(item.datetime).format("MM DD YYYY")
  //       ).fromNow();
  //     });
  //     setComments(product.comment);
  //   });
  //   moment.locale("vi");
  //   moment().format("LL");
  // }, [submitting]);

  useEffect(() => {
    document.title = product.productDetails.name;
    getApiTinh();
  }, [dispatch, product.productDetails]);
  const handleAddToCart = () => {
    const { _id, name, salePrice, regularPrice } = product.productDetails;
    const img = product.productDetails.productPicture[0].img;
    dispatch(
      addToCart({ _id, name, salePrice, regularPrice, img }, numberProduct)
    );
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
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
      setTimeShip(response.code_message_value);
      setMethodShip(response.data);
    }
  };
  const getShipOrder = async (value, number = 1) => {
    const response = await fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${value}&insurance_value=${
        product.productDetails.salePrice * number
      }&to_ward_code=${xa}&to_district_id=${huyen}&from_district_id=1442&weight=${
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
      setShipOrder(response.data.total);
    }
  };
  const CommentList = ({ comments, action }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${
        comments.length > 1 ? "Câu hỏi" : "Câu hỏi"
      }`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
  const handleSubmit = async () => {
    moment.locale("vi");
    moment().format("LL");
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(
            action === "disliked" ? DislikeFilled : DislikeOutlined
          )}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Trả lời</span>,
    ];
    if (!value) return;
    if (auth.authenticate === false) {
      notification["warning"]({
        message: "Bình luận",
        description: "Vui lòng đăng nhập để bình luận!",
      });
      return;
    }
    setSubmitting(true);
    const { productId } = props.match.params;

    await dispatch(
      addComment({
        author: auth.user.firstName + " " + auth.user.lastName,
        avatar:
          "https://res.cloudinary.com/shoplaptop/image/upload/v1661608973/1053244_rttpwr.png",
        content: value,
        productID: productId,
      })
    );
    setValue("");
    setSubmitting(false);
    dispatch(getComments(productId)).then((data) => {
      data.map((item) => {
        item.avatar = item.Avatar[0];
        item.content = <p>{item.content}</p>;
        item.datetime = moment(
          moment(item.datetime).format("MM DD YYYY")
        ).fromNow();
      });
      setComments(data);
    });
    // dispatch(getComments(productId));
    // setTimeout(() => {
    //   setValue("");
    //   setSubmitting(false);
    // }, 2000);
  };

  const renderComment = () => {
    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <>
        {comments.length > 0 && (
          <CommentList comments={comments} action={action} />
        )}
        <Comment
          className="commentProduct"
          avatar={
            <Avatar
              src="https://res.cloudinary.com/shoplaptop/image/upload/v1661608973/1053244_rttpwr.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  };
  const renderTableProductDesShow = () => {
    return (
      <Modal
        visible={productDesModal}
        onClose={() => setProductDesModal(false)}
        title="Thông tin chi tiết"
      >
        <div class="show__table-info-wrap">
          <table class="show__table-description-info-detail">
            <tr class="table__row-number-odd">
              <td class="table__title">Thương hiệu</td>
              <td class="table__description">
                {product.productDetails.category.name}
              </td>
            </tr>
            <tr class="table__row-number-even">
              <td class="table__title">Bảo hành</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].baohanh} tháng
              </td>
            </tr>
            <tr class="table__row-number-odd">
              <td class="table__title table__title-bold">Thông tin chung</td>
              <td class="table__description"></td>
            </tr>
            <tr class="table__row-number-even">
              <td class="table__title">Series laptop</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].Series}
              </td>
            </tr>
            <tr class="table__row-number-odd">
              <td class="table__title">Màu sắc</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].color}
              </td>
            </tr>
            <tr class="table__row-number-even">
              <td class="table__title">Thế hệ CPU</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].cpu}
              </td>
            </tr>
            <tr class="table__row-number-odd">
              <td class="table__title">Chip đồ họa</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].cardDohoa}
              </td>
            </tr>
            <tr class="table__row-number-even">
              <td class="table__title">RAM</td>
              <td class="table__description table__description-more">
                {product.productDetails.descriptionTable[0].ram}
              </td>
            </tr>
            <tr class="table__row-number-odd">
              <td class="table__title">Màn hình</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].manhinh}
              </td>
            </tr>
            <tr class="table__row-number-even">
              <td class="table__title">Lưu trữ</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].ocung}
              </td>
            </tr>
            <tr class="table__row-number-odd">
              <td class="table__title">Hệ điều hành</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].hedieuhanh}
              </td>
            </tr>

            <tr class="table__row-number-even">
              <td class="table__title">Khối lượng</td>
              <td class="table__description">
                {product.productDetails.descriptionTable[0].khoiluong}
              </td>
            </tr>
          </table>
        </div>
      </Modal>
    );
  };
  const handleMinusProduct = (e) => {
    if (numberProduct === 1) {
      e.preventDefault();
    } else {
      setNumberProduct(numberProduct - 1);
      getShipOrder(serviceid, numberProduct - 1);
    }
  };
  const handlePlusProduct = (e) => {
    if (numberProduct === product.productDetails.quantity) {
      e.preventDefault();
    } else {
      setNumberProduct(numberProduct + 1);
      getShipOrder(serviceid, numberProduct + 1);
    }
  };
  const handleClickImage = (id, e) => {
    e.preventDefault();
    setProductPictureIndex(id);
  };
  const handleMethodShip = (value) => {
    setServiceId(value);
    getShipOrder(value);
  };
  const renderProductLienQuan = () => {
    return (
      <div class="product__same-trademark-wrap">
        <div class="product__same-trademark-title-wrap">
          <h2 class="product__same-trademark-title">
            Các sản phẩm bạn có thể thích
          </h2>
          <Link
            to="/search?q=&page=1"
            class="product__same-trademark-title-link"
          >
            Xem tất cả
            <i class="gg-chevron-right1"></i>
          </Link>
        </div>
        <div style={{ margin: "20px 0" }}>
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
            {allProducts.map((product) => {
              return (
                <SwiperSlide style={{ width: "19%" }}>
                  <div
                    class="product__same-trademark-item1"
                    style={{ border: "4px solid #black", marginLeft: "7px" }}
                  >
                    <div class="product__same-trademark-item-link-wrap">
                      <Link
                        to={`/${product.slug}/${product._id}/p`}
                        className="product__same-trademark-item-link"
                      >
                        <div class="product__same-trademark__img">
                          <img src={product.productPicture[0].img} alt="" />
                          <div class="product__same-trademark__promotion">
                            <div class="product__same-trademark__promotion-title">
                              TIẾT KIỆM
                            </div>
                            <div class="product__same-trademark__promotion-value">
                              {formatThousand(
                                product.regularPrice - product.salePrice
                              )}{" "}
                              ₫
                            </div>
                          </div>
                        </div>
                        <span class="product__same-trademark-name">
                          {product.name}
                        </span>
                        <span class="product__same-trademark-quantity">
                          Chỉ còn {product.quantity} sản phẩm
                        </span>
                      </Link>
                    </div>
                    <div class="product__same-trademark-price">
                      <div class="product__same-trademark-price-new">
                        {formatThousand(product.salePrice)} ₫
                        <span class="product__same-trademark-price-span">
                          free
                          <i class="fas fa-shipping-fast"></i>
                        </span>
                      </div>
                      <div class="product__same-trademark-price-old">
                        {formatThousand(product.regularPrice)} ₫
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* {allProducts.map((product) => (
            <div class="product__same-trademark-item">
              <div class="product__same-trademark-item-link-wrap">
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  className="product__same-trademark-item-link"
                >
                  <div class="product__same-trademark__img">
                    <img src={product.productPicture[0].img} alt="" />
                    <div class="product__same-trademark__promotion">
                      <div class="product__same-trademark__promotion-title">
                        TIẾT KIỆM
                      </div>
                      <div class="product__same-trademark__promotion-value">
                        {formatThousand(
                          product.regularPrice - product.salePrice
                        )}{" "}
                        ₫
                      </div>
                    </div>
                  </div>
                  <span class="product__same-trademark-name">
                    {product.name}
                  </span>
                  <span class="product__same-trademark-quantity">
                    Chỉ còn {product.quantity} sản phẩm
                  </span>
                </Link>
              </div>
              <div class="product__same-trademark-price">
                <div class="product__same-trademark-price-new">
                  {formatThousand(product.salePrice)} ₫
                  <span class="product__same-trademark-price-span">
                    free
                    <i class="fas fa-shipping-fast"></i>
                  </span>
                </div>
                <div class="product__same-trademark-price-old">
                  {formatThousand(product.regularPrice)} ₫
                </div>
              </div>
            </div>
          ))} */}
      </div>
    );
  };
  const renderTableProductDes = () => {
    return (
      <div class="app__detail-description-info">
        <h2 class="description__info-detail-title">Thông tin chi tiết</h2>
        <table class="description__info-detail-table">
          <tr class="table__row-number-odd">
            <td class="table__title">Thương hiệu</td>
            <td class="table__description">
              {product.productDetails.category.name}
            </td>
          </tr>
          <tr class="table__row-number-even">
            <td class="table__title">Bảo hành</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].baohanh}
            </td>
          </tr>
          <tr class="table__row-number-odd">
            <td class="table__title table__title-bold">Thông tin chung</td>
            <td class="table__description"></td>
          </tr>
          <tr class="table__row-number-even">
            <td class="table__title">Series laptop</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].Series}
            </td>
          </tr>
          <tr class="table__row-number-odd">
            <td class="table__title">Màu sắc</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].color}
            </td>
          </tr>
          <tr class="table__row-number-even">
            <td class="table__title">Thế hệ CPU</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].cpu}
            </td>
          </tr>
          <tr class="table__row-number-odd">
            <td class="table__title">Chip đồ họa</td>
            <td class="table__description">
              I{product.productDetails.descriptionTable[0].cardDohoa}
            </td>
          </tr>
          <tr class="table__row-number-even">
            <td class="table__title">RAM</td>
            <td class="table__description table__description-more">
              {product.productDetails.descriptionTable[0].ram}
            </td>
          </tr>
          <tr class="table__row-number-odd">
            <td class="table__title">Màn hình</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].manhinh}
            </td>
          </tr>
          <tr class="table__row-number-even">
            <td class="table__title">Lưu trữ</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].ocung}
            </td>
          </tr>
          <tr class="table__row-number-odd">
            <td class="table__title">Hệ điều hành</td>
            <td class="table__description">
              {product.productDetails.descriptionTable[0].hedieuhanh}
            </td>
          </tr>
        </table>
        {/*  <div class="description__info-detail-more" onClick={() => setProductDesModal(true)}>Hiển thị thông tin thêm
          <i class="gg-chevron-down1" onClick={() => setProductDesModal(true)}></i>
        </div> */}
      </div>
    );
  };
  const renderListTranpost = () => {
    return (
      <div class="content__transport">
        <span class="content__transport-title">Vận Chuyển</span>
        <i class="fas fa-shuttle-van content__transport-icon"></i>
        <span class="content__transport-to">Vận chuyển tới</span>
        <Select
          defaultValue={listTinh[0] ? listTinh[0].ProvinceID : ""}
          style={{
            width: 120,
            marginRight: "20px",
          }}
          onChange={handleChangeTinh}
        >
          {listTinh &&
            listTinh.map((item) => (
              <Option value={item.ProvinceID} key={item.ProvinceID}>
                {item.ProvinceName}
              </Option>
            ))}
        </Select>
        <Select
          defaultValue={listHuyen[0] ? listHuyen[0].DistrictID : ""}
          style={{
            width: 180,
            marginRight: "20px",
          }}
          onChange={handleChangeHuyen}
          disabled={tinh ? false : true}
        >
          {listHuyen &&
            listHuyen.map((item) => (
              <Option value={item.DistrictID}>{item.DistrictName}</Option>
            ))}
        </Select>
        <Select
          defaultValue={listXa[0] ? listXa[0].WardCode : ""}
          style={{
            width: 180,
          }}
          disabled={huyen ? false : true}
          onChange={handleChangeXa}
        >
          {listXa &&
            listXa.map((item) => (
              <Option value={item.WardCode}>{item.WardName}</Option>
            ))}
        </Select>
      </div>
    );
  };
  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <>
      <Layout>
        <Spin tip="Đang tải ..." spinning={spinning}>
          {/* <div>{product.productDetails.name}</div> */}
          <div id="app__detail-product">
            <div class="grid">
              <div class="grid__row app__detail-product-content">
                <div className="app__detail-product-wrap">
                  {/* home > category > subCategory > productName */}
                  <div class="detail-product-control-home">
                    {/* <a href="/" class="control-home--icon">
                    <FaHome />
                  </a>
                  <span class="icon-right-control">{">"}</span>
                  <h3 class="control-home--title">
                    {product.productDetails.name}
                  </h3> */}
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      style={{ fontSize: "15px" }}
                    >
                      <Link
                        to="/"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <HomeIcon fontSize="large" sx={{ fontSize: 25 }} />
                        Trang chủ
                      </Link>
                      <Link
                        to="/search?q=%20&page=1"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Sản phẩm
                      </Link>
                      <Typography color="text.primary" fontSize={"15px"}>
                        {product.productDetails.name}
                      </Typography>
                    </Breadcrumbs>
                    {showMessage ? (
                      <Alert
                        style={{
                          position: "fixed",
                          right: "20px",
                          height: "60px",
                          width: "300px",
                          top: "140px",
                          zIndex: 999999,
                        }}
                        message="Thêm vào giỏ hàng thành công"
                        closable={true}
                        showIcon={true}
                        type="success"
                      />
                    ) : null}
                  </div>
                  {/* <div className="verticalImageStack">
            {
              product.productDetails.productPicture.map((thumb, index) =>
                <div className="thumbnail">
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              )
            }
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> 
          </div> */}
                  <div className="app__detail-product-content-wrap">
                    <div class="grid__column-5">
                      <div class="product__detail-content">
                        <div class="product__detail-wrap-img">
                          <img
                            src={
                              product.productDetails.productPicture[
                                productPictureIndex
                              ].img
                            }
                            alt={`${product.productDetails.productPicture[productPictureIndex].img}`}
                            class="detail__img-big"
                          />
                        </div>
                        <div class="product__detail-list-img">
                          {product.productDetails.productPicture.map(
                            (item, index) => (
                              <div class="detail__list-img-small">
                                <a href="" class="link__detail-img-small">
                                  <img
                                    onClick={(e) => handleClickImage(index, e)}
                                    src={item.img}
                                    class="detail__img-small"
                                  />
                                </a>
                              </div>
                            )
                          )}
                        </div>
                        <div class="product__detail-share-and-likes">
                          <div class="product__detail-share">
                            <span
                              style={{
                                display: "contents",
                                marginRight: "10px",
                              }}
                            >
                              Chia sẽ
                            </span>
                            <Tag
                              style={{ marginLeft: "10px", cursor: "pointer" }}
                              icon={
                                <TwitterOutlined
                                  style={{ display: "contents" }}
                                />
                              }
                              color="#55acee"
                            >
                              Twitter
                            </Tag>
                            <Tag
                              style={{ cursor: "pointer" }}
                              icon={
                                <YoutubeOutlined
                                  style={{ display: "contents" }}
                                />
                              }
                              color="#cd201f"
                            >
                              Youtube
                            </Tag>
                            <Tag
                              style={{ cursor: "pointer" }}
                              icon={
                                <FacebookOutlined
                                  style={{ display: "contents" }}
                                />
                              }
                              color="#3b5999"
                            >
                              Facebook
                            </Tag>
                            <Tag
                              style={{ cursor: "pointer" }}
                              icon={
                                <LinkedinOutlined
                                  style={{ display: "contents" }}
                                />
                              }
                              color="#55acee"
                            >
                              LinkedIn
                            </Tag>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* action buttons */}

                    <div class="grid__column-7">
                      <div class="body__content">
                        <h3 class="body__content-header">
                          {product.productDetails.name}
                        </h3>
                      </div>
                      <div class="body__content-rate">
                        <a class="rate__value">4.1</a>
                        <div class="rate-star--wrap">
                          {/* <!-- số sao đánh giá có màu vàng --> */}
                          <Rating
                            name="no-value"
                            value={4}
                            size="large"
                            style={{ marginTop: "10px" }}
                          />
                        </div>
                        <div class="content__evaluate">
                          <span class="content__evaluate-value">3,9k</span>
                          <span class="content__evaluate-title">Đánh Giá</span>
                        </div>
                        <div class="content__sold">
                          <span class="content__sold-value">
                            {product.productDetails.quantitySold}
                          </span>
                          <span class="content__sold-title">Đã bán</span>
                        </div>
                      </div>
                      <div class="content__trademark">
                        <span class="content__trademark-title">
                          Thương hiệu:
                        </span>
                        <a href="#" class="content__trademark-name">
                          {product.productDetails.category.name}
                        </a>
                      </div>
                      <div class="content__quantity-product">
                        <span>
                          Chỉ còn {product.productDetails.quantity} sản phẩm
                        </span>
                      </div>
                      <div class="content__price">
                        <div class="content__price-new">
                          {formatThousand(product.productDetails.salePrice)} ₫
                        </div>
                        <div class="content__price-old">
                          {formatThousand(product.productDetails.regularPrice)}{" "}
                          ₫
                        </div>
                      </div>
                      <div class="content__note">
                        <span>Bạn sẽ nhận được</span>
                      </div>
                      <div class="content__promotion">
                        <i class="fas fa-hand-holding-usd content__promotion-icon"></i>
                        <span class="content__promotion-title">Tặng</span>
                        <span class="content__promotion-mul">x</span>
                        <span class="content__promotion-mul-num">1</span>
                        <span class="content__promotion-info">
                          Mã giảm giá 1.000.000 ₫ khi mua thêm 1 Laptop cùng
                          thương hiệu
                        </span>
                      </div>
                      {/* van chuyen */}
                      {renderListTranpost()}
                      <div class="content__quantity">
                        Phí vận chuyển
                        {/* <Select
                        defaultValue={
                          methodShip[0] ? methodShip[0].service_id : ""
                        }
                        style={{
                          width: 120,
                          margin: "0 20px",
                        }}
                        onChange={handleMethodShip}
                        disabled={xa ? false : true}
                      >
                        {methodShip &&
                          methodShip.map((item) => (
                            <Option
                              value={item.service_id}
                              key={item.service_id}
                            >
                              {item.short_name}
                            </Option>
                          ))}
                      </Select> */}
                        <span
                          style={{
                            height: "30px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "10px",
                          }}
                        >
                          {formatThousand(shipOrder)} VNĐ
                        </span>
                      </div>
                      <div
                        class="content__quantity"
                        style={{ display: "block" }}
                      >
                        Thời gian giao dự kiến
                        <span
                          style={{
                            marginLeft: "10px",
                            height: "30px",
                            fontSize: "15px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          {timeShip ? timeShip : "Từ 1 - 3 ngày"}
                        </span>
                      </div>
                      {/* end */}
                      <div class="content__quantity">
                        Số Lượng
                        <span
                          class="quantity__icon-sub"
                          style={{ height: "31px" }}
                          onClick={handleMinusProduct}
                        >
                          <FaMinus class="fas fa-minus" />
                        </span>
                        <input
                          type="text"
                          class="quantity__input"
                          value={numberProduct}
                        />
                        <span
                          class="quantity__icon-add"
                          style={{ height: "31px" }}
                          onClick={handlePlusProduct}
                        >
                          <FaPlus class="fas fa-plus" />
                        </span>
                      </div>
                      <div class="content__buy">
                        <div
                          class="content__buy-cart1"
                          style={{ marginRight: "20px" }}
                        >
                          {/* <span class="content__buy-cart-icon">
                          <i class="fas fa-cart-plus"></i>
                        </span> */}
                          {/* <h3 class="content__buy-cart-title" onClick={handleAddToCart}>Thêm Vào Giỏ Hàng</h3> */}
                          <Button
                            variant="contained"
                            onClick={handleAddToCart}
                            size="large"
                          >
                            Thêm Vào Giỏ Hàng
                          </Button>
                        </div>
                        {/* <div class="content__buy-now" onClick={handleAddToCart}>
                        <a href='/cart' style={{ textDecoration: "none" }}>Mua Ngay</a>
                      </div> */}
                        <Button
                          variant="contained"
                          color="success"
                          size="large"
                        >
                          Mua Ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="app__detail-description-wrap" /*style={{overflow: 'hidden',textOverflow:'ellipsis',height:'900px'}}*/
                  >
                    <div class="app__detail-description">
                      <h2 class="description__title-1">Mô tả sản phẩm</h2>
                      <div class="description__summary-wrap">
                        <FormGroup>
                          <div className="border ql-container p-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.productDetails.description,
                              }}
                            />
                          </div>
                        </FormGroup>
                      </div>
                    </div>
                    {renderTableProductDes()}
                  </div>
                  <Card
                    title="Hỏi đáp"
                    type="inner"
                    style={{ marginTop: "25px" }}
                    className="commentProduct"
                  >
                    {renderComment()}
                  </Card>
                  {renderProductLienQuan()}
                </div>
                <div>
                  {/* home > category > subCategory > productName */}

                  {/* product description */}
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Layout>
      {renderTableProductDesShow()}
    </>
  );
};

export default ProductDetailsPage;
