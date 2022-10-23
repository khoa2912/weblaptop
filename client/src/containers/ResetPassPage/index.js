import React, { useState,useEffect } from "react";
import { Anchor, Button, Input } from "../../components/MaterialUI";
import "./style.css";
import {
  IoCartOutline,
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoInstagram,
  IoSearchOutline,
  TimesC
} from "react-icons/io5";
import { FaChevronLeft, FaRegTimesCircle } from 'react-icons/fa'
import { Layout } from "../../components/Layout";
import { forgotPassword, login, resetPassword } from "../../actions";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../utils/Notification/Notification";
import { useParams } from "react-router-dom";

export const ResetPassPage = (props) => {

  const history=useHistory()
  const auth = useSelector(state => state.auth);
  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");
  const dispatch = useDispatch();
  const {token} = useParams()
  if(token){
    localStorage.setItem("token",token);
  }
  const handleReset = () => {

      if(password===cfpassword){
        console.log(token)
        dispatch(resetPassword(password,token));
      }
      else{
          alert('Mat khau khong khop')
      }
  };
  return (
    <Layout>
      <div className="Container_form_login">
        {auth.messageForgot &&showSuccessMsg(auth.messageForgot)}
        {auth.errorForgot && showErrMsg(auth.errorForgot)}
        <h2>Password</h2>
        <div className="row">
          <div className="sm-12 md-12 lg-12">
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </div>
          <div className="sm-12 md-12 lg-12">
            <Input
              placeholder="Confirm Password"
              value={cfpassword}
              onChange={(e) => setCfPassword(e.target.value)}
            />
            
          </div>
          <br />

           <div className="sm-12 md-12 lg-12 mt-16">
            <Button black="yes" title="Thay doi mat khau"  onClick={handleReset}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};
