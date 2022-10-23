import React, { useEffect, useState } from "react";
import { LayoutAccount } from "../../components/Layout/layoutAcount";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/MaterialUI";
import { updateProfile } from "../../actions";
import auth from "../../reducers/auth";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
/**
 * @author
 * @function AccountPage
 **/

export const AccountPage = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [value, setValue] = useState(Date.now());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  useEffect(() => {
    if (user.firstName && user.lastName) {
      setFullName(user.firstName + " " + user.lastName);
      setEmail(user.email);
      setPassword(user.hash_password);
    }
  }, [user.firstName]);

  return (
    <LayoutAccount>
      <div class="account__content-10">
        <div class="title__info-account-wrap" style={{ marginLeft: "80px" }}>
          <h2 class="title__info-account">Hồ Sơ Của Tôi</h2>
          <h3 class="title__info-account-note">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </h3>
        </div>
        <div class="account__info-wrap">
          <div class="account__info-wrap-7">
            <div class="user__name-wrap" style={{ justifyContent: "center" }}>
              <div
                className="fullname"
                style={{ width: "400px", color: "black" }}
              >
                <TextField
                  fullWidth
                  sx={{ fontSize: "3rem" }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  id="demo-helper-text-misaligned"
                  label="Tên"
                />
              </div>
            </div>
            <div class="user__email-wrap" style={{ justifyContent: "center" }}>
              <div
                class="user__email-edit-wrap"
                style={{
                  width: "400px",
                  height: "50px",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  sx={{ fontSize: "3rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  id="demo-helper-text-misaligned"
                  label="Email"
                />
              </div>
            </div>
            <div class="user__email-wrap" style={{ justifyContent: "center" }}>
              <div
                class="user__email-edit-wrap"
                style={{ width: "400px", height: "50px" }}
              >
                {/* <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordShown ? "text" : "password"}
                /> */}
                <TextField
                  fullWidth
                  sx={{ fontSize: "3rem" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  id="demo-helper-text-misaligned"
                  label="Mật Khẩu"
                  type="password"
                />
              </div>
            </div>
            {/* <div class="user__email-wrap" style={{marginTop:'10px'}}> 
              <div
                class="user__email-edit-wrap"
                style={{ height: "20px", marginLeft: "165px", width: "3%" }}
              >
                <Input

                  type="checkbox"
                  onClick={togglePassword}
                />
              </div>
              <span class="user__showpass-title" style={{ color: "black" }}>
                Hiển thị mật khẩu
              </span>
            </div> */}
            <div class="user__email-wrap" style={{ justifyContent: "center" }}>
              <div
                class="user__email-edit-wrap"
                style={{
                  width: "400px",
                  height: "50px",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  sx={{ fontSize: "3rem" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  id="demo-helper-text-misaligned"
                  label="Số Điện Thoại"
                  type="text"
                />
                {/* <div class="user__phone-edit-wrap">
                085*****89
                <span class="user__phone-edit account__active">Thay Đổi</span>
                <span class="user__phone-edit">Thêm</span>
              </div> */}
              </div>
            </div>
            <Button
              variant="contained"
              style={{ margin: "20px 88px", fontSize: "13px", width: "100px" }}
              size="large"
            >
              Lưu
            </Button>
            {/* <button
              class="btn btn__primary btn__save-info-account"
              onClick={() => {
                const payload = {
                  userId: user._id,
                  email: email,
                };
                console.log(payload);
                dispatch(updateProfile(payload));
              }}
            >
              Lưu
            </button> */}
          </div>
          <div class="account__info-wrap-3">
            <div class="account__info-wrap-img">
              <span class="img__account">
                <img
                  src="https://cdn-codel.nitrocdn.com/tcXEInFIuLZpqJskgGRZMcSPgOtEVlpt/assets/static/optimized/rev-520b63a/wp-content/uploads/2021/10/anh-gai-xinh-toc-dai-deo-kinh-2k4-1.jpg"
                  alt=""
                />
              </span>
              <button class="btn btn__normal btn__choose-img">Chọn Ảnh</button>
              <span class="note__choose-img">Dung lượng file tối đa 1MB</span>
              <span class="note__choose-img">Định dạng: .jpg, .png</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutAccount>
  );
};
