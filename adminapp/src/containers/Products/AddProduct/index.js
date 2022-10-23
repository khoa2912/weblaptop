import React, { useState, useEffect } from "react";
import Input from "../../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import { Container, Row, Col, FormGroup } from "react-bootstrap";
import { addProduct } from "../../../actions";
import Button from "@mui/material/Button";
import "./style.css";
import { Form, Modal, Card } from "antd";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UploadPicture from "../../../components/UploadImage";
import { Tabs } from "antd";
import { CKEditor } from "ckeditor4-react";
import {
  Autocomplete,
  TextField,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import formatThousand from "../../../util/formatThousans";
const { TabPane } = Tabs;

export const AddProduct = (props) => {
  let fileObj = [];
  let fileArray = [];
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [file, setFile] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [productPicture, setProductPicture] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [timeBaoHanh, setTimeBaoHanh] = useState("");
  const [series, setSeries] = useState("");
  const [color, setColor] = useState("");
  const [cpu, setCPU] = useState("");
  const [card, setCard] = useState("");
  const [ram, setRam] = useState("");
  const [manhinh, setManHinh] = useState("");
  const [ocung, setOCung] = useState("");
  const [hedieuhanh, setHeDieuHanh] = useState("");
  const [khoiluong, setKhoiLuong] = useState("");
  const category = useSelector((state) => state.category);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (product.addProduct != null) {
      alert("Thêm sản phẩm thành công");
      props.history.push("/products");
    }
  }, [product.loading]);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("regularPrice", regularPrice);
    form.append("salePrice", salePrice);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }
    form.append("timeBaoHanh", timeBaoHanh);
    form.append("series", series);
    form.append("color", color);
    form.append("cpu", cpu);
    form.append("card", card);
    form.append("ram", ram);
    form.append("manhinh", manhinh);
    form.append("ocung", ocung);
    form.append("hedieuhanh", hedieuhanh);
    form.append("khoiluong", khoiluong);
    console.log(productPicture);
    dispatch(addProduct(form));
  };

  const handleProductPictures = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };
  const handleUploadFile = (value) => {
    setProductPicture(...productPicture, value);
  };
  const handleOnChangeDesciption = (event) => {
    setDescription(event.editor.getData());
  };

  return (
    <Layout>
      <Tabs defaultActiveKey="1" style={{ color: "black", fontSize: "19px" }}>
        <TabPane tab={<span>Thông tin chung</span>} key="1">
          <div
            className="container_addProduct"
            style={{
              display: "flex",
              paddingTop: "0px",
              color: "black",
              fontSize: "17px",
            }}
          >
            <div
              className="container_form_addProduct"
              style={{
                paddingBottom: "50px",
                width: "40%",
                paddingRight: "30px",
              }}
            >
              {/* <Input
                label="Tên"
                value={name}
                placeholder={"Tên sản phẩm"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              /> */}
              <TextField
                required
                style={{ width: "100%", marginBottom: "15px" }}
                id="outlined-error"
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-number"
                label="Số lượng"
                type="number"
                style={{ width: "100%", marginBottom: "15px" }}
                value={quantity}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              {/* <Input
                label="Số lượng"
                value={quantity}
                placeholder={"Số lượng sản phẩm"}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              /> */}
              <FormControl
                fullWidth
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Giá tiền gốc
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  placeholder={formatThousand(regularPrice)}
                  value={regularPrice}
                  onChange={(e) => {
                    setRegularPrice(e.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">VNĐ</InputAdornment>
                  }
                  label="Giá tiền gốc"
                />
              </FormControl>
              <FormControl
                fullWidth
                style={{ width: "100%", marginBottom: "15px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Giá tiền giảm giá
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={salePrice}
                  onChange={(e) => {
                    setSalePrice(e.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">VNĐ</InputAdornment>
                  }
                  label="Giá tiền giảm giá"
                />
              </FormControl>
              {/* <Input
                label="Giá tiền giảm giá"
                value={salePrice}
                placeholder={"Giá tiền sản phẩm"}
                onChange={(e) => {
                  setSalePrice(e.target.value);
                }}
              /> */}
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option.name}
                options={category.categories?createCategoryList(category.categories):[]}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Thương hiệu" />}
                onChange={(e) => setCategoryId(e.target.value)}
                isOptionEqualToValue={(option,value) => option.value===value.value}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Thương hiệu
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryId}
                  label="Thương hiệu"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {createCategoryList(category.categories).map((option) => (
                    <MenuItem value={option.value}>{option.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ padding: "11px 18px" }}
              >
                {console.log(createCategoryList(category.categories))}
                <option>Thương hiệu</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select> */}
              <ul></ul>

              {productPicture.length > 0
                ? productPicture.map((pic, index) => (
                    <div key={index}>{pic.name}</div>
                  ))
                : null}
              <input
                type="file"
                name="productPicture"
                onChange={handleProductPictures}
              />
              {/* <UploadPicture disabled={false}
            value={productPicture}
            onChange={handleUploadFile}
            name='Task_File'
          /> */}
            </div>
          </div>
        </TabPane>
        <TabPane
          tab={<span>Mô tả sản phẩm</span>}
          style={{ paddingBottom: "20px" }}
          key="2"
        >
          <FormGroup>
            {/* <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              onEditorStateChange={newState => {
                setEditorState(newState);
                setDescription(draftToHtml(convertToRaw(newState.getCurrentContent())));
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
            <CKEditor
              config={{
                enterMode: 2,
                resize_minWidth: "100%",
                resize_maxHeight: 600,
                //filebrowserBrowseUrl: '/browser/browse.php',
                //filebrowserUploadUrl: '/uploader/upload.php',
                pasteFromWordRemoveStyles: false,
                pasteFromWordNumberedHeadingToList: true,
                pasteFromWordPromptCleanup: true,
              }}
              initData={description}
              onChange={handleOnChangeDesciption}
            />
          </FormGroup>
        </TabPane>
        <TabPane tab={<span>Mô tả chi tiết</span>} key="3">
          <div
            className="table_des"
            style={{ width: "100%", color: "black", fontSize: "17px" }}
          >
            <div style={{ display: "block", width: "100%" }}>
              {/* <Input
                label="Thời gian bảo hành"
                style={{ width: "550px", marginRight: "200px" }}
                value={timeBaoHanh}
                placeholder={"Thời gian bảo hành"}
                onChange={(e) => {
                  setTimeBaoHanh(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Thời gian bảo hành"
                style={{
                  width: "45%",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
                value={timeBaoHanh}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setTimeBaoHanh(e.target.value);
                }}
              />
              {/* <Input
                label="Series"
                style={{ width: "500px", marginRight: "20px" }}
                value={series}
                placeholder={"Series"}
                onChange={(e) => {
                  setSeries(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Series"
                style={{ width: "45%", marginBottom: "15px" }}
                value={series}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setSeries(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "block", width: "100%" }}>
              {/* <Input
                label="Màu sắc"
                style={{width:'45%',marginBottom:'15px'}}
                value={color}
                placeholder={"Màu sắc"}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Màu sắc"
                style={{
                  width: "45%",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
              {/* <Input
                label="CPU"
                style={{ width: "500px", marginRight: "20px" }}
                value={cpu}
                placeholder={"CPU"}
                onChange={(e) => {
                  setCPU(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="CPU"
                style={{ width: "45%", marginBottom: "15px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={cpu}
                onChange={(e) => {
                  setCPU(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "block", width: "100%" }}>
              {/* <Input
                label="Card đồ họa"
                style={{ width: "550px", marginRight: "200px" }}
                value={card}
                placeholder={"Card đồ họa"}
                onChange={(e) => {
                  setCard(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Card đồ họa"
                style={{
                  width: "45%",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={card}
                onChange={(e) => {
                  setCard(e.target.value);
                }}
              />
              {/* <Input
                label="Ram"
                style={{ width: "500px", marginRight: "20px" }}
                value={ram}
                placeholder={"Ram"}
                onChange={(e) => {
                  setRam(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Ram"
                style={{ width: "45%", marginBottom: "15px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={ram}
                onChange={(e) => {
                  setRam(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "block", width: "100%" }}>
              {/* <Input
                label="Màn hình"
                style={{ width: "550px", marginRight: "200px" }}
                value={manhinh}
                placeholder={"Màn hình"}
                onChange={(e) => {
                  setManHinh(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Màn hình"
                style={{
                  width: "45%",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={manhinh}
                onChange={(e) => {
                  setManHinh(e.target.value);
                }}
              />
              {/* <Input
                label="Ổ cứng"
                style={{ width: "500px", marginRight: "20px" }}
                value={ocung}
                placeholder={"Ổ cứng"}
                onChange={(e) => {
                  setOCung(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Ổ cứng"
                style={{ width: "45%", marginBottom: "15px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={ocung}
                onChange={(e) => {
                  setOCung(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "block", width: "100%" }}>
              {/* <Input
                label="Hệ điều hành"
                style={{ width: "550px", marginRight: "200px" }}
                value={hedieuhanh}
                placeholder={"Hệ điều hành"}
                onChange={(e) => {
                  setHeDieuHanh(e.target.value);
                }}
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Hệ điều hành"
                style={{
                  width: "45%",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={hedieuhanh}
                onChange={(e) => {
                  setHeDieuHanh(e.target.value);
                }}
              />
              {/* <Input
                label="Khối lượng"
                style={{ width: "500px", marginRight: "20px" }}
                value={khoiluong}
                placeholder={"Khối lượng"}
                onChange={(e) => {
                  setKhoiLuong(e.target.value);
                }}
                required
              /> */}
              <TextField
                required
                id="outlined-number"
                label="Khối lượng"
                style={{ width: "45%", marginBottom: "15px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={khoiluong}
                onChange={(e) => {
                  setKhoiLuong(e.target.value);
                }}
              />
            </div>
          </div>
        </TabPane>
      </Tabs>

      <Button
        variant="contained"
        color="success"
        onClick={submitProductForm}
        style={{ marginBottom: "50px" }}
      >
        Thêm sản phẩm
      </Button>
      {/* <Button block style={{ width: '200px', marginBottom: '50px' }} onClick={submitProductForm}>Thêm sản phẩm</Button> */}
      {/* <button className="btn-addProduct" onClick={submitProductForm}>
        Thêm sản phẩm
      </button> */}
    </Layout>
  );
};
