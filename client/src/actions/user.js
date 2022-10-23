import { cartConstants, userConstants } from "./constants";
import axios from "../helpers/axios";
import { removeCartItem } from ".";
import { signout } from "./auth";
export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/buyer/address/getaddress`);
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      //console.log(payload)
      const res = await axios.post(`/buyer/address/create`, { payload });
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/buyer/order/addOrder`, payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        const { order } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });

        // const {
        //   address: { address },
        // } = res.data;
        // dispatch({
        //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/buyer/order/getOrders`);

      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { orders } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
// single order with complete info and delivery location
export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/buyer/order/getOrder`, payload);
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteAddress = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const res = await axios.post(`/buyer/address/deleteAddress`, {
        data: { payload },
      });
      dispatch({ type: userConstants.DELETE_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        dispatch(getAddress());
        dispatch({
          type: userConstants.DELETE_USER_ADDRESS_SUCCESS,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.DELETE_USER_ADDRESS_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCompleteOrder = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const res = await axios.post(`/buyer/order/updateCompletedOrder`, {
        data: { payload },
      });
      dispatch({ type: userConstants.UPDATE_ORDER_USER_REQUEST });
      if (res.status === 202) {
        dispatch(getOrders());
        dispatch({
          type: userConstants.UPDATE_ORDER_USER_SUCCESS,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.UPDATE_ORDER_USER_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const cancalOrder = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const res = await axios.post(`/buyer/order/cancelOrder`, {
        data: { payload },
      });
      dispatch({ type: userConstants.UPDATE_ORDER_USER_REQUEST });
      if (res.status === 202) {
        dispatch({
          type: userConstants.UPDATE_ORDER_USER_SUCCESS,
        });
        dispatch(getOrders());
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.UPDATE_ORDER_USER_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfile = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/buyer/updateProfile`, {
        data: { payload },
      });
      dispatch({ type: userConstants.UPDATE_PROFILE_USER_REQUEST });
      if (res.status === 201) {
        dispatch({
          type: userConstants.UPDATE_PROFILE_USER_SUCCESS,
        });
        dispatch(signout());
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.UPDATE_PROFILE_USER_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
