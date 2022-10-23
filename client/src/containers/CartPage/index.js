import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import { Layout } from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import formatThousand from "../../utils/formatThousans";
import { IoTrash } from "react-icons/io5";
import { FaCheckSquare } from "react-icons/fa";
import slugify from "react-slugify";
import "./style.css";
import CheckoutPage from "../CheckoutPage";
import { Button, Link, Typography } from "@mui/material";

/**
 * @author
 * @function CartPage
 **/

export const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  /* useEffect(() => {
    Object.keys(cartItems).map((key,index)=>{
      return {
        inedx:index,
        select:false,
        id:cartItems[key]._id
      }
    })
  }, ) */
  /*  const cartItems = cart.cartItems */
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const [checkedState, setCheckedState] = useState([]);
  const [total, setTotal] = useState(0);

  const handleBuyCart = () => {
    console.log("checkout");
    if (cartItems.length == 0) {
      return;
    } else {
      props.history.push(`/checkout`);
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        item.select = true;
      }
    });

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce((sum, index) => {
      if (updatedCheckedState[index] === true) {
        console.log(index);
        return sum + cartItems[index].salePrice * cartItems[index].qty;
      }
      return sum;
    }, 0);
    console.log(checkedState);
    setTotal(totalPrice);
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };
  const onQuantityIncrement = (_id, qty) => {
    console.log(cartItems[_id]);
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }
  const getTotalPrice = () => {
    if (!cartItems) return 0;

    return Object.keys(cartItems).reduce((totalPrice, index) => {
      console.log(index);

      return totalPrice + cartItems[index].qty * cartItems[index].salePrice;
    }, 0);
  };
  const getTotalAmount = () => {
    if (!cartItems) return 0;
    return Object.keys(cartItems).reduce((totalAmount, index) => {
      return totalAmount + 1;
    }, 0);
  };
  const totalItemSelect = () => {
    return checkedState.reduce((sum, item, index) => {
      if (checkedState[index].select === true) {
        /*  console.log(item) */
        return sum + 1;
      }
      return sum;
    }, 0);
  };

  const renderCartPrice = () => (
    <div className="">
      {/* thanh toan */}
      <div class="content__body-buy-item">
        <div class="sum__price-buy-item" style={{ marginLeft: "auto" }}>
          Tổng Thanh Toán (
          <span class="quantity__item-product">{getTotalAmount()}</span>Sản
          phẩm):
          <div class="sum__price-all-item-product-wrap">
            <span>{formatThousand(getTotalPrice())}₫</span>
          </div>
          <div class="btn__buy-item btn btn__primary" onClick={handleBuyCart}>
            Mua ngay
          </div>
        </div>
      </div>
    </div>
  );

  const renderCartItems = () => {
    return (
      <div className="content__body-product-list">
        {Object.keys(cartItems).length !== 0 ? (
          Object.keys(cartItems).map((key, index) => (
            <div
              className="cart__item content__body-product-item"
              key={cartItems[key]._id}
            >
              {console.log("cart", cartItems)}
              <div class="content__body-product-item-title">
                <div class="cart__checkbox-box cart__checkbox-box-item">
                  {/* <!-- Khi click thì kích hoạt  cart__checkbox-box-when-click--item--> */}
                  <span className="cart__checkbox-box-when-click--select item__active"></span>
                </div>
                <a
                  href={`/${slugify(cartItems[key].name)}/${
                    cartItems[key]._id
                  }/p`}
                >
                  <span
                    class="content__body-item-product-img"
                    href={`/${slugify(cartItems[key].name)}/${
                      cartItems[key]._id
                    }/p`}
                  >
                    <img src={cartItems[key].img} alt="" />
                  </span>
                </a>
                <div class="content__body-product-item-title-wrap">
                  <a
                    href={`/${slugify(cartItems[key].name)}/${
                      cartItems[key]._id
                    }/p`}
                    className="name-product"
                  >
                    <div class="product-item-title--name">
                      {cartItems[key].name}
                    </div>
                  </a>
                  <div class="product-item-title--return">
                    <span class="product-item-title--return-icon">30</span>
                    30 Ngày Miễn Phí Trả Hàng
                  </div>
                </div>
              </div>

              <div class="content__body-product-item-price">
                {cartItems[key].salePrice &&
                  formatThousand(cartItems[key].salePrice)}{" "}
                ₫
              </div>
              <div className="content__body-product-item-quantity">
                <button
                  className={`cart__item-quantity-button  ${
                    cartItems[key].qty <= 1 &&
                    "cart__item-quantity-button--disabled"
                  }`}
                  onClick={(e) => {
                    if (cartItems[key].qty <= 1) {
                      e.preventDefault();
                    } else {
                      onQuantityDecrement(
                        cartItems[key]._id,
                        cartItems[key].qty
                      );
                    }
                  }}
                >
                  -
                </button>
                <input
                  className="cart__item-quantity-input"
                  value={cartItems[key].qty}
                  readOnly
                />
                <button
                  className="cart__item-quantity-button"
                  onClick={() => onQuantityIncrement(cartItems[key]._id)}
                >
                  +
                </button>
              </div>
              <p class="content__body-product-item-money">
                {formatThousand(cartItems[key].qty * cartItems[key].salePrice)}₫
              </p>
              {props.isCheckout && <div className="cart__item-remove"></div>}
              {!props.isCheckout && (
                <div
                  className="cart__item-remove"
                  onClick={() => onRemoveCartItem(cartItems[key]._id)}
                >
                  <Button variant="outlined" color="error" size="large">
                    Xoá
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <Link style={{ fontSize: "20px" }} href="/">
            Bạn chưa có sản phẩm nào. Đi đến trang sản phẩm !!!
          </Link>
        )}
      </div>
    );
  };
  return (
    <Layout>
      <div className="cartContainer mt-32">
        <div className="grid wide">
          <div className="row">
            <div className="col lg-8">
              <div className="cart-container" style={{ paddingTop: "20px" }}>
                <div className="cart__header">Giỏ hàng</div>
                <div class="cart__item-content">
                  <div class="cart__item-content-wrap">
                    <div class="content__head--tile-wrap">
                      <div class="cart__check-wrap">
                        <div class="cart__checkbox-box">
                          {/* <!-- Khi click thì kích hoạt  cart__checkbox-box-when-click--select--> */}
                          <span class="cart__checkbox-box-when-click--select">
                            <i class="fas fa-check-square"></i>
                          </span>
                        </div>
                        <div class="cart__check-title">Sản Phẩm</div>
                      </div>
                      <div class="cart__check-price">Đơn Giá</div>
                      <div class="cart__check-quantity">Số Lượng</div>
                      <div class="cart__check-money">Số Tiền</div>
                      <div class="cart__check-operation">Thao Tác</div>
                    </div>
                    <div class="content__body-item-wrap">
                      {renderCartItems()}
                    </div>
                  </div>
                </div>
                <div className="col lg-4">{renderCartPrice()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
