import { authConstants } from "../actions/constants";

const initState = {
  tokenres: null,
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  users: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        error: null,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        tokenres: action.payload.token,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        error: action.payload.error,
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
        error: action.payload.error,
        loading: false,
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
    case authConstants.GET_USERS_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
  }

  return state;
};
