import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions/product";
import { NewModal as Modal } from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { deleteProductById } from "../../actions";
import formatThousand from "../../util/formatThousans";
import { FaTrashAlt, FaPenSquare } from "react-icons/fa";
import { getProducts } from "../../actions/product";
import swal from "sweetalert";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import { Button, Fab, Skeleton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productPicture, setProductPicture] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  useEffect(() => {
    dispatch(getProducts());
    if (product.products.length > 0) {
      setTotalPage(product.products.length / pageSize);
      setMinIndex(0);
      setMaxIndex(pageSize);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleDeleteProduct = (id) =>
    swal({
      title: "Bạn có chắc?",
      text: "Xóa sản phẩm sẽ không thể khôi phục lại",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Xóa sản phẩm thành công!", {
          icon: "success",
        });
        const payload = {
          productId: id,
        };
        dispatch(deleteProductById(payload));
      } else {
      }
    });

  const onChangePagination = (current, pageSize) => {
    setCurrent(current);
    setPageSize(pageSize);
    setMinIndex((current - 1) * pageSize);
    setMaxIndex(pageSize * current);
  };
  const handleProductPictures = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <div className="nav__product">
        <div className="nav__product-heading">
          <div className="nav__product-heading-title">Sản Phẩm</div>
          <Button variant="outlined" href="/createProduct">
            Thêm Mới Sản Phẩm
          </Button>
          {/* <a style={{ textDecoration: 'none',color:'black' }} className="nav__product-heading-add-new" href='/createProduct'>Thêm Mới Sản Phẩm</a> */}
        </div>
        <div className="nav__product-body">
          <div className="nav__product-body-title">
            <div className="id__product">STT</div>
            <div className="name__product">Tên Sản Phẩm</div>
            <div className="trademark__product">Thương Hiệu</div>
            <div className="type__product">Màu Sắc</div>
            <div className="quantity__product">Số Lượng</div>
            <div className="price__product">Giá</div>
            <div className="date__update" style={{ paddingLeft: "20px" }}>
              Ngày Cập Nhập
            </div>
          </div>
          <ul className="product__detail-list">
            {product.products.length > 0
              ? product.products.map(
                  (product, index) =>
                    index >= minIndex &&
                    index < maxIndex && (
                      <li
                        className="produtc__detail-item-wrap"
                        key={product._id}
                      >
                        <div className="check__select-item">
                          <div className="no_active__check-item active__check-item"></div>
                        </div>

                        <div
                          className="produtc__detail-item"
                          onClick={() => showProductDetailsModal(product)}
                        >
                          <div className="id__product-detail">{index + 1}</div>
                          <a className="name__product-detail">{product.name}</a>
                          <div className="trademark__product-detail">
                            {product.category.name}
                          </div>
                          <div className="type__product-detail">
                            {product.descriptionTable[0]
                              ? product.descriptionTable[0].color
                              : ""}
                          </div>
                          <div className="quantity__product-detail">
                            {product.quantity}
                          </div>
                          <div className="price__product-detail">
                            {formatThousand(product.regularPrice)} ₫
                          </div>
                          <div className="date__update-product">21-12-2021</div>
                        </div>
                        {/* <div
                          className="delete__one-select-product"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <FaTrashAlt className="far fa-trash-alt" />
                        </div> */}
                        <Fab color="black" aria-label="edit" size="small" onClick={() => handleDeleteProduct(product._id)}>
                          <DeleteIcon />
                        </Fab>
                        {/* <a
                          className="delete__one-select-product"
                          style={{ paddingLeft: "20px" }}
                          href={`editProduct/${product._id}`}
                        >
                          <FaPenSquare className="far fa-trash-alt" />
                        </a> */}
                        <Fab color="black" aria-label="edit" size="small" href={`editProduct/${product._id}`} style={{marginLeft:'10px'}}>
                          <EditIcon />
                        </Fab>
                      </li>
                    )
                )
              :  (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
          </ul>
        </div>
      </div>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Thêm sản phẩm mới"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Tên"
          value={name}
          placeholder={"Tên sản phẩm"}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Số lượng"
          value={quantity}
          placeholder={"Số lượng sản phẩm"}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <Input
          label="Giá tiền"
          value={price}
          placeholder={"Giá tiền sản phẩm"}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Input
          label="Mô tả"
          value={description}
          placeholder={"Mô tả sản phẩm"}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ padding: "11px 18px" }}
        >
          <option>Thương hiệu</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <ul></ul>
        {productPicture.length > 0
          ? productPicture.map((pic, index) => (
              <div key={index}>{JSON.stringify(pic.name)}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };
  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
  };

  const renderProductsDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailsModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Chi tiết sản phẩm"}
        size="lg"
        onSubmit={() => setProductDetailsModal(false)}
      >
        <Row>
          <Col md="6">
            <label className="key">Tên sản phẩm</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Giá tiền gốc</label>
            <p className="value">
              {formatThousand(productDetails.regularPrice)} ₫
            </p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Số lượng</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Thương hiệu</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Mô tả</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key ">Hình ảnh sản phẩm</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPicture.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}></Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
          <Pagination
            className="pagination"
            showSizeChanger
            onChange={onChangePagination}
            defaultCurrent={1}
            total={product.products.length}
          />
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductsDetailsModal()}
    </Layout>
  );
};
export default Products;
