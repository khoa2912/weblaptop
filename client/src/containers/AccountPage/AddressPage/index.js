import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, getAddress } from "../../../actions";
import { LayoutAccount } from "../../../components/Layout/layoutAcount";
import { Input, Modal } from "../../../components/MaterialUI";
import "../style.css";
import { Alert, Tag, Select, message, Popconfirm } from "antd";
import { TextField } from "@mui/material";
/**
 * @author
 * @function AddressPage
 **/

export const AddressPage = (props) => {
  const { Option } = Select;
  const [listTinh, setListTinh] = useState([]);
  const [listHuyen, setListHuyen] = useState([]);
  const [listXa, setListXa] = useState([]);
  const [tinh, setTinh] = useState("");
  const [tinhName, setTinhName] = useState("");
  const [huyen, setHuyen] = useState("");
  const [huyenName, setHuyenName] = useState("");
  const [xa, setXa] = useState("");
  const [xaName, setXaName] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const [id, setId] = useState("");
  const handleChangeTinh = (e) => {
    setTinhName(listTinh[e].ProvinceName);
    setTinh(listTinh[e].ProvinceID);
    getApiHuyen(listTinh[e].ProvinceID);
  };
  const handleChangeHuyen = (value) => {
    getApiXa(listHuyen[value].DistrictID);
    setHuyen(listHuyen[value].DistrictID);
    setHuyenName(listHuyen[value].DistrictName);
  };
  const handleChangeXa = (value) => {
    setXa(listXa[value].WardCode);
    setXaName(listXa[value].WardName);
  };
  const handleDeleteAddress = (item) => {
    const payload = {
      userId: auth.user._id,
      addId: item._id,
    };
    console.log(payload);
    dispatch(deleteAddress(payload));
    dispatch(getAddress());
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
      console.log(response.data);
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
    auth.authenticate && dispatch(getAddress()) && getApiTinh();
  }, [auth.authenticate]);

  const onAddressSubmit = (e) => {
    if (validationForm()) {
      const payload = {
        address: {
          name: name,
          mobileNumber,
          address: address,
          provinceID: tinh,
          provinceName: tinhName,
          districtID: huyen,
          districtName: huyenName,
          wardID: xa,
          wardName: xaName,
        },
      };
      console.log(payload);
      if (id) {
        payload.address._id = id;
      }
      dispatch(addAddress(payload));
      setAddAddressModal(false);
      message.success("Thêm mới địa chỉ thành công!");
      dispatch(getAddress());
      handleResetForm();
    } else {
      message.warning("Vui lòng điền đầy đủ thông tin!");
    }
  };
  const validationForm = () => {
    if (
      name === "" ||
      mobileNumber === "" ||
      address === "" ||
      tinh === "" ||
      huyen === "" ||
      xa === ""
    ) {
      return false;
    }
    return true;
  };
  const handleResetForm = () => {
    setName("");
    setMobileNumber("");
    setAddress("");
    setTinh("");
    setHuyen("");
    setXa("");
    setTinhName("");
    setHuyenName("");
    setXaName("");
  };
  const onUpdateAddressSubmit = (e) => {
    if (validationForm()) {
      const payload = {
        address: {
          name: name,
          mobileNumber,
          address: address,
          provinceID: tinh,
          provinceName: tinhName,
          districtID: huyen,
          districtName: huyenName,
          wardID: xa,
          wardName: xaName,
        },
      };
      if (id) {
        payload.address._id = id;
      }
      dispatch(addAddress(payload));
      setEditAddressModal(false);
      dispatch(getAddress());
      message.success("Chỉnh sửa địa chỉ thành công!");
      handleResetForm();
    } else {
      message.warning("Vui lòng điền đầy đủ thông tin!");
    }
  };
  const handleEditAddress = (item) => {
    setId(item._id);
    setName(item.name);
    setMobileNumber(item.mobileNumber);
    setAddress(item.address);
    setTinh(item.provinceID);
    setTinhName(item.provinceName);
    setHuyen(item.districtID);
    setHuyenName(item.districtName);
    setXa(item.wardID);
    setXaName(item.wardName);
    getApiHuyen(item.provinceID);
    getApiXa(item.districtID);
    setEditAddressModal(true);
  };
  const renderEditAddressModal = () => {
    return (
      <Modal
        visible={editAddressModal}
        onClose={() => setEditAddressModal(false)}
        title="Chỉnh sửa địa chỉ"
      >
        <div id="modal__address">
          <div id="modal__overlay-address"></div>
          <div id="modal__overlay-address-bold"></div>
          <div class="modal__body-address">
            <div class="show__input-address">
              <h2 class="show__address-title">Thông tin người nhận hàng</h2>

              <TextField
                fullWidth
                sx={{ fontSize: "3rem", marginTop: "20px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ style: { fontSize: 16 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                id="demo-helper-text-misaligned"
                label="Họ và tên"
              />
              <div class="wrap__phone-and-email" style={{ padding: "20px 0" }}>
                <div class="wrap__phone-inf">
                  <TextField
                    fullWidth
                    sx={{ fontSize: "3rem" }}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    inputProps={{ style: { fontSize: 16 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                    id="demo-helper-text-misaligned"
                    label="Số điện thoại"
                  />
                </div>
              </div>
              <h2 class="show__address-title">Địa chỉ nhận hàng</h2>
              <div
                class="content__transport1"
                style={{ display: "flex", marginTop: "10px" }}
              >
                <Select
                  defaultValue={tinhName ? tinhName : ""}
                  style={{
                    width: 150,
                    marginRight: "20px",
                  }}
                  onChange={handleChangeTinh}
                >
                  {listTinh &&
                    listTinh.map((item, index) => (
                      <Option value={index} key={index}>
                        {item.ProvinceName}
                      </Option>
                    ))}
                </Select>
                <Select
                  defaultValue={huyenName ? huyenName : ""}
                  style={{
                    width: 180,
                    marginRight: "20px",
                  }}
                  onChange={handleChangeHuyen}
                >
                  {listHuyen &&
                    listHuyen.map((item, index) => (
                      <Option value={index}>{item.DistrictName}</Option>
                    ))}
                </Select>
                <Select
                  defaultValue={xaName ? xaName : ""}
                  style={{
                    width: 180,
                  }}
                  onChange={handleChangeXa}
                >
                  {listXa &&
                    listXa.map((item, index) => (
                      <Option value={index}>{item.WardName}</Option>
                    ))}
                </Select>
              </div>
              <div class="wrap__address-detail">
                {/* <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                /> */}
                <TextField
                  fullWidth
                  sx={{ fontSize: "3rem" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  id="demo-helper-text-misaligned"
                  label="Địa chỉ nhận hàng"
                />
              </div>
              <div class="save__address-wrap" style={{ padding: "10px" }}>
                <a
                  onClick={() => setEditAddressModal(false)}
                  class="btn btn__normal btn__cancel-address"
                >
                  Hủy bỏ
                </a>
                <a
                  class="btn btn__primary btn__save-address"
                  onClick={onUpdateAddressSubmit}
                >
                  Lưu địa chỉ
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const renderAddAddress = () => (
    <Modal visible={addAddressModal} onClose={() => setAddAddressModal(false)}>
      <div id="modal__address">
        <div id="modal__overlay-address"></div>
        <div id="modal__overlay-address-bold"></div>
        <div class="modal__body-address">
          <div class="show__input-address">
            <h2 class="show__address-title">Thông tin người nhận hàng</h2>
            <TextField
              fullWidth
              sx={{ fontSize: "3rem", marginTop: "20px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ style: { fontSize: 16 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
              id="demo-helper-text-misaligned"
              label="Họ và tên"
            />
            <div class="wrap__phone-and-email" style={{ padding: "20px 0" }}>
              <div class="wrap__phone-inf">
                <TextField
                  fullWidth
                  sx={{ fontSize: "3rem" }}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  id="demo-helper-text-misaligned"
                  label="Số điện thoại"
                />
              </div>
            </div>
            <h2 class="show__address-title">Địa chỉ nhận hàng</h2>
            <div
              class="content__Transport"
              style={{ display: "flex", marginTop: "10px" }}
            >
              <Select
                defaultValue={""}
                style={{
                  width: 180,
                  marginRight: "20px",
                }}
                onChange={(e) => handleChangeTinh(e)}
              >
                {listTinh &&
                  listTinh.map((item, index) => (
                    <Option value={index} key={index}>
                      {item.ProvinceName}
                    </Option>
                  ))}
              </Select>
              <Select
                defaultValue={""}
                style={{
                  width: 180,
                  marginRight: "20px",
                }}
                onChange={handleChangeHuyen}
                disabled={tinh ? false : true}
              >
                {listHuyen &&
                  listHuyen.map((item, index) => (
                    <Option value={index}>{item.DistrictName}</Option>
                  ))}
              </Select>
              <Select
                defaultValue={""}
                style={{
                  width: 180,
                }}
                disabled={huyen ? false : true}
                onChange={handleChangeXa}
              >
                {listXa &&
                  listXa.map((item, index) => (
                    <Option value={index}>{item.WardName}</Option>
                  ))}
              </Select>
            </div>
            <div class="wrap__address-detail">
              <TextField
                fullWidth
                sx={{ fontSize: "3rem" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                inputProps={{ style: { fontSize: 16 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                id="demo-helper-text-misaligned"
                label="Địa chỉ nhận hàng"
              />
            </div>
            <div class="save__address-wrap" style={{ padding: "10px" }}>
              <a
                onClick={() => setAddAddressModal(false)}
                class="btn btn__normal btn__cancel-address"
              >
                Hủy bỏ
              </a>
              <a
                onClick={onAddressSubmit}
                class="btn btn__primary btn__save-address"
              >
                Lưu địa chỉ
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
  const renderHasAddress = () => {
    return (
      <div class="has__address-show">
        <ul class="has__address-list">
          {user.address.map((item) => (
            <li class="has__address-item" style={{ margin: "20px 0" }}>
              <div class="has__address-nav-wrap">
                <div class="has__address-nav-default">
                  <span class="name__of-user">{item.name}</span>
                </div>
                {renderEditAddressModal()}
                {/* <!-- Thêm address-nav--remove--disable để vô hiệu hóa nút xóa --> */}
                <div class="has__address-nav">
                  <button
                    class="address-nav--edit"
                    onClick={() => handleEditAddress(item)}
                  >
                    Chỉnh Sửa
                  </button>

                  <Popconfirm
                    title="Bạn có muốn xoá địa chỉ này?"
                    onConfirm={() => handleDeleteAddress(item)}
                    okText="Đồng ý"
                    cancelText="Không"
                  >
                    <button class="address-nav--remove address-nav--remove">
                      Xóa
                    </button>
                  </Popconfirm>
                </div>
              </div>
              <div class="info__address-detail-wrap">
                Địa chỉ:
                <span class="info__address-detail">
                  {item.address}, {item.wardName}, {item.districtName},{" "}
                  {item.provinceName}
                </span>
              </div>
              <div class="info__phone-detail-wrap">
                Điện thoại:
                <span class="info__phone-detail">{item.mobileNumber}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const renderNoAddress = () => {
    return (
      <div class="no__address-show">
        <span class="no__address-icon">
          <i class="far fa-clipboard"></i>
        </span>
        <span class="no__address-title">Chưa có địa chỉ</span>
      </div>
    );
  };
  return (
    <LayoutAccount>
      <div class="account__content-10-address">
        <button
          class="add__address-wrap"
          onClick={() => setAddAddressModal(true)}
        >
          <span class="add__address-icon">+</span>
          <span class="add__address-title">Thêm Địa Chỉ</span>
        </button>
        {/* <!-- Chưa có địa chỉ --> */}
        {user.address.length === 0 ? renderNoAddress() : renderHasAddress()}
        {/* <!-- Có địa chỉ --> */}
      </div>
      {renderAddAddress()}
    </LayoutAccount>
  );
};
