import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {},
  updatingCart: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      break;
    case cartConstants.REMOVE_ALL_ITEM_SUCCESS:
      state = {
        ...state,
        cartItems: {},
      };
      break;
    case cartConstants.RESET_CART:
      state = {
        ...initState,
      };
  }
  return state;
};
