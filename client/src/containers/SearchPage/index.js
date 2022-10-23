import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Pagination, Tag, Button, Select } from "antd";

import "antd/dist/antd.css";

import "./style.css";
import {
  getAllProducts,
  getByQuery,
  getBySearch,
  searchProduct,
} from "../../actions";
import formatThousand from "../../utils/formatThousans";
import { Layout } from "../../components/Layout";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const ORDER_OPTIONS = [
  {
    value: "newest",
    name: "Năm sản xuất",
  },
  {
    value: "priceLowToHigh",
    name: "Giá: Thấp đến cao",
  },
  {
    value: "priceHighToLow",
    name: "Giá: Cao đến thấp",
  },
];
const { Option } = Select;
function SearchPage(props) {
  const history = useHistory();
  const { CheckableTag } = Tag;
  const dispatch = useDispatch();
  const search = useLocation().search;
  const { q, page, orderBy, categoryId } = queryString.parse(search);
  const { allProducts } = useSelector((state) => state.product);
  /* console.log(orderBy); */
  /** Use State */
  const [order, setOrder] = useState(orderBy || ORDER_OPTIONS[0].value);
  const category = useSelector((state) => state.category);
  const { productSearch } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  const [productSearchs, setProductSearchs] = useState(productSearch);
  const [indexFilter, setIndexFilter] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [categoryActive, setCategoryActive] = useState(-1);
  const [allColor, setAllColor] = useState([]);
  const [size, setSize] = useState("middle");
  function unique_arr(arr) {
    let newArr = arr.reduce(function (accumulator, element) {
      if (accumulator.indexOf(element) === -1) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
    return newArr;
  }
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  /** End Use State */
  useEffect(() => {
    setProductSearchs(productSearch);
    setTotalPage(productSearch.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);
  }, [loading]);

  useEffect(() => {
    const payload = {
      q,
      orderBy,
      categoryId,
    };
    setLoading(true);
    dispatch(searchProduct(payload)).then((data) => {
      setLoading(false);
      const allcolors = data.map((item) => item.descriptionTable[0].color);
      setAllColor(unique_arr(allcolors));
    });
  }, [dispatch, q, page, orderBy, categoryId]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const onCategoryChange = (value, index) => {
    const searchString = queryString.stringify({
      q,
      orderBy,
      categoryId: value,
    });
    history.push({
      search: searchString,
    });
    dispatch(searchProduct(searchString));
    setCategoryActive(index);
  };
  const onChangePagination = (current, pageSize) => {
    setCurrent(current);
    setPageSize(pageSize);
    setMinIndex((current - 1) * pageSize);
    setMaxIndex(pageSize * current);
  };
  const onOrderChange = (value) => {
    setOrder(value);
    const searchString = queryString.stringify({
      q,
      categoryId,
      orderBy: value,
    });
    history.push({
      search: searchString,
    });
  };
  function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
      <Button
        color={value}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Button>
    );
  }
  /** End Function */
  const renderFilter = () => (
    <div class="search__filter-wrap">
      <div class="search__filter-heading">
        <div class="search__filter-heading-title">
          <div class="search__filter-heading-title-icon"></div>
          Bộ Lọc
        </div>
        {/* <Button size="default" style={{ marginRight: "10px" }} className="">
          {"item"}
          <AiOutlineCheck class="gg-check" />
        </Button> */}
      </div>
      <div class="search__filter-trademark-wrap">
        <div class="search__filter-trademark-title">Thương Hiệu</div>
        <div class="search__filter-trademark ">
          {/* <!-- Thêm search__filter-trademark-item-active và wrap__icon khi active --> */}
          {Object.keys(category.categories).map((item, index) => (
            <div
              class={
                categoryActive === index
                  ? "search__filter-trademark-item search__filter-trademark-item-active"
                  : "search__filter-trademark-item search__filter-trademark-item"
              }
              key={category.categories[item]._id}
              onClick={() =>
                onCategoryChange(category.categories[item]._id, index)
              }
            >
              <span class="search__filter-trademark-item-title">
                {category.categories[item].name}
              </span>
              <span
                class={
                  categoryActive === index
                    ? "search__filter-trademark-item-icon wrap__icon"
                    : "search__filter-trademark-item-icon"
                }
              >
                {/* <i class="gg-check"></i> */}
                <AiOutlineCheck class="gg-check" />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div class="search__filter-trademark-wrap">
        <div class="search__filter-trademark-title">Màu sắc</div>
        <div class="search__filter-trademark ">
          {/* <!-- Thêm search__filter-trademark-item-active và wrap__icon khi active --> */}
          {allColor.map(
            (item, index) =>
              item !== "undefined" && (
                <Button size="default" style={{ marginRight: "10px" }}>
                  {item}
                </Button>
              )
          )}
        </div>
      </div>
    </div>
  );
  //chỉnh lại phần sắp xêó theo
  return (
    <Layout>
      <div class="search__app-wrap">
        <div class="search__app">
          {renderFilter()}
          <div class="nav__filter">
            <span class="nav__filter__title">Sắp xếp theo</span>
            <button
              class={`nav__filter__btn btn ${
                indexFilter === 0 ? "btn__primary" : "btn__normal"
              }`}
              onClick={() => setIndexFilter(0)}
            >
              Phổ biến
            </button>
            <button
              class={`nav__filter__btn btn ${
                indexFilter === 1 ? "btn__primary" : "btn__normal"
              }`}
              onClick={() => setIndexFilter(1)}
            >
              Mới nhất
            </button>
            <button
              class={`nav__filter__btn btn ${
                indexFilter === 2 ? "btn__primary" : "btn__normal"
              }`}
              onClick={() => setIndexFilter(2)}
            >
              Bán chạy
            </button>
            <button
              class={`nav__filter__btn btn ${
                indexFilter === 3 ? "btn__primary" : "btn__normal"
              }`}
              onClick={() => setIndexFilter(3)}
            >
              Khuyến mãi
            </button>

            <select
              class="select-input--price select-input"
              name="order"
              value={order}
              onChange={(e) => onOrderChange(e.target.value)}
            >
              Giá
              {/* <!-- select option price --> */}
              {ORDER_OPTIONS.map((option) => (
                <option
                  class="select-input--item"
                  key={option.value}
                  value={option.value}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          {loading === true ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div class="product__search">
              <div class="product__search-trademark-list">
                {productSearch.length !== 0 ? (
                  productSearch.map(
                    (item, index) =>
                      index >= minIndex &&
                      index < maxIndex && (
                        <div
                          class="product__search-trademark-item"
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
                                    {formatThousand(
                                      item.regularPrice - item.salePrice
                                    )}{" "}
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
                      )
                  )
                ) : (
                  <h2>Không có sản phẩm phù hợp</h2>
                )}
              </div>
            </div>
          )}
          <Pagination
            className="pagination"
            showSizeChanger
            onChange={onChangePagination}
            defaultCurrent={1}
            total={productSearch.length}
          />
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
