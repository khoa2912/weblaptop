import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Banner(props) {
  const { category } = props;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Carousel
        className="banner_category"
        activeIndex={index}
        onSelect={handleSelect}
        indicators="true"
        prevLabel=""
        nextLabel=""
        variant="dark"
      >
        {category.map((item, index) => (
          <Carousel.Item key={index} interval={2000}>
            <Link
              className="trademark__content-link"
              to={`/${item.slug}?cid=${item._id}&type=${item.type}`}
            >
              <img className="d-block w-100" src={item.image} />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
