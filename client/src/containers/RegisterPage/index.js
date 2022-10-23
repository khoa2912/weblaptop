import React, { useState, useEffect } from "react";
import { Anchor } from "../../components/MaterialUI";
import "./style.css";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import GoogleIcon from "@mui/icons-material/Google";
import { FaRegTimesCircle } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { login, loginFacebook, loginGoogle, signup } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showSuccessMsg } from "../../utils/Notification/Notification";
import { Button, Stack, TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { LinearProgress } from "@mui/material";
import { Box } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { notification, Spin } from "antd";
notification.config({
  placement: "topRight",
  top: 80,
  duration: 1.2,
  rtl: false,
  maxCount: 3,
});

export const RegisterPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const handleRegister = () => {
    setSpinning(true);
    dispatch(signup({ email, password, firstName, lastName })).then((data) => {
      setSpinning(false);
      if (data === "coloi") {
        notification["error"]({
          message: "Đăng ký",
          description: "Có lỗi xảy ra !!!",
        });
      }
      if (data === "datontai") {
        notification["error"]({
          message: "Đăng ký",
          description: "Tài khoản đã tồn tại, vui lòng nhập tài khoản khác !!!",
        });
      }
      if (data === "thanhcong") {
        notification["success"]({
          message: "Đăng ký",
          description: "Đăng ký thành công!",
        });
      }
    });
  };
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const responseFacebook = (response) => {
    setSpinning(true);
    dispatch(loginFacebook(response, props.history)).then(() => {
      setSpinning(false);
    });
  };
  const responseGoogle = (response) => {
    setSpinning(true);
    dispatch(loginGoogle(response, props.history)).then(() => {
      setSpinning(false);
    });
  };
  return (
    <Layout>
      <Spin tip="Đang đăng ký ..." spinning={spinning}>
        <div
          className="Container_form_login"
          style={{ marginTop: "60px", marginBottom: "50px" }}
        >
          <TextField
            required
            id="outlined-password-input"
            value={firstName}
            label="Họ"
            type="text"
            inputProps={{ style: { fontSize: 16 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 16 } }}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
          />
          <br />
          <TextField
            required
            id="outlined-password-input"
            value={lastName}
            label="Tên"
            type="text"
            inputProps={{ style: { fontSize: 16 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 16 } }}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
          />
          <TextField
            required
            id="outlined-password-input"
            value={email}
            label="Email"
            type="email"
            inputProps={{ style: { fontSize: 16 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 16 } }}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
          />
          <TextField
            required
            id="outlined-password-input"
            value={password}
            label="Mật khẩu"
            type="password"
            inputProps={{ style: { fontSize: 16 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 16 } }}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} fontSize="20px">
              <DesktopDatePicker
                label="Ngày sinh"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                inputProps={{ style: { fontSize: 16 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
            </Stack>
          </LocalizationProvider>

          <div>
            <br />
            <div
              className="sm-12 md-12 lg-12 mt-16"
              style={{ marginBottom: "10px" }}
            >
              <Button
                variant="contained"
                onClick={handleRegister}
                fullWidth
                style={{ height: "40px", fontSize: "15px" }}
              >
                Đăng ký
              </Button>
            </div>

            <br />
            <div
              className="sm-12 md-12 lg-12 mt-16"
              style={{ marginBottom: "10px" }}
            >
              <Anchor
                title="Bạn đã có tài khoản ? Đăng nhập tại đây"
                onClick={() => {
                  history.push("/login");
                }}
              />
            </div>
            <br />
            <div className="sm-12 md-12 lg-12 mt-16 socials flex-center">
              <p className="socials__label">Kết nối tài khoản mạng xã hội</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <FacebookLogin
                  appId="959708364684244"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="btnFacebook"
                  icon={
                    <i
                      className="fa fa-facebook"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  }
                  textButton="&nbsp;&nbsp;Đăng nhập Facebook"
                />
                <GoogleLogin
                  clientId="537216078334-20dpiutmme06jhohuidf4dfdp3pqkoks.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="btnGoogle"
                >
                  <i
                    className="fa fa-google-plus"
                    style={{ marginLeft: "5px", width: "150px" }}
                  />
                  <span>&nbsp;&nbsp;Đăng nhập Google</span>
                </GoogleLogin>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Spin>
    </Layout>
  );
};
