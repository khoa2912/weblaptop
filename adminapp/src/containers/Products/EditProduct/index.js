'use strict';
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Input from "../../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, FormGroup } from 'react-bootstrap';
import "./style.css";
import { addProduct, editProduct, getProductDetailsById } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import swal from "sweetalert";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Tabs ,Upload,Modal} from 'antd';
import { CKEditor } from 'ckeditor4-react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
const { TabPane } = Tabs;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export const EditProduct = (props) => {
  const product = useSelector((state) => state.product);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const initDesciptionModel={
    Series: "",
    baohanh: "",
    cardDoHoa: "",
    color: "",
    cpu: "",
    hedieuhanh: "",
    khoiluong: "",
    manhinh: "",
    ocung: "",
    ram: "",
  }
  useEffect(() => {
    setProductDetails(product.productDetails);
    setDescriptionTable(product.description);
    setProductPicture(product.productDetails.productPicture)
    setContent(product.productDetails.description)
    /* swal("Thành công","Thêm sản phẩm thành công","success") */
   if(product.productDetails!==[]){
    productPicture&&productPicture.map(item=>(
      Object.assign(item,{url:`${generatePublicUrl(item.img)}`})
    ))
   }
  }, [product.productDetails]);
  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };

    dispatch(getProductDetailsById(payload));
    // if(product.productDetails!==''){
    //   const descriptionHTML= convertFromHTML(productDetails.description);
    //   const descriptionHTMLState = ContentState.createFromBlockArray(
    //     descriptionHTML
    //   );
    //   setEditorState(EditorState.createWithContent(descriptionHTMLState))

    // }
  }, []);

  const [productDetails, setProductDetails] = useState(
    {
      name: "",
      quantity: "",
      regularPrice: "",
      salePrice: "",
      description: "",
      category: {
        _id:"",
        name:""
      },
      descriptionTable: {},
    },
    []
  );
  const [descriptionTable, setDescriptionTable] = useState({
    Series: "",
    baohanh: "",
    cardDoHoa: "",
    color: "",
    cpu: "",
    hedieuhanh: "",
    khoiluong: "",
    manhinh: "",
    ocung: "",
    ram: "",
  });


  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [productPicture, setProductPicture] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [editorState, setEditorState] = useState(
  //   () => EditorState.createWithContent(
  //     ContentState.createFromBlockArray(
  //       convertFromHTML(product.productDetails.description ? product.productDetails.description : "")
  //     )
  //   ),
  // );


  const handleInput = (e) => {
    e.persist();
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const handleInputDes = (e) => {
    e.persist();
    setDescriptionTable({ ...productDetails, [e.target.name]: e.target.value });
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

  const handleProductPictures = (filelist) => {
    filelist.forEach(element => {
      setProductPicture([...productPicture, element]);
    });
  };
  const handleChange = ({ file, fileList }) => {
    const acceptedFileType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword','application/pdf','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (acceptedFileType.includes(file.type)) {
      if (!file.preview && file.originFileObj?.name) {
        getBase64(file.originFileObj).then(result => {
          file.preview = result;
        });
        file.response = null;
        file.status = 'done';
      }
      console.log('change')
      handleProductPictures(fileList);

      if (props.onAddImage) {
        return props.onAddImage(fileList);
      }

      props.onChange(fileList);

    }
  };

  const submitProductForm = () => {
    const form = new FormData();
    form.append("id", productDetails._id);
    form.append("category", productDetails.category._id);
    form.append("name", productDetails.name);
    form.append("quantity", productDetails.quantity);
    form.append("regularPrice", productDetails.regularPrice);
    form.append("salePrice", productDetails.salePrice);
    form.append("description", productDetails.description);
    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }
    form.append("timeBaoHanh", descriptionTable.timeBaoHanh);
    form.append("series", descriptionTable.series);
    form.append("color", descriptionTable.color);
    form.append("cpu", descriptionTable.cpu);
    form.append("card", descriptionTable.card);
    form.append("ram", descriptionTable.ram);
    form.append("manhinh", descriptionTable.manhinh);
    form.append("ocung", descriptionTable.ocung);
    form.append("hedieuhanh", descriptionTable.hedieuhanh);
    form.append("khoiluong", descriptionTable.khoiluong);
    dispatch(editProduct(form));
    swal("Cập nhật sản phẩm", "Cập nhật thành công!", "success").then(
      (value) => {
        props.history.push("/products");
      }
    );


  };
  const handleRemove = (file) => {
    let copyPicture=productPicture
    copyPicture = copyPicture.filter(function(item) {
      return item._id !== file._id
  })
  setProductPicture(copyPicture)
  return true

  };
  productPicture&&productPicture.map(item=>(
    Object.assign(item,{url:`${generatePublicUrl(item.img)}`})
  ))
  const handlePreview = fileList => {
    fileList.forEach((element)=>{
      setPreviewImage(generatePublicUrl(element.img));
      console.log(generatePublicUrl(element.img))
      setPreviewVisible(true);
      setPreviewTitle(element.name);
    })
    
  };
  const handleOnChangeDesciption = (event) => {
    setProductDetails({ ...productDetails, ['description']: event.editor.getData() });
  }
  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <Layout>
      <h2 className="header_editProduct" style={{ paddingTop: "20px" }}>
        Chỉnh sửa sản phẩm
      </h2>
      <Tabs defaultActiveKey="1" style={{ color: 'black', fontSize: '19px' }}>
        <TabPane tab={
          <span>
            Thông tin chung
          </span>
        } key="1"
        >
          <div
            className="container_addProduct"
            style={{ display: "-webkit-box", paddingTop: "20px" }}
          >
            <div
              className="container_form_addProduct"
              style={{ paddingBottom: "50px", width: "40%", paddingRight: "30px" }}
            >
              {/* <Input
                label="Tên"
                value={productDetails.name||""}
                name="name"
                placeholder="Tên sản phẩm"
                onChange={handleInput}
              /> */}
              <TextField
                required
                style={{width:'100%',marginBottom:'15px'}}
                label="Tên sản phẩm"
                value={productDetails.name||""}
                name='name'
                onChange={handleInput}
              />
              <TextField
                required
                id="outlined-number"
                label="Số lượng"
                type="number"
                name="quantity"
                value={productDetails.quantity||""}
                style={{width:'100%',marginBottom:'15px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInput}
              />
              {/* <Input
                label="Số lượng"
                name="quantity"
                value={productDetails.quantity||""}
                placeholder={"Số lượng sản phẩm"}
                onChange={handleInput}
              /> */}
              {/* <Input
                label="Giá tiền gốc"
                name="regularPrice"
                value={productDetails.regularPrice||""}
                placeholder={"Giá tiền sản phẩm"}
                onChange={handleInput}
              /> */}
              <FormControl fullWidth style={{width:'100%',marginBottom:'15px'}} >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Giá tiền gốc
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={productDetails.regularPrice||""}
                  name="regularPrice"
                  onChange={handleInput}
                  startAdornment={
                    <InputAdornment position="start">VNĐ</InputAdornment>
                  }
                  label="Giá tiền gốc"
                />
              </FormControl>
              {/* <Input
                label="Giá tiền giảm giá"
                name="salePrice"
                value={productDetails.salePrice||""}
                placeholder={"Giá tiền sản phẩm"}
                onChange={handleInput}
              /> */}
              <FormControl fullWidth style={{width:'100%',marginBottom:'15px'}}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Giá tiền giảm giá
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  name="salePrice"
                  value={productDetails.salePrice||""}
                  onChange={handleInput}
                  
                  startAdornment={
                    <InputAdornment position="start">VNĐ</InputAdornment>
                  }
                  label="Giá tiền giảm giá"
                />
              </FormControl>



              {/* <select
                className="form-control"
                name="categoryId"
                value={productDetails.category?productDetails.category._id:""}
                onChange={handleInput}
                style={{ padding: "11px 18px" }}
              >
                <option>Thương hiệu</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Thương hiệu
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productDetails.category?productDetails.category._id:""}
                  name="categoryId"
                  label="Thương hiệu"
                  onChange={handleInput}
                >
                  {createCategoryList(category.categories).map((option) => (
                    <MenuItem value={option.value}>{option.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </div>
            <ul></ul>
            <div className="containerPicture" style={{ width: '40%' }}>
              {/* {productPicture.length > 0
                ? productPicture.map((pic, index) => (
                  <div key={index}>{JSON.stringify(pic.name)}</div>
                ))
                : null}
              <input
                type="file"
                name="productPicture"
                onChange={handleProductPictures}
                multiple
              /> */}
              {/* <div>
            <div style={{ display: "flex" }}>
              {productPicture.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
            <label className="key title_image" style={{ marginTop: "20px" }}>
              Hình ảnh sản phẩm
            </label>
            <div style={{  width:"100%",display:"flex",flexWrap:"wrap" }}>
              {productDetails.productPicture.map((picture) => (
                <div className="productImg">
                  <img
                    style={{ height: "100%", padding:"5px",width:"100%"}}
                    src={generatePublicUrl(picture.img)}
                  />
                </div>
              ))}
            </div>
          </div> */}
              <Upload
                listType="picture-card"
                fileList={productPicture}
                multiple={true}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                customRequest={customRequest}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{props.title || 'Thêm hình ảnh'}</div>
                </div>
              </Upload>
            </div>

          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              Mô tả sản phẩm
            </span>
          }
          style={{ paddingBottom: '20px' }}
          key="2"
        >
          <FormGroup>

            {/* <Editor
                            editorState={editorState}
                            wrapperClassName="card"
                            editorClassName="card-body"
                            onEditorStateChange={newState => {
                                setEditorState(newState);
                                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                                setProductDetails({ ...productDetails, ['description']: content });
                            }}
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'embedded', 'emoji', 'image'],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                        /> */}
            <CKEditor config={{
              enterMode: 2,
              resize_minWidth: '100%',
              resize_maxHeight: 600,
              //filebrowserBrowseUrl: '/browser/browse.php',
              //filebrowserUploadUrl: '/uploader/upload.php',
              pasteFromWordRemoveStyles: false,
              pasteFromWordNumberedHeadingToList: true,
              pasteFromWordPromptCleanup: true,
            }} initData={content||''} onChange={handleOnChangeDesciption} />
          </FormGroup>
        </TabPane>
        <TabPane
          tab={
            <span>
              Chi tiết sản phẩm
            </span>
          }
          style={{ paddingBottom: '20px' }}
          key="3"
        >
          <div className="table_des" style={{ width: "100%" }}>
            <h2 style={{ fontSize: "1.5rem" }}>Bảng mô tả chi tiết</h2>
            {/* <Input
              label="Thời gian bảo hành"
              name="timeBaoHanh"
              value={descriptionTable?descriptionTable.baohanh:""}
              placeholder={"Thời gian bảo hành"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Thời gian bảo hành"
                style={{width:'45%',marginBottom:'15px', marginRight:'20px'}}
                name="timeBaoHanh"
                value={descriptionTable?descriptionTable.baohanh:""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Series"
              name="series"
              value={descriptionTable?descriptionTable.Series:""}
              placeholder={"Series"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Series"
                style={{width:'45%',marginBottom:'15px'}}
                name="series"
                value={descriptionTable?descriptionTable.Series:""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Màu sắc"
              name="color"
              value={descriptionTable?descriptionTable.color:""}
              placeholder={"Màu sắc"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Màu sắc"
                style={{width:'45%',marginBottom:'15px',marginRight:'20px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="color"
                value={descriptionTable?descriptionTable.color:""}
                onChange={handleInputDes}
              />
            {/* <Input
              label="CPU"
              name="cpu"
              value={descriptionTable?descriptionTable.cpu:""}
              placeholder={"CPU"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="CPU"
                style={{width:'45%',marginBottom:'15px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="cpu"
                value={descriptionTable?descriptionTable.cpu:""}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Card đồ họa"
              name="cardDohoa"
              value={descriptionTable?descriptionTable.cardDohoa:""}
              placeholder={"Card đồ họa"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Card đồ họa"
                style={{width:'45%',marginBottom:'15px',marginRight:'20px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="cardDohoa"
                value={descriptionTable?descriptionTable.cardDohoa:""}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Ram"
              name="ram"
              value={descriptionTable?descriptionTable.ram:""}
              placeholder={"Ram"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Ram"
                style={{width:'45%',marginBottom:'15px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="ram"
                value={descriptionTable?descriptionTable.ram:""}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Màn hình"
              name="manhinh"
              value={descriptionTable?descriptionTable.manhinh:""}
              placeholder={"Màn hình"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Màn hình"
                style={{width:'45%',marginBottom:'15px',marginRight:'20px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="manhinh"
                value={descriptionTable?descriptionTable.manhinh:""}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Ổ cứng"
              value={descriptionTable?descriptionTable.ocung:""}
              name="ocung"
              placeholder={"Ổ cứng"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Ổ cứng"
                style={{width:'45%',marginBottom:'15px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                value={descriptionTable?descriptionTable.ocung:""}
                name="ocung"
                onChange={handleInputDes}
              />
            {/* <Input
              label="Hệ điều hành"
              name="hedieuhanh"
              value={descriptionTable?descriptionTable.hedieuhanh:""}
              placeholder={"Hệ điều hành"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Hệ điều hành"
                style={{width:'45%',marginBottom:'15px',marginRight:'20px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="hedieuhanh"
                value={descriptionTable?descriptionTable.hedieuhanh:""}
                onChange={handleInputDes}
              />
            {/* <Input
              label="Khối lượng"
              name="khoiluong"
              value={descriptionTable?descriptionTable.khoiluong:""}
              placeholder={"Khối lượng"}
              onChange={handleInputDes}
            /> */}
            <TextField
                required
                id="outlined-number"
                label="Khối lượng"
                style={{width:'45%',marginBottom:'15px'}}
                InputLabelProps={{
                  shrink: true,
                }}
                name="khoiluong"
                value={descriptionTable?descriptionTable.khoiluong:""}
                onChange={handleInputDes}
              />
          </div>
        </TabPane>
      </Tabs>
      {/* <button className="btn-addProduct" onClick={submitProductForm}>
        Cập nhật
      </button> */}
      <Button variant="contained" onClick={submitProductForm} color="success">
          Cập nhật sản phẩm
      </Button>
    </Layout>
  );
};
