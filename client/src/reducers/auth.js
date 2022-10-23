import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  tokenRes: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    _id: "",
  },
  authenticate: false,
  loading: false,
  messActivation: "",
  loadingactivation: false,
  error: null,
  errorRegis: null,
  authenticateRegis: false,
  message: null,
  messageForgot: "",
  errorForgot: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        tokenRes: action.payload.token,
        authenticate: true,
        loading: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case authConstants.ACTIVATION_REQUEST:
      state = {
        ...state,
        loadingactivation: true,
      };
      break;
    case authConstants.ACTIVATION_SUCCESS:
      state = {
        ...state,
        loadingactivation: false,
        messActivation: action.payload.message,
      };
      break;
    case authConstants.ACTIVATION_FAILURE:
      state = {
        ...state,
        loadingactivation: false,
        error: action.payload.error,
      };
      break;
    case authConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
        message: null,
        errorRegis: null,
      };
      break;
    case authConstants.SIGNUP_SUCCESS2:
      state = {
        ...state,
        loading: false,
        message: "dang ky thanh cong",
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        errorRegis: action.payload.error,
      };
      break;
    case authConstants.GETTOKEN_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
      };
      break;
    case authConstants.GETUSER_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        authenticate: true,
      };
      break;
    case authConstants.FORGOTPASSWORD_SUCCESS:
      state = {
        ...state,
        messageForgot: action.payload.message,
      };
      break;
    case authConstants.FORGOTPASSWORD_FAILURE:
      state = {
        ...state,
        errorForgot: action.payload.message,
      };
      break;
  }

  return state;
};
