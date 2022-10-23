import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../actions/user";
import Layout from "../../components/Layout";
import "./style.css";
/**
 * @author
 * @function UserPage
 **/

export const UserPage = (props) => {
  const { users } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const convertRole = (role) => {
    if (role === "admin") {
      return "Quản trị viên";
    } else {
      return "Nhân viên";
    }
  };
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleDisableUser=(id)=>{
    dispatch(changeStatus(id))
  }

   
  
  return (
    <Layout sidebar>
      <div className="user__app-wrap">
        <div className="user__app">
          <div className="manage__user-wrap">
            <div className="manage__user-main-title">Quản lý người dùng</div>
            <div className="manage__user-main-wrap">
              <div className="manage__user-main-id">STT</div>
              <div className="manage__user-main-account">Email</div>
              {/* <div className="manage__user-main-pass">Trạng thái</div> */}
              <div className="manage__user-main-date">Quyền</div>
              <div className="manage__user-main-operate">Thao tác</div>
            </div>
            <div className="manage__user-info-list">
              <div className="manage__user-info-item">
                {users.map((user, index) => (
                  <div className="manage__user-main-operate-all-wrap" key={index}>
                    <div className="manage__user-main-id-detail">{index + 1}</div>
                    <div className="manage__user-main-account-detail">
                      {user.email}
                    </div>
                   {/*  <div className="manage__user-detail"></div> */}
                    {/* <div className="manage__user-detail"key={index}>
                      <input type={passwordShown ? "text" : "password"}/>
                      <button onClick={togglePassword} style={{fontSize:'10px'}}>Show Password</button>
                    </div> */}
                    <div className="manage__user-main-date-detail">
                      {convertRole(user.role)}
                    </div>
                    <div className="manage__user-main-operate-wrap">
                      <div className="manage__user-main-disable" onClick={()=>handleDisableUser(user._id)}>{user.status==="enable"?"Vô hiệu":"Kích hoạt"}</div>
                      <div className="manage__user-main-delete">Xóa</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
