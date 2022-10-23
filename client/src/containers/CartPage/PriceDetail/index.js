import React from "react";
import Card from "../../../../components/UI/Card";
import "./style.css";
function PriceDetail(props) {
  const { totalAmount, totalPrice } = props;
  return (
    <Card style={{ width: "400px" }} leftHeader={<div>Price</div>}>
      <div className="flexRow sb priceInfo">
        <div>Amount: </div>
        <div>{totalAmount}</div>
      </div>
      <div className="flexRow sb priceInfo">
        <div>Delivery charges: </div>
        <div>FREE</div>
      </div>
      <div className="flexRow sb priceInfo">
        <div>Total price: </div>
        <div>{totalPrice}</div>
      </div>
    </Card>
  );
}

export default PriceDetail;