import React, { useState, useEffect } from "react";
import { Anchor, Input } from "../../components/MaterialUI";
import "./style.css";
import {
  IoCartOutline,
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoInstagram,
  IoSearchOutline,
  TimesC,
} from "react-icons/io5";
import { GoogleLogin } from "react-google-login";
import { FaChevronLeft, FaRegTimesCircle } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { login, loginFacebook, loginGoogle } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { message } from "antd";
import { Button, LinearProgress, TextField } from "@mui/material";
import { Box } from "@material-ui/core";
import { notification, Spin } from "antd";
notification.config({
  placement: "topRight",
  top: 80,
  duration: 1.2,
  rtl: false,
  maxCount: 3,
});
export const LoginPage = (props) => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showProcess, setShowProcess] = useState(false);
  const [password, setPassword] = useState("");
  const [spinning, setSpinning] = useState(false);
  const dispatch = useDispatch();

  const validationForm = () => {
    if (email === "" || password === "") {
      return false;
    } else {
      return true;
    }
  };
  const handleLogin = () => {
    setSpinning(true);
    // setLoading(true);
    if (validationForm()) {
      dispatch(login({ email, password }, props.history)).then((data) => {
        console.log(data);
        // setLoading(false);
        setSpinning(false);
        if (data === "coloi") {
          notification["error"]({
            message: "Đăng nhập",
            description: "Sai tên tài khoản hoặc mật khẩu!",
          });
        }
        if (data === "thanhcong") {
          notification["success"]({
            message: "Đăng nhập",
            description: "Đăng nhập thành công!",
          });
        }
      });

      setShowProcess(true);
    } else {
      notification["warning"]({
        message: "Đăng nhập",
        description: "Vui lòng nhập thông tin đăng nhập!",
      });
    }
  };
  const responseGoogle = (response) => {
    setSpinning(true);
    dispatch(loginGoogle(response, props.history)).then(() => {
      setSpinning(false);
    });
  };
  const responseFacebook = (response) => {
    setSpinning(true);
    dispatch(loginFacebook(response, props.history)).then(() => {
      setSpinning(false);
    });
  };
  // useEffect(() => {
  //   if (auth.error) {
  //     notification["error"]({
  //       message: "Đăng nhập",
  //       description: "Sai tên tài khoản hoặc mật khẩu!",
  //     });
  //   }
  //   if (auth.token) {
  //     notification["success"]({
  //       message: "Đăng nhập",
  //       description: "Đăng nhập thành công!",
  //     });
  //   }
  // }, [auth.error, auth.loading]);
  return (
    <Layout>
      <Spin tip="Đang đăng nhập ..." spinning={spinning}>
        <div className="Container_form_login">
          <div className="row">
            <TextField
              fullWidth
              id="fullWidth"
              required
              value={email}
              label="Email"
              type="email"
              inputProps={{ style: { fontSize: 16 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 16 } }}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "97%",
                backgroundColor: "white",
                marginLeft: "10px",
                marginBottom: "20px",
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
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "97%",
                backgroundColor: "white",
                marginLeft: "10px",
                marginBottom: "10px",
              }}
            />

            {/* <div
            className="sm-12 md-12 lg-12 mt-16"
            style={{ marginBottom: "20px" }}
          >
            <Input
              placeholder="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}

            <br />
            <div
              className="sm-12 md-12 lg-12 mt-16 text-align-right"
              style={{ marginBottom: "15px" }}
            >
              <Anchor
                title="Quên mật khẩu ?"
                onClick={() => {
                  history.push("/forgot_password");
                }}
              />
            </div>
            <br />

            <div
              className="sm-12 md-12 lg-12 mt-16"
              style={{ marginBottom: "15px" }}
            >
              <Button
                variant="contained"
                onClick={handleLogin}
                fullWidth
                style={{ height: "40px", fontSize: "15px" }}
              >
                Đăng nhập
              </Button>
              {/* <Button black="yes" title="Đăng nhập" onClick={handleLogin} /> */}
            </div>
            {loading === true ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : null}
            <br />
            <div
              className="sm-12 md-12 lg-12 mt-16"
              style={{ marginBottom: "20px" }}
            >
              <Anchor
                title="Bạn chưa có tài khoản? Đăng ký tại đây"
                onClick={() => {
                  history.push("/register");
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
              {/* <div
              className="socials__icons mt-8"
              style={{ marginBottom: "10px" }}
            >
              <div
                // className="socials__icons--facebook"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <GoogleLogin
                  clientId="537216078334-20dpiutmme06jhohuidf4dfdp3pqkoks.apps.googleusercontent.com"
                  buttonText="Đăng nhập bằng Google"
                  onSuccess={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="btnGoogle"
                >
                  <i
                    className="fa fa-google-plus"
                    style={{ marginLeft: "5px" }}
                  />
                  <span>&nbsp;&nbsp;Đăng nhập bằng Google</span>
                </GoogleLogin>
                <FacebookLogin
                  cssClass="btnFacebook"
                  appId="959708364684244"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  icon={
                    <i
                      className="fa fa-facebook"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  }
                  textButton="&nbsp;&nbsp;Đăng nhập bằng Facebook"
                />
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </Spin>
    </Layout>
  );
};
