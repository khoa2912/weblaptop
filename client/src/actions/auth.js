import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "../helpers/axios";
import auth from "../reducers/auth";
import { getCartItems, updateCart } from "./cart";
import { authConstants, cartConstants } from "./constants";

export const login = (user, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("/buyer/signin", {
        ...user,
      });

      /* const { token, user } = res.data; */
      localStorage.setItem("firstLogin", true);
      /* localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); */
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
        },
      });
      localStorage.setItem("refreshtoken", res.data.token);

      history.push("/");
      dispatch(getCartItems());
      return "thanhcong";
    } catch (error) {
      console.log(error);
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: error },
      });
      return "coloi";
    }
  };
};

// new update signup action
export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      const res = await axios.post(`buyer/signup`, user);
      if (res.status && res.status === 201) {
        dispatch({
          type: authConstants.SIGNUP_SUCCESS2,
        });
        return "thanhcong";
      } else if (res.status === 409) {
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error: "Co loi" },
        });
        return "datontai";
      }
    } catch (error) {
      if (error.status === 409) {
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error: "error" },
        });
        return "datontai";
      }
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: "error" },
      });
      return "coloi";
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const refreshtoken = localStorage.getItem("refreshtoken");
    if (refreshtoken) {
      dispatch(getToken(refreshtoken));

      try {
        let user = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null;
        console.log(user);
        /* dispatch({
        type: authConstants.GETTOKEN_SUCCESS,
        payload: { token: token },
      }); */
        dispatch({
          type: authConstants.GETUSER_SUCCESS,
          payload: { user: user },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
};
export const signout = () => {
  return async (dispatch) => {
    /* dispatch({ type: authConstants.LOGOUT_REQUEST }); */
    //localStorage.removeItem('user');
    //localStorage.removeItem('token');
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });
    //const res = await axios.post(`/admin/signout`);
    // if(res.status === 200){

    // }else{
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
    // }
  };
};
export const activation = (token) => {
  return async (dispatch) => {
    console.log(token);
    let res;
    try {
      dispatch({ type: authConstants.ACTIVATION_REQUEST });
      res = await axios.post("/buyer/activation", { activation_token: token });
      dispatch({
        type: authConstants.ACTIVATION_SUCCESS,
        payload: { message: res.data.message },
      });
    } catch (error) {
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};

export const getToken = (refreshtoken) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.GETTOKEN_REQUEST });
      const res = await axios.post("/buyer/refresh_token", {
        refreshtoken: refreshtoken,
      });
      console.log(refreshtoken);
      localStorage.setItem("token", res.data.access_token);

      dispatch({
        type: authConstants.GETTOKEN_SUCCESS,
        payload: { token: res.data.access_token },
      });
    } catch (error) {
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};

export const getUser = (token, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.GETUSER_REQUEST });
      const res = await axios.get("/buyer/infor");
      /* console.log(res.data) */
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({
        type: authConstants.GETUSER_SUCCESS,
        payload: { user: res.data },
      });
      history.push("/");
    } catch (error) {
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.FORGOTPASSWORD_REQUEST });
      const res = await axios.post("/buyer/forgot", { email });
      /* console.log(res.data) */
      dispatch({
        type: authConstants.FORGOTPASSWORD_SUCCESS,
        payload: { message: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: authConstants.FORGOTPASSWORD_FAILURE,
        payload: { message: error.response.data.msg },
      });
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};

export const resetPassword = (password, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.RESETPASSWORD_REQUEST });
      const res = await axios.post(
        "/buyer/reset",
        { password },
        { headers: { Authorization: "Bearer " + token } }
      );
      /* console.log(res.data) */
      dispatch({
        type: authConstants.RESETPASSWORD_SUCCESS,
        payload: { message: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: authConstants.RESETPASSWORD_FAILURE,
        payload: { message: error.response.data.msg },
      });
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};

export const loginGoogle = (response, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("/buyer/google_login", {
        tokenId: response.tokenId,
      });
      /* console.log(res.data) */
      localStorage.setItem("firstLogin", true);
      /* localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); */
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
        },
      });
      localStorage.setItem("refreshtoken", res.data.token);
      history.push("/");
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "eror" },
      });
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};
export const loginFacebook = (response, history) => {
  return async (dispatch) => {
    try {
      const { accessToken, userID } = response;
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("/buyer/facebook_login", {
        accessToken,
        userID,
      });
      /* console.log(res.data) */
      localStorage.setItem("firstLogin", true);
      /* localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); */
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
        },
      });
      localStorage.setItem("refreshtoken", res.data.token);
      history.push("/");
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "co loi" },
      });
      /* const { data } = error.response; */
      console.log(error);
    }
  };
};
