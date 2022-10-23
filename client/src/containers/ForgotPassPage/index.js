import React, { useState, useEffect } from "react";
import { Anchor, Button, Input } from "../../components/MaterialUI";
import "./style.css";
import {
  IoCartOutline,
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoInstagram,
  IoSearchOutline,
  TimesC,
} from "react-icons/io5";
import { LinearProgress, TextField } from "@mui/material";
import { Box } from "@material-ui/core";
import { FaChevronLeft, FaRegTimesCircle } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { forgotPassword, login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/Notification/Notification";

export const ForgotPage = (props) => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleForgot = () => {
    if (email) {
      dispatch(forgotPassword(email));
    } else {
      alert("Vui long nhap email");
    }
  };
  return (
    <Layout>
      <div className="Container_form_login">
        {auth.messageForgot && showSuccessMsg(auth.messageForgot)}
        {auth.errorForgot && showErrMsg(auth.errorForgot)}
        <h2 style={{ marginBottom: "20px" }}>Email</h2>
        <div className="row">
          <div className="sm-12 md-12 lg-12" style={{ marginBottom: "15px" }}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />

          <div className="sm-12 md-12 lg-12 mt-16">
            <Button black="yes" title="Quên mật khẩu" onClick={handleForgot} />
          </div>
          {auth.loading === true ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
