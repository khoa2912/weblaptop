import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Alert, Spin } from "antd";
import "./style.css";
import formatThousand from "../../../utils/formatThousans";

/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug)).then(() => {
      setLoading(false);
    });
  }, []);
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  const categoryId = product.products.map((product) => {
    return product.category;
  });
  return (
    <Spin tip="Đang tải..." spinning={loading}>
      <div class="trademark__app-wrap">
        <div class="trademark__app">
          <div class="banner__img-wrap">
            {categories.map((item) =>
              item._id === categoryId[0] ? (
                <img src={item.image} alt="" class="banner__img" />
              ) : null
            )}
          </div>
          <div class="trademark__app-content">
            <div class="trademark__app-content-list">
              {product.products.map((product) => (
                <Link
                  style={{ textDecoration: "none" }}
                  class="trademark__app-content-item"
                  to={`/${product.slug}/${product._id}/p`}
                >
                  <div class="item__product-img-wrap">
                    <img
                      src={product.productPicture[0].img}
                      alt=""
                      class="item__product-img"
                    />
                  </div>
                  <div class="item__product-info">
                    <div class="item__product-info-name">{product.name}</div>
                    <div class="item__product-info-quantity">
                      Còn
                      <span>{product.quantity}</span>
                      sản phẩm
                    </div>
                    <div class="item__product-info-price">
                      <div class="item__product-info-price-new">
                        {formatThousand(product.salePrice)} ₫
                      </div>
                      <div class="item__product-info-price-old">
                        {formatThousand(product.regularPrice)} ₫
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ClothingAndAccessories;
